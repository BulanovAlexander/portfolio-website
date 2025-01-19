<template>
	<div class="window-panel">
		<slot v-if="$slots.header" name="header" />
		<slot v-if="$slots.thumbnail" name="thumbnail" />

		<div class="window-panel__body">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.window-panel {
	border: 4px solid var(--color-text);
	display: flex;
	flex-direction: column;
	background-color: var(--color-bg);
	box-shadow: 8px 8px 0 0 var(--color-text);

	&__body {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		flex-grow: 1;
		padding: 20px;

		@media screen and (min-width: $sm) {
			padding: 28px;
		}

		@media screen and (min-width: $md) {
			padding: 36px;
		}

		@media screen and (min-width: $lg) {
			padding: 32px;
		}
	}
}
</style>
