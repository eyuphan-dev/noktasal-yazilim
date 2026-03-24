import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { publicApiService } from '../../features/public/services/publicApiService'

const FALLBACK_SEO_BY_PAGE = {
  home: {
    title: 'Noktasal Yazilim',
    description: 'Kurumsal yazilim cozumleri.',
    ogTitle: 'Noktasal Yazilim',
    ogDescription: 'Kurumsal yazilim cozumleri.',
  },
}

function upsertMeta(attrName, attrValue, content) {
  if (!content) {
    return
  }

  let node = document.head.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attrName, attrValue)
    document.head.appendChild(node)
  }

  node.setAttribute('content', content)
}

function resolvePageKey(pathname) {
  if (pathname === '/') {
    return 'home'
  }

  if (pathname.startsWith('/hakkimizda')) {
    return 'about'
  }

  if (pathname.startsWith('/cozumler')) {
    return 'solutions'
  }

  if (pathname.startsWith('/referanslar')) {
    return 'references'
  }

  return 'home'
}

function PageSeoSync() {
  const location = useLocation()
  const seoQuery = useQuery({
    queryKey: ['public-seo-settings'],
    queryFn: () => publicApiService.getSeoSettings(),
  })

  const seoByPage = useMemo(() => {
    const map = { ...FALLBACK_SEO_BY_PAGE }

    for (const item of seoQuery.data || []) {
      map[item.pageKey] = item
    }

    return map
  }, [seoQuery.data])

  useEffect(() => {
    const pageKey = resolvePageKey(location.pathname)
    const seo = seoByPage[pageKey] || FALLBACK_SEO_BY_PAGE.home

    document.title = seo.title || FALLBACK_SEO_BY_PAGE.home.title
    upsertMeta('name', 'description', seo.description || FALLBACK_SEO_BY_PAGE.home.description)
    upsertMeta('property', 'og:title', seo.ogTitle || seo.title || FALLBACK_SEO_BY_PAGE.home.ogTitle)
    upsertMeta(
      'property',
      'og:description',
      seo.ogDescription || seo.description || FALLBACK_SEO_BY_PAGE.home.ogDescription,
    )
  }, [location.pathname, seoByPage])

  return null
}

export default PageSeoSync
