<script setup lang="ts">
import { storeLayout } from '~/stores/storeLayout'

const { fetch } = storeLayout()
const { locale: currentLocale, locales, setLocale } = useI18n()

watch(currentLocale, () => {
	fetch()
})
</script>

<template>
	<div class="header-locale">
		<div class="header-locale__wrapper">
			<button
				v-for="locale in locales"
				:key="locale"
				class="header-locale__toggle cursor-pointer"
				:class="{ 'is-active': locale === currentLocale }"
				@click="setLocale(locale)"
			>
				{{ locale }}
			</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.header-locale {
	padding-right: 20px;
	align-self: stretch;

	&__wrapper {
		display: flex;
		height: 100%;
	}

	&__toggle {
		border: 0;
		outline: none;
		display: flex;
		justify-self: center;
		align-items: center;
		height: 100%;
		padding: 0 20px;
		font-weight: 800;
		color: var(--color-text);
		text-transform: uppercase;
		background-color: transparent;
		transition-property: color, background-color;
		transition-duration: 100ms;
		transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

		@media (hover: hover) {
			&:hover,
			&:focus-visible {
				color: var(--color-bg);
				background-color: var(--color-text);
			}
		}

		&:disabled {
			pointer-events: none;
		}

		&.is-active {
			color: var(--color-bg);
			background-color: var(--color-text);
			cursor: image-set(url('~/assets/images/cursor@1x.png') 1x, url('~/assets/images/cursor@2x.png') 2x), auto;
		}
	}
}
</style>
