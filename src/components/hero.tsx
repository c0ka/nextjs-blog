import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import SectionContainer from './section-container'
import { ReactElement } from 'react'

export function Hero() {
  const { basePath } = useRouter()

  return (
    <SectionContainer className="pb-0 pt-24 overflow-hidden">
      <main className="mx-auto gird lg:grid-col-12 lg:gap-16">
        <section className="max-w-3xl">

        </section>

      </main>
    </SectionContainer>
  )
}

/**
 * Hero Section with angled image on right
 */
export function HeroWithPic(): ReactElement {
  return (
  <SectionContainer>
      <div className="relative z-10 bg-white pt-6 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 lg:max-w-xl lg:w-full">
        <svg
          className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl">
              <span className="block xl:inline">Data to enrich your</span>{' '}
              <span className="block text-indigo-600 xl:inline">online business</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      {/* the way using next/image with tailwindcss, a relative container needed */}
      <div className="relative h-56 w-full sm:h-72 md:h-96 lg:h-full lg:w-full">
        <Image
          objectFit="cover"
          objectPosition="center"
          src="/images/hero-example.avif" 
          layout="fill"
          alt=""
        />
      </div>
    </div>
  </SectionContainer>
  )}

export function HeroSimple() {
  return (
    <SectionContainer className="bg-gray-50">
      <div className="px-4 py-32 lg:flex lg:items-center">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl">
            Understand User Flow.
            <strong className="font-extrabold text-red-700 sm:block">
              Increase Conversation.
            </strong>
          </h1>

          <p className="mt-4 sm:leading-relaxed sm:text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a className="block w-full px-12 py-3 text-sm font-medium text-white bg-red-600 rounded shadow sm:w-auto active:bg-red-500 hover:bg-red-700 focus:outline-none focus:ring"
              href="#">
              Get Started
            </a>
            <a className="block w-full px-12 py-3 text-sm font-medium text-red-600 bg-gray-100 rounded shadow sm:w-auto active:text-red-500 hover:text-red-700 hover:bg-gray-200 focus:outline-none focus:ring"
              href="#">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 