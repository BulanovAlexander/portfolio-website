export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig()
	const datoCmsUrl = runtimeConfig.public.datoCmsUrl as string
	const publishToken = runtimeConfig.public.datoCmsReadOnlyPublishToken as string
	const locale = getCookie(event, 'i18n_redirected') || 'ru'

	const graphqlQuery = `{
		aboutPage(locale: ${locale}) {
			_seoMetaTags {
				content
				tag
				attributes
			}
			hero(locale: ${locale}) {
				id
				title
				text {
				  	value
					blocks {
						__typename,
						... on ImageBlockRecord {
						 	id
							image {
								id
								url
								alt
							}
						}
					}
				}
				button {
					id
					label
					to
				}
			}
			achievement(locale: ${locale}) {
				title
				id
				gallery {
					id
					url
					alt
				}
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
