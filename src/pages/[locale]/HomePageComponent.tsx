import { Carousel } from '#components/Carousel'
import { Container } from '#components/Container'
import { Footer } from '#components/Footer'
import { Header, HeaderProps } from '#components/Header'
import { Page } from '#components/Page'
import { Link } from '#i18n/Link'
import type { StaticPage } from '#utils/homepage'
import type { NextPage } from 'next'

export type Props = HeaderProps & {
  homepage: StaticPage
}

export const HomePageComponent: NextPage<Props> = ({ navigation, homepage }) => {
  return (
    <Page>
      <Container>
        <Header navigation={navigation} />

        <div data-testid='homepage-components' className='mt-10 flex flex-col gap-8'>
          {
            homepage.map(component => {
              switch (component.type) {
                case 'carousel':
                  return (
                    <div key={component.id} data-testid='carousel-page-component'>
                      <Carousel slides={component.slides.map((slide, index) => (
                        <div key={index} className='relative rounded-lg overflow-hidden w-full max-h-[50vh] min-h-[24rem]'>
                          <img alt={slide.image.alt} src={slide.image.src} className='object-cover w-full rounded-lg' />
                          <div className='hidden md:block absolute inset-0 bg-gradient-to-b from-black to-black/0 opacity-50'></div>

                          <div className='flex justify-center relative -top-4 md:text-white md:absolute md:pr-10 md:top-1/2 md:right-0 md:w-1/2 md:-translate-y-1/2'>
                            <div className='bg-white w-11/12 rounded-md flex justify-center py-4 md:bg-transparent'>
                              <div className='w-11/12'>
                                <div className='font-bold text-xl md:text-3xl mb-4'>{slide.title}</div>
                                <div className='leading-snug mb-4'>{slide.description}</div>
                                <Link href={slide.linkHref}>
                                  <a className='py-2 px-4 inline-block font-semibold rounded-md bg-violet-400 text-white text-sm w-full text-center md:w-auto'>
                                    {slide.linkLabel}
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>

                        </div>
                      ))} />
                    </div>
                  )

                case 'hero':
                  return (
                    <div key={component.id} data-testid='hero-page-component'>
                      <Link href={component.href}>
                        <a className='relative block bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1'>
                          <div className='absolute inset-0 bg-gradient-to-b from-black to-black/0 opacity-50'></div>
                          <img alt={component.image.alt} src={component.image.src} className='object-cover w-full h-full' />
                          <div className='absolute w-full text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                            <div className='font-bold text-2xl'>{component.title}</div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  )

                case 'grid':
                  return (
                    <div key={component.id} data-testid='grid-page-component' className='flex flex-wrap gap-4'>
                      {
                        component.items.map((item, index) => (
                          <div key={index} className='relative rounded-lg overflow-hidden h-80 xl:h-96 grow shrink basis-[350px]'>
                            <img alt={item.image.alt} src={item.image.src} className='object-cover w-full h-full' />
                            <div className='absolute inset-0 bg-gradient-to-b from-black to-black/0 opacity-50'></div>
                            <div className='absolute top-1/2 -translate-y-1/2 text-white w-2/3 left-1/2 -translate-x-1/2 text-center p-4'>
                              <div className='font-bold text-3xl mb-4'>{item.title}</div>
                              <div className='leading-snug mb-4'>{item.description}</div>

                              <Link href={item.linkHref}>
                                <a className='py-2 px-4 inline-block font-semibold rounded-md bg-violet-400 text-white text-sm'>
                                  {item.linkLabel}
                                </a>
                              </Link>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
              }
            })
          }
        </div>

      </Container>

      <Footer />
    </Page>
  )
}
