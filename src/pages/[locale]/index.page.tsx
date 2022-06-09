import { Container } from '#components/Container'
import { Footer } from '#components/Footer'
import { Header, HeaderProps } from '#components/Header'
import { Page } from '#components/Page'
import { getCatalog } from '#data/catalogs'
import { Link } from '#i18n/Link'
import { getLocale } from '#i18n/locale'
import { serverSideTranslations } from '#i18n/serverSideTranslations'
import { withLocalePaths } from '#i18n/withLocalePaths'
import { basePath } from '#next.config'
import { getRootNavigationLinks } from '#utils/catalog'
import { getSearchUrl } from '#utils/url'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useI18n } from 'next-localization'

type Query = {
  locale: string
}

type Props = HeaderProps & {
  primaryTaxonomy: {
    id: string
    taxons: {
      id: string
      slug: string
      image?: string
      description: string
      label: string
    }[]
  }
}

const HomePage: NextPage<Props> = ({ navigation, primaryTaxonomy }) => {
  return (
    <Page>
      <Container>
        <Header navigation={navigation} />

        <LegacyTaxonomyComponent key={primaryTaxonomy.id} taxonomy={primaryTaxonomy} />

      </Container>

      <Footer />
    </Page>
  )
}

const LegacyTaxonomyComponent: React.FC<{ taxonomy: Props['primaryTaxonomy'] }> = ({ taxonomy }) => {
  const i18n = useI18n();

  return (
    <div>
      <div className="mt-6 space-y-6 md:space-y-0 grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {
          taxonomy.taxons.map(taxon => (
            <Link key={taxon.id} href={getSearchUrl(taxon.slug)}>
              <a className='relative w-full h-80 xl:h-96 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1'>
                <img className="object-cover w-full h-full" src={`${basePath}${taxon.image}`} alt={taxon.description} />
                <div className='absolute inset-0 bg-gradient-to-b from-black to-black/0 opacity-50'></div>
                <div className="absolute p-4 top-0 inset-x-0 text-white leading-snug">
                  <h3 className='text-lg font-semibold'>{taxon.label}</h3>
                  <div className='text-md font-medium text-gray-300'>{taxon.description}</div>
                </div>
                <div className="absolute p-4 bottom-0 inset-x-0 text-white leading-snug text-lg">
                  <div className='font-semibold'>{`${i18n.t('general.viewAll')} ->`}</div>
                </div>
              </a>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<Query> = () => {
  return withLocalePaths({
    paths: [],
    fallback: false
  })
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const { locale: localeCode } = params!
  const locale = getLocale(localeCode)
  const catalog = getCatalog(locale)

  return {
    props: {

      primaryTaxonomy: { // TODO: remove from homepage
        id: catalog.taxonomies[0].id,
        taxons: catalog.taxonomies[0].taxons.map(taxon => ({
          description: taxon.description,
          image: taxon.image,
          id: taxon.id,
          label: taxon.label,
          slug: taxon.slug
        }))
      },

      navigation: getRootNavigationLinks(catalog),
      ...(await serverSideTranslations(localeCode))
    }
  }
}

export default HomePage
