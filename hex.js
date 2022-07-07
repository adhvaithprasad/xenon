// This is the same for all of the below, and
// you probably won't need it except for debugging
// in most cases.
function bytesToHex(bytes) {
  return Array.from(
    bytes,
    byte => byte.toString(16).padStart(2, "0")
  ).join("");
}

// You almost certainly want UTF-8, which is
// now natively supported:
function stringToUTF8Bytes(string) {
  return new TextEncoder().encode(string);
}

// But you might want UTF-16 for some reason.
// .charCodeAt(index) will return the underlying
// UTF-16 code-units (not code-points!), so you
// just need to format them in whichever endian order you want.
function stringToUTF16Bytes(string, littleEndian) {
  const bytes = new Uint8Array(string.length * 2);
  // Using DataView is the only way to get a specific
  // endianness.
  const view = new DataView(bytes.buffer);
  for (let i = 0; i != string.length; i++) {
    view.setUint16(i, string.charCodeAt(i), littleEndian);
  }
  return bytes;
}

// And you might want UTF-32 in even weirder cases.
// Fortunately, iterating a string gives the code
// points, which are identical to the UTF-32 encoding,
// though you still have the endianess issue.
function stringToUTF32Bytes(string, littleEndian) {
  const codepoints = Array.from(string, c => c.codePointAt(0));
  const bytes = new Uint8Array(codepoints.length * 4);
  // Using DataView is the only way to get a specific
  // endianness.
  const view = new DataView(bytes.buffer);
  for (let i = 0; i != codepoints.length; i++) {
    view.setUint32(i, codepoints[i], littleEndian);
  }
  return bytes;
}