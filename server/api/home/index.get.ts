export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig()
	const datoCmsUrl = runtimeConfig.public.datoCmsUrl as string
	const publishToken = runtimeConfig.public.datoCmsReadOnlyPublishToken as string
	const locale = getCookie(event, 'i18n_redirected') || 'ru'

	const graphqlQuery = `{
		homePage(locale: ${locale}) {
			_seoMetaTags {
				content
				tag
				attributes
			}
			hero {
				title
				text {
					value
				}
				button {
					id
					label
					to
				}
			}
			quick {
				title
				links {
					id
					label
					to
				}
			}
			recent {
				title
				projects {
					id
					_createdAt
					slug
					title
					description {
						value
					}
					categories {
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
