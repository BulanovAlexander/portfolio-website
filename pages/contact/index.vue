<script setup lang="ts">
import { toHead } from 'vue-datocms'

const headers = useRequestHeaders(['cookie'])
const { data, error } = await useAsyncData('contact', () => $fetch('/api/contact/', { headers }))

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode,
		statusMessage: error.value.statusMessage,
		fatal: true
	})
}

const { _seoMetaTags, hero } = data.value.contactPage

useHead(() => {
	if (!data.value) return {}

	return toHead(_seoMetaTags)
})
</script>

<template>
	<main>
		<ContactHero :content="hero" />
	</main>
</template>
