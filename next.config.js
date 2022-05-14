const { default: rehypeSlug } = require('rehype-slug')
const { default: remarkGfm } = require('remark-gfm')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    // to use `MDXProvider` with customized styles of HTML elements 
    // providerImportSource: "@mdx-js/react",
  },
})

module.exports = withMDX({
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})