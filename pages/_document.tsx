import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head></Head>
        <body className="antialiased 
          bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}