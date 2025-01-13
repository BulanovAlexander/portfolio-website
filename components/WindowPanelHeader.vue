<script setup lang="ts">
interface Props {
	title?: string
	closed?: boolean
}

defineProps<Props>()

const emits = defineEmits<{
	(e: 'close'): void
}>()
</script>

<template>
	<div class="window-panel-header">
		<div class="window-panel-header__button-circles-wrap">
			<button
				v-if="closed"
				class="window-panel-header__button-circles window-panel-header__button-circles_close cursor-pointer"
				@click="emits('close')"
			>
				<NuxtIcon class="window-panel-header__icon" name="close-small" filled />
			</button>
			<div v-else class="window-panel-header__button-circles"></div>
			<div class="window-panel-header__button-circles"></div>
		</div>
		<p class="window-panel-header__title typo-p2">{{ title }}</p>
	</div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts/mixins' as *;

.window-panel-header {
	position: relative;
	border-bottom: 4px solid var(--color-text);
	padding: 14px 20px;
	background-color: var(--color-theme);

	&__button-circles-wrap {
		position: absolute;
		top: 50%;
		left: 20px;
		z-index: 10;
		display: none;
		transform: translateY(-50%);

		@media screen and (min-width: $sm) {
			display: flex;
			align-items: center;

			& > * + * {
				margin-left: 8px;
			}
		}
	}

	&__button-circles {
		border: 4px solid var(--color-text);
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		background-color: var(--color-bg);
	}

	&__button-circles_close {
		transition-property: background-color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;

		@media (hover: hover) {
			&:hover,
			&:focus-visible {
				background-color: var(--color-error);
			}
		}
	}

	&__icon.nuxt-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 12px;
		height: 12px;
		opacity: 0;
		transition-property: opacity;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;

		& > * {
			margin: 0;
			width: 100%;
			height: 100%;
		}
	}

	&__button-circles_close:hover &__icon.nuxt-icon,
	&__button-circles_close:focus-visible &__icon.nuxt-icon {
		opacity: 1;
	}

	&__title {
		@include line-clamp(1);

		margin: 0;
		font-weight: 800;
		text-align: center;
	}
}
</style>
