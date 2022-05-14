const generateRssItem = (post: any): string => `
<item>
  <guid>${process.env.NEXT_PUBLIC_URL}/blog/${post.url}</guid>
  <title>${post.title}</title>
  <link>${process.env.NEXT_PUBLIC_URL}/blog/${post.url}</link>
  <description>${post.description}</description>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>
`

export const generateRss = (posts: any[]): string => {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Blog - Egotour</title>
      <link>${process.env.NEXT_PUBLIC_URL}</link>
      <description>Latest news from Egotour</description>
      <language>zh-cn</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="https://${process.env.NEXT_PUBLIC_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`
}
