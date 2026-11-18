// expo-crypto is a native module; tests only need unique, deterministic ids.
let mockCounter = 0;
jest.mock('expo-crypto', () => ({
  randomUUID: () => `test-id-${++mockCounter}`,
}));

// AsyncStorage is a native module; the library ships an in-memory mock for tests.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
