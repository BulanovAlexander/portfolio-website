import { storeSetup } from '~/stores/storeSetup'

export default defineEventHandler(async event => {
	const { setup } = storeSetup()
	const runtimeConfig = useRuntimeConfig()
	const datoCmsUrl = runtimeConfig.public.datoCmsUrl as string
	const publishToken = runtimeConfig.public.datoCmsReadOnlyPublishToken as string

	const query = getQuery(event)
	const limit = Number(query.limit) || setup!.perPage
	const skip = Number(query.page) ? limit * (Number(query.page) - 1) : 0
	const locale = getCookie(event, 'i18n_redirected') || 'ru'

	const graphqlQuery = `{
	  	portfolioPage {
			_seoMetaTags(locale: ${locale}) {
				content
				tag
				attributes
			}
		}
		_allProjectPostsMeta(filter: {}) {
			count
		}
		allProjectPosts(locale: ${locale}, first: ${limit}, skip: ${skip}) {
			id
			_createdAt
			slug
			title
			description(locale: ${locale}) {
				value
			}
			categories(locale: ${locale}) {
				id
				label
				value
			}
			preview {
				id
				url
				alt
			}
		}
	}`

	const response = await $fetch<{ data: any; errors?: any }>(datoCmsUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${publishToken}`
		},
		body: {
			query: graphqlQuery
		}
	})

	const { data, errors } = response

	if (errors)
		throw createError({
			statusCode: 500,
			statusMessage: errors.map((error: any) => error.message).join(', '),
			fatal: true
		})

	return data
})
