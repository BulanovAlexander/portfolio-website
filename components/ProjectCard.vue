<script setup lang="ts">
import { StructuredText as DatocmsStructuredText } from 'vue-datocms'
import type { Project } from '~/types/Project'

interface Props {
	project: Project
}

const props = defineProps<Props>()
const { slug, title, description, preview } = props.project

const { t } = useI18n()
const localePath = useLocalePath()

const panelHeaderTitle = computed<string>(() => `${slug}.html`)
const linkTo = computed<string>(() => localePath(`/portfolio/${slug}/`))
// const categories = computed<string>(() => props.project.categories.map(category => category.label).join(', '))
</script>

<template>
	<WindowPanel class="project-card">
		<template #header>
			<WindowPanelHeader :title="panelHeaderTitle" />
		</template>

		<template #thumbnail>
			<WindowPanelThumbnail :thumbnail="preview" />
		</template>

		<template #default>
			<h3 class="project-card__title typo-h3">
				{{ title }}
			</h3>

			<DatocmsStructuredText class="project-card__text" :data="description" />
			<NuxtLink class="project-card__button button" :to="linkTo">
				{{ t('projectDetails') }}
			</NuxtLink>
		</template>
	</WindowPanel>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts/mixins' as *;

.project-card {
	width: 100%;
	height: 100%;

	&__title {
		margin: 0 0 10px;
	}

	&__categories {
		margin: 0 0 24px;
	}

	&__text {
		margin: 0 0 24px;
	}

	&__button {
		margin: auto 0 0;
	}
}
</style>
