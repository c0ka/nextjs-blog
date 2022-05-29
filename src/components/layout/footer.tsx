import Link from "next/link"
import DarkModeToggle from "../DarkModeToggle"

export default function Footer() {
  return (
    <footer className="mt-12">
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <DarkModeToggle />
    </footer>
  )    
}