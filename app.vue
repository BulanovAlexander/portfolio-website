<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'

const { locale: currentLocale } = useI18n()

useHead(() => ({
	htmlAttrs: {
		lang: currentLocale.value
	}
}))
</script>

<template>
	<div id="app">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>

		<ClientOnly>
			<ModalsContainer />
		</ClientOnly>
	</div>
</template>
