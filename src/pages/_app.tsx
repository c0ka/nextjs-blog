import type { AppProps } from 'next/app'
import { ThemeProvider } from '../lib/theme.provider'

import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
