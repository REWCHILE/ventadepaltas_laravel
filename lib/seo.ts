import { Metadata } from 'next'

interface SEOParams {
  title: string
  description: string
  slug: string
  noIndex?: boolean
  ogImage?: string
}

export function getMetadata({ title, description, slug, noIndex = false, ogImage }: SEOParams): Metadata {
  const baseUrl = 'https://ventadepaltas.cl'
  const canonicalUrl = `${baseUrl}${slug.startsWith('/') ? slug : `/${slug}`}`
  const image = ogImage || `${baseUrl}/images/og-paltas.jpg`
  
  return {
    title: `${title} | Venta de Paltas Hass al por Mayor`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Venta de Paltas al por Mayor Chile`,
      description,
      url: canonicalUrl,
      siteName: 'VENTADEPALTAS.CL',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_CL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Venta de Paltas al por Mayor Chile`,
      description,
      images: [image],
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
  }
}
