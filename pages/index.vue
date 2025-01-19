<script setup lang="ts">
import { toHead } from 'vue-datocms'

const headers = useRequestHeaders(['cookie'])
const { data, error } = await useAsyncData('home', () => $fetch('/api/home/', { headers }))

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode,
		statusMessage: error.value.statusMessage,
		fatal: true
	})
}

const { _seoMetaTags, hero, quick, recent } = data.value.homePage

useHead(() => {
	if (!data.value) return {}

	return toHead(_seoMetaTags)
})
</script>

<template>
	<main>
		<HomeHero :content="hero">
			<HomeHeroQuickLinks :content="quick" />
		</HomeHero>
		<HomeRecents :content="recent" />
	</main>
</template>
