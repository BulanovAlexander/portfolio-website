<script setup lang="ts">
import { toHead } from 'vue-datocms'

const { data, error } = await useAsyncData('about', () => $fetch('/api/about/'))

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode,
		statusMessage: error.value.statusMessage,
		fatal: true
	})
}

const { _seoMetaTags, hero, achievement } = data.value.aboutPage

useHead(() => {
	if (!data.value) return {}

	return toHead(_seoMetaTags)
})
</script>

<template>
	<main>
		<AboutHero :content="hero" />
		<AboutAchievements :content="achievement" />
	</main>
</template>
