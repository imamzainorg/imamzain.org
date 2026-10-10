export const libraryPath = (...segments: string[]): string =>
  `/library/${segments.join("/")}`;
