<script setup lang="ts">
import { toHead } from 'vue-datocms'

const { data, error } = await useAsyncData('contact', () => $fetch('/api/contact/'))

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode,
		statusMessage: error.value.statusMessage,
		fatal: true
	})
}

const { _seoMetaTags } = data.value.contactPage

useHead(() => {
	if (!data.value) return {}

	return toHead(_seoMetaTags)
})
</script>

<template>
	<main>
		<ContactFeedback />
	</main>
</template>
