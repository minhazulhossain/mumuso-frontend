import bangladeshDivisions from '../data/bangladesh-divisions.json'
import bangladeshDistricts from '../data/bangladesh-districts.json'

type Option = { label: string; value: string }

const normalize = (value?: string | null) => (value || '').trim().toLowerCase()

const countryLabels: Record<string, string> = {
  bd: 'Bangladesh'
}

const divisionAliases: Record<string, string> = {
  barisal: 'Barishal',
  chittagong: 'Chattogram'
}

const districtAliases: Record<string, string> = {
  barisal: 'Barishal',
  bogra: 'Bogura',
  chittagong: 'Chattogram',
  comilla: 'Cumilla',
  jessore: 'Jashore',
  joypurhat: 'Jaipurhat',
  'coxsbazar': "Cox's Bazar",
  "cox's bazar": "Cox's Bazar",
  "cox'sbazar": "Cox's Bazar",
  'cox s bazar': "Cox's Bazar",
  'b. baria': 'Brahmanbaria',
  'bbaria': 'Brahmanbaria',
  'brahmanbaria': 'Brahmanbaria',
  'chadpur': 'Chandpur',
  'laxmipur': 'Lakshmipur',
  'laksmipur': 'Lakshmipur',
  'narshingdi': 'Narsingdi',
  'jhalokathi': 'Jhalokati',
  'nawabganj': 'Nawabganj',
  'chapai nawabganj': 'Nawabganj'
}

const divisionLabels = new Map(
  (bangladeshDivisions as Option[]).map((division) => [
    normalize(division.value),
    division.label
  ])
)

const districtLabels = new Map<string, string>()
Object.values(bangladeshDistricts as Record<string, Option[]>).forEach((districts) => {
  districts.forEach((district) => {
    districtLabels.set(normalize(district.value), district.label)
  })
})

export const getCountryLabel = (value?: string | null) => {
  if (!value) return ''
  const normalized = normalize(value)
  return countryLabels[normalized] || value
}

export const getDivisionLabel = (value?: string | null) => {
  if (!value) return ''
  const normalized = normalize(value)
  const alias = divisionAliases[normalized]
  const normalizedValue = normalize(alias || value)
  return divisionLabels.get(normalizedValue) || alias || value
}

export const getDistrictLabel = (value?: string | null) => {
  if (!value) return ''
  const normalized = normalize(value)
  const alias = districtAliases[normalized]
  const normalizedValue = normalize(alias || value)
  return districtLabels.get(normalizedValue) || alias || value
}

export const normalizeDivisionValue = (value?: string | null) => {
  if (!value) return ''
  const normalized = normalize(value)
  return divisionAliases[normalized] || value
}

export const normalizeDistrictValue = (value?: string | null) => {
  if (!value) return ''
  const normalized = normalize(value)
  return districtAliases[normalized] || value
}
