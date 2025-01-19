<script setup lang="ts">
import type { Post } from '~/types/Post'

interface Props {
	post: Post
}

const props = defineProps<Props>()
const { slug, title } = props.post

const localePath = useLocalePath()
const linkTo = computed<string>(() => localePath(`/blog/${slug}/`))
</script>

<template>
	<div class="blog-card">
		<NuxtLink class="blog-card__link" :to="linkTo">
			<div class="blog-card__body">{{ title }}</div>
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.blog-card {
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
