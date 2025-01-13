export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig()
	const datoCmsUrl = runtimeConfig.public.datoCmsUrl as string
	const publishToken = runtimeConfig.public.datoCmsReadOnlyPublishToken as string
	const slug = getRouterParam(event, 'slug')

	const graphqlQuery = `{
		projectPost(filter: {slug: {eq: "${slug}"}}) {
			id
			_createdAt
			slug
			title
			preview {
				id
				url
				alt
			}
			technologies {
				id
				label
			}
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
			_createdAt
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

	if (data.projectPost === null) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Страница не найдена',
			fatal: true
		})
	}

	return data
})
