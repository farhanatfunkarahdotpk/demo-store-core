import { z } from 'zod'

const organization_schema = z.object({
  // id: z.string(),
  // type: z.string(),

  // created_at: z.string(),
  // updated_at: z.string(),
  // reference: z.string().nullable(),
  // reference_origin: z.string().nullable(),
  // metadata: z.object({}).catchall(z.any()),

  name: z.string().nullable(),
  slug: z.string().nullable(),
  // domain: z.string().nullable(),
  // support_phone: z.string().nullable(),
  // support_email: z.string().nullable(),
  logo_url: z.string().nullable(),
  favicon_url: z.string().nullable(),
  primary_color: z.string().nullable(),
  // contrast_color: z.string().nullable(),
  // gtm_id: z.string().nullable(),
  // gtm_id_test: z.string().nullable(),
  // discount_disabled: z.boolean().nullable(),
  // account_disabled: z.boolean().nullable(),
  // acceptance_disabled: z.boolean().nullable(),
  // max_concurrent_promotions: z.number().nullable(),
  // max_concurrent_imports: z.number().nullable(),
})

export const rawDataOrganization_schema = organization_schema

export type RawDataOrganization = z.infer<typeof organization_schema>