<script setup lang="ts">
import { toHead } from 'vue-datocms'
import { storeSetup } from '~/stores/storeSetup'
import type { Post } from '~/types/Post'

const { setup } = storeSetup()
const route = useRoute()
const query = ref(route.query)

const headers = useRequestHeaders(['cookie'])
const { data, error, status, refresh } = await useAsyncData('blog', () =>
	$fetch('/api/blog/', {
		headers,
		query: query.value
	})
)

const isLoading = computed(() => status.value === 'pending')

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode,
		statusMessage: error.value.statusMessage,
		fatal: true
	})
}

const limit = route.query.limit ? Number(route.query.limit) : setup!.perPage
const pageTotal = computed(() => Math.ceil(data.value._allBlogPostsMeta.count / limit))
const fetchBlogPosts = computed<Post[]>(() => data.value.allBlogPosts || [])
watch(
	() => route.query,
	async () => {
		query.value = route.query
		await refresh()

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}
)

const { _seoMetaTags, hero } = data.value.blogPage

useHead(() => {
	if (!data.value) return {}

	return toHead(_seoMetaTags)
})
</script>

<template>
	<main>
		<BlogHero :content="hero" />
		<PageSection pattern>
			<BlogFeed :posts="fetchBlogPosts" />
			<UIPagination v-if="pageTotal > 1" :page-total="pageTotal" :is-loading="isLoading" />
		</PageSection>
	</main>
</template>
