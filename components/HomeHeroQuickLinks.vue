<script setup lang="ts">
import type { Link } from '~/types/Link'

interface Props {
	content: {
		title: string
		links: Link[]
	}
}

const props = defineProps<Props>()
const { title, links } = props.content

const localePath = useLocalePath()
</script>

<template>
	<div class="quick-links">
		<p class="quick-links__title typo-h3">{{ title }}</p>

		<div class="quick-links__wrapper">
			<template v-for="link in links" :key="link.id">
				<NuxtLink v-if="link.to" class="quick-links__link" :to="localePath(link.to)"
					>{{ link.label }}
					<NuxtIcon class="quick-links__icon" name="arrow-top-right" filled />
				</NuxtLink>
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.quick-links {
	&__title {
		margin: 0 0 10px;
	}

	&__wrapper {
		border: 4px solid var(--color-text);
		display: flex;
		flex-direction: column;
		background-color: var(--color-theme);

		@media screen and (min-width: $sm) {
			flex-direction: row;
		}
	}

	&__link {
		border-bottom: 4px solid var(--color-text);
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 12px;
		font-size: 20px;
		font-weight: 700;
		text-decoration: none;
		color: var(--color-text);
		background-color: var(--color-theme);
		transition-property: color, background-color;
		transition-duration: 100ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		@media (hover: hover) {
			&:hover,
			&:focus-visible {
				color: var(--color-bg);
				background-color: var(--color-text);
			}
		}

		@media screen and (min-width: $sm) {
			border-bottom: 0;
			border-right: 4px solid var(--color-text);
			white-space: nowrap;
		}

		@media screen and (min-width: $lg) {
			padding: 20px;
			font-size: 24px;
			width: 25%;
		}
	}

	&__link:last-of-type {
		border-bottom: 0;

		@media screen and (min-width: $sm) {
			border-right: 0;
		}
	}

	&__icon.nuxt-icon {
		margin: 0 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		width: 24px;
		height: 24px;

		& > * {
			margin: 0;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
