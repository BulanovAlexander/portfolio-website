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
	<PageSection class="project-hero" small>
		<PageSectionHeader class="project-hero__header">
			<h1 class="project-hero__title typo-h2">{{ title }}</h1>
			<DatocmsStructuredText class="project-hero__sub-title typo-subhead" :data="text" :render-block="renderBlock" />
		</PageSectionHeader>
	</PageSection>
</template>

<style lang="scss" scoped>
.project-hero {
	&__header {
		margin: 0;
	}

	&__title {
		margin: 0 0 12px;
	}
}
</style>
