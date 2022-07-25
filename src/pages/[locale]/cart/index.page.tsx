import type { HeaderProps } from '#components/Header'
import { Page } from '#components/Page'
import { Title } from '#components/Title'
import { useAuthContext } from '#contexts/AuthContext'
import { serverSideSettings, useSettingsContext } from '#contexts/SettingsContext'
import { getLocale } from '#i18n/locale'
import { serverSideTranslations } from '#i18n/serverSideTranslations'
import { withLocalePaths } from '#i18n/withLocalePaths'
import { getCatalog, getRootNavigationLinks } from '#utils/catalog'
import { getPersistKey } from '#utils/order'
import IframeResizer from 'iframe-resizer-react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { useI18n } from 'next-localization'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CartPage: React.FC<HeaderProps> = ({ navigation }) => {
  const [cartUrl, setCartUrl] = useState<string | null>(null)

  const i18n = useI18n()
  const auth = useAuthContext()
  const settings = useSettingsContext()

  const router = useRouter()

  const cartTitle = i18n.t('general.yourCart')

  useEffect(() => {
    let isMounted = true

    ; (async () => {
      const locale = await getLocale(router.query.locale)

      if (locale.isShoppable && auth.accessToken) {
        const persistKey = getPersistKey(locale)
        const orderId = localStorage.getItem(persistKey)

        if (isMounted) {
          // TODO: orderId is possibly null
          setCartUrl(`https://${settings.organization?.slug}.stg.commercelayer.app/cart/${orderId}?embed=true&accessToken=${auth.accessToken}`)
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [router.query.locale, auth, settings.organization?.slug])

  return (
    <Page navigation={navigation} title={cartTitle}>
      <Title title={<>{cartTitle}</>}></Title>
      {
        cartUrl && (
          <IframeResizer
            style={{ width: '1px', minWidth: '100%' }}
            src={cartUrl} />
        )
      }
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return withLocalePaths({
    paths: [],
    fallback: false
  })
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { locale: localeCode } = params!
  const locale = await getLocale(localeCode)
  const catalog = getCatalog(locale)

  return {
    props: {
      navigation: getRootNavigationLinks(catalog),
      ...(await serverSideSettings(localeCode)),
      ...(await serverSideTranslations(localeCode))
    }
  }
}

export default CartPage