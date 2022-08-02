import type { RawDataCountry } from '@commercelayer/demo-store-types'
import { CountriesByRegion, groupByRegion } from './countries'

test('should be able to group locales by their region', () => {
  const italy: RawDataCountry = { code: 'IT', default_language: 'it', market: 1234, name: 'Italy', region: 'Europe', catalog: 'AMER' }
  const unitedStates: RawDataCountry = { code: 'US', default_language: 'en', market: 9876, name: 'United States', region: 'Americas', catalog: 'AMER' }
  const singapore: RawDataCountry = { code: 'SG', default_language: 'en', market: 9876, name: 'Singapore', region: 'Asia', catalog: 'AMER' }
  const canada: RawDataCountry = { code: 'CA', default_language: 'en', market: 9876, name: 'Canada', region: 'Americas', catalog: 'AMER' }

  const actual = groupByRegion([italy, unitedStates, singapore, canada])

  const expects: CountriesByRegion = {
    'Americas': [unitedStates, canada],
    'Asia': [singapore],
    'Europe': [italy],
  }

  expect(actual).toStrictEqual(expects)
})
