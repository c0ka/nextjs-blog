import Link from 'next/link'
import { useRouter } from 'next/router'

import SectionContainer from './section-container'

export default function Hero() {
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