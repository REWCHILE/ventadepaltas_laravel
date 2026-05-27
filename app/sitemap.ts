import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ventadepaltas.cl'

  // 1. Static Pages
  const staticPaths = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/venta-de-paltas-por-mayor`, lastModified: new Date() },
    { url: `${baseUrl}/proveedor-de-paltas-santiago`, lastModified: new Date() },
    { url: `${baseUrl}/palta-hass-por-mayor`, lastModified: new Date() },
    { url: `${baseUrl}/paltas-para-restaurantes`, lastModified: new Date() },
    { url: `${baseUrl}/paltas-para-casinos`, lastModified: new Date() },
    { url: `${baseUrl}/paltas-para-empresas`, lastModified: new Date() },
    { url: `${baseUrl}/contacto`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
  ]

  let seoPagePaths: any[] = []
  let blogPostPaths: any[] = []

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Query DB for active dynamic pages if credentials are set
    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const supabase = createAdminClient()

      const { data: seoPages } = await supabase
        .from('seo_pages')
        .select('slug, updated_at')
        .eq('publicada', true)

      const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at')
        .eq('publicada', true)

      if (seoPages) {
        seoPagePaths = seoPages.map((page) => ({
          url: `${baseUrl}/${page.slug}`,
          lastModified: new Date(page.updated_at),
        }))
      }

      if (posts) {
        blogPostPaths = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at),
        }))
      }
    }
  } catch (e) {
    console.error('Error generating dynamic sitemap paths:', e)
  }

  return [...staticPaths, ...seoPagePaths, ...blogPostPaths]
}
