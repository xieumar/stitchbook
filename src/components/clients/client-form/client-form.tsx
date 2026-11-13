import { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import { FormField, PillButton, useAppToast, type FormFieldRef } from '@/components/ui';
import { useClientPhoto } from '@/hooks';
import {
  clientToFormTexts,
  EMPTY_CLIENT_TEXTS,
  toClientInput,
  validateClient,
  type ClientFormTexts,
} from '@/lib';

import { ClientPhotoField } from '../client-photo-field';

export type ClientFormProps = {
  /** Present when editing; the form starts from its values. */
  client?: ClientRecord;
  submitLabel?: string;
  onSubmit: (input: ClientInput) => void;
};

/**
 * Add / edit client form. Errors appear after the first save attempt, then update
 * as the user fixes them. Render it inside <KeyboardForm>.
 */
export function ClientForm({ client, submitLabel = 'Save client', onSubmit }: ClientFormProps) {
  const toast = useAppToast();
  const { pickPhoto, discardPhoto } = useClientPhoto();

  const [texts, setTexts] = useState<ClientFormTexts>(() =>
    client ? clientToFormTexts(client) : EMPTY_CLIENT_TEXTS,
  );
  const [photoUri, setPhotoUri] = useState(client?.photoUri);
  const [showErrors, setShowErrors] = useState(false);

  const phoneRef = useRef<FormFieldRef>(null);
  const emailRef = useRef<FormFieldRef>(null);
  const notesRef = useRef<FormFieldRef>(null);

  // Photos picked in this session that are not saved yet; removed again if the user leaves.
  const pickedRef = useRef<string | undefined>(undefined);
  const savedRef = useRef(false);
  useEffect(
    () => () => {
      if (!savedRef.current) discardPhoto(pickedRef.current);
    },
    [discardPhoto],
  );

  const errors = useMemo(() => validateClient(texts), [texts]);
  const shown = showErrors ? errors : {};

  const setText = (key: keyof ClientFormTexts) => (text: string) =>
    setTexts((current) => ({ ...current, [key]: text }));

  const choosePhoto = async () => {
    try {
      const uri = await pickPhoto();
      if (!uri) return;
      discardPhoto(pickedRef.current);
      pickedRef.current = uri;
      setPhotoUri(uri);
    } catch {
      toast.error('Could not open your photos', 'Check the app’s photo permission and try again.');
    }
  };

  const submit = () => {
    setShowErrors(true);
    if (Object.keys(errors).length > 0) return;
    savedRef.current = true;
    // A replaced or removed saved photo is no longer needed.
    if (client?.photoUri && client.photoUri !== photoUri) discardPhoto(client.photoUri);
    onSubmit(toClientInput(texts, photoUri));
  };

  return (
    <View className="gap-section">
      <ClientPhotoField
        name={texts.name}
        photoUri={photoUri}
        onPick={choosePhoto}
        onRemove={() => setPhotoUri(undefined)}
      />

      <View className="gap-3">
        <FormField
          label="Name"
          isRequired
          value={texts.name}
          onChangeText={setText('name')}
          error={shown.name}
          placeholder="Full name"
          autoCapitalize="words"
          autoComplete="name"
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
        <FormField
          ref={phoneRef}
          label="Phone"
          value={texts.phone}
          onChangeText={setText('phone')}
          error={shown.phone}
          placeholder="+234 800 000 0000"
          keyboardType="phone-pad"
          autoComplete="tel"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <FormField
          ref={emailRef}
          label="Email"
          value={texts.email}
          onChangeText={setText('email')}
          error={shown.email}
          placeholder="name@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={() => notesRef.current?.focus()}
        />
        <FormField
          ref={notesRef}
          label="Notes"
          value={texts.notes}
          onChangeText={setText('notes')}
          placeholder="Anything worth remembering about this client"
          multiline
        />
      </View>

      <PillButton label={submitLabel} onPress={submit} />
    </View>
  );
}
