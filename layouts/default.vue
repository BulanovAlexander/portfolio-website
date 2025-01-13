<template>
	<div class="default">
		<AppHeader />

		<div class="scroll-pinner">
			<slot />

			<AppFooter />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.default {
	height: 100%;
	background-color: var(--color-bg);
}
</style>
