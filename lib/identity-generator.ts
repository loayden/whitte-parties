export function hashStringToNumber(s: string) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0
  }
  return h
}

export async function generateIdentity(seed: string) {
  const presets = (await import('../data/identity-presets.json')) as any
  const h = hashStringToNumber(seed + Date.now())
  const epithet = presets.epithets[h % presets.epithets.length]
  const pattern = presets.patterns[(h >> 3) % presets.patterns.length]
  const tier = presets.tiers[(h >> 6) % presets.tiers.length]
  return { name: epithet, pattern, tier, memberSince: new Date().toISOString().slice(0, 10) }
}
