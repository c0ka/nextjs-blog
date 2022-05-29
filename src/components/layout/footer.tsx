import Link from "next/link"
import ThemeToggle from "../theme-toggle"

export default function Footer() {
  return (
    <footer className="mt-12">
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <ThemeToggle />
    </footer>
  )    
}