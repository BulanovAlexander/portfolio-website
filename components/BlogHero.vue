<script setup lang="ts">
import { StructuredText as DatocmsStructuredText } from 'vue-datocms'
import type { Link } from '~/types/Link'

interface Props {
	content: {
		title: string
		text: any
		button?: Link
	}
}

const props = defineProps<Props>()
const { title, text } = props.content

const { renderBlock } = useDatoRender()
</script>

<template>
	<PageSection class="blog-hero" small>
		<PageSectionHeader class="blog-hero__header">
			<h1 class="blog-hero__title typo-h2">{{ title }}</h1>
			<DatocmsStructuredText class="blog-hero__sub-title typo-subhead" :data="text" :render-block="renderBlock" />
		</PageSectionHeader>
	</PageSection>
</template>

<style lang="scss" scoped>
.blog-hero {
	&__header {
		margin: 0;
	}

	&__title {
		margin: 0 0 12px;
	}
}
</style>
