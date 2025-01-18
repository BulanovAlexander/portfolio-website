<script setup lang="ts">
const error = useError()

// 👇 Use Nuxt I18n's auto-imported composable
const localePath = useLocalePath()
const { t } = useI18n()

const handleError = () => {
	clearError({
		redirect: localePath('/')
	})
}
</script>

<template>
	<NuxtLayout>
		<div v-if="error" class="error">
			<PageSection pattern>
				<div class="container">
					<h1 class="error__title">{{ t('failureTitle') }}: {{ error.statusCode }}</h1>
					<p class="error__message">{{ error.statusMessage }}</p>
					<button class="button" type="button" @click="handleError">{{ t('backToHome') }}</button>
				</div>
			</PageSection>
		</div>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
.error {
	background-color: var(--color-bg);
}
</style>
