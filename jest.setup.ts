// expo-crypto is a native module; tests only need unique, deterministic ids.
let mockCounter = 0;
jest.mock('expo-crypto', () => ({
  randomUUID: () => `test-id-${++mockCounter}`,
}));
