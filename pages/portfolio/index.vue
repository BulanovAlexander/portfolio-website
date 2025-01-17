<script setup lang="ts">
import { toHead } from 'vue-datocms'
import { storeSetup } from '~/stores/storeSetup'
import type { Project } from '~/types/Project'

const { setup } = storeSetup()
const route = useRoute()
const query = ref(route.query)

const headers = useRequestHeaders(['cookie'])
const { data, error, status, refresh } = await useAsyncData('portfolio', () =>
	$fetch('/api/portfolio/', {
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
const pageTotal = computed(() => Math.ceil(data.value._allProjectPostsMeta.count / limit))
const fetchProjectPosts = computed<Project[]>(() => data.value.allProjectPosts || [])
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

const { _seoMetaTags } = data.value.portfolioPage

useHead(() => {
	if (!data.value) return {}

	return toHead(_seoMetaTags)
})
</script>

<template>
	<main>
		<PageSection>
			<ProjectFeed :projects="fetchProjectPosts" />
			<UIPagination v-if="pageTotal > 1" :page-total="pageTotal" :is-loading="isLoading" />
		</PageSection>
	</main>
</template>
