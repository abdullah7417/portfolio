interface SeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
  noindex?: boolean
}

export function useSeo(options: SeoOptions) {
  const { public: { siteUrl } } = useRuntimeConfig()
  const route = useRoute()
  const absolute = (path?: string) => (path && siteUrl ? new URL(path, siteUrl).href : path)

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: () => absolute(toValue(options.image)),
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: options.noindex ? 'noindex, nofollow' : undefined,
  })

  if (siteUrl) {
    useHead({ link: [{ rel: 'canonical', href: () => absolute(route.path) }] })
  }
}
