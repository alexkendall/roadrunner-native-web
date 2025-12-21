export function decodeUtf8(bytes: Uint8Array | ArrayBuffer): string {
  const view = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes
  // Web + modern JS runtimes.
  const TD = (globalThis as any).TextDecoder as undefined | (new (label?: string) => { decode(b: Uint8Array): string })
  if (typeof TD === 'function') {
    return new TD('utf-8').decode(view)
  }

  // Node-like / polyfilled environments.
  const B = (globalThis as any).Buffer as undefined | { from: (b: Uint8Array) => { toString: (enc: string) => string } }
  if (B && typeof B.from === 'function') {
    return B.from(view).toString('utf8')
  }

  // Best-effort fallback (works for ASCII / basic UTF-8 content).
  let s = ''
  for (let i = 0; i < view.length; i++) s += String.fromCharCode(view[i]!)
  return s
}
