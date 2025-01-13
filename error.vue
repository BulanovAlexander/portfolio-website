<script setup lang="ts">
const error = useError()

const handleError = () => {
	clearError({
		redirect: '/'
	})
}
</script>

<template>
	<NuxtLayout>
		<div v-if="error" class="error">
			<PageSection pattern>
				<div class="container">
					<h1 class="error__title">Error: {{ error.statusCode }}</h1>
					<p class="error__message">{{ error.statusMessage }}</p>
					<button class="button" type="button" @click="handleError">Вернуться на главную</button>
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
