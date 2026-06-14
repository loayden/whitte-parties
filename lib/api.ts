export async function getEvents() {
  const mod = await import('../data/events.json')
  return (mod as any).default || mod
}

export async function getEventBySlug(slug: string) {
  const events = await getEvents()
  return events.find((e: any) => e.slug === slug) || null
}

export async function getEventsByCategory(category: string) {
  const events = await getEvents()
  return events.filter((e: any) => e.category === category)
}

export async function getArtists() {
  const mod = await import('../data/artists.json')
  return (mod as any).default || mod
}

export async function getArtistBySlug(slug: string) {
  const artists = await getArtists()
  return artists.find((a: any) => a.slug === slug) || null
}

export async function getVenues() {
  const mod = await import('../data/venues.json')
  return (mod as any).default || mod
}

export async function getVenueBySlug(slug: string) {
  const venues = await getVenues()
  return venues.find((v: any) => v.slug === slug) || null
}
