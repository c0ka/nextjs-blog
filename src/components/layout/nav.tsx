import Image from "next/image"
import Link from "next/link"

const name = 'Julian Hu'

export default function Nav() {
  return (
    <header className="flex flex-col items-center mt-12">
      <Link href="/">
        <a>
          <Image
            priority
            src="/images/profile.jpeg"
            className="rounded-full"
            height={108}
            width={108}
            alt={name}
          />
        </a>
      </Link>
      <h2 className="text-slate-900 dark:text-slate-200 text-2xl my-4">
        <Link href="/">
          <a className="text-inherit">{name}</a>
        </Link>
      </h2>
    </header>
  )
}