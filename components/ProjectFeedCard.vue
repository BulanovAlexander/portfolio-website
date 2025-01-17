<script setup lang="ts">
import type { Project } from '~/types/Project'

interface Props {
	project: Project
}

const props = defineProps<Props>()
const { slug } = props.project
const linkTo = computed<string>(() => `/portfolio/${slug}/`)
const categories = computed<string>(() => props.project.categories.map(category => category.label).join(', '))
// 👇 Use Nuxt I18n's auto-imported composable
const localePath = useLocalePath()
</script>

<template>
	<div class="project-card">
		<NuxtLink class="project-card__link" :to="localePath(linkTo)">
			<div class="project-card__body">
				<div>
					{{ project.title }}
					<template v-if="categories"> ({{ categories }}) </template>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.project-card {
	border: 4px solid var(--color-text);
	box-shadow: 8px 8px 0 0 var(--color-text);
	background-color: var(--color-bg);

	&__link {
		display: flex;
		text-decoration: none;
		color: var(--color-text);
		background-color: var(--color-bg);
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
	}

	&__body {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
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
