/* eslint-disable no-undef, no-restricted-globals */

const mockGlobal = {};

/**
 * A reliable cross-platform way to get the global object
 * for an environment.
 */
export function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return mockGlobal;
}
