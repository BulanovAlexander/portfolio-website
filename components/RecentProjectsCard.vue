<script setup lang="ts">
import { StructuredText as DatocmsStructuredText } from 'vue-datocms'
import type { Project } from '~/types/Project'

interface Props {
	project: Project
}

const props = defineProps<Props>()

const { slug, title, description, preview } = props.project
const panelHeaderTitle = computed<string>(() => `${slug}.html`)
const linkTo = computed<string>(() => `/portfolio/${slug}/`)
const { t } = useI18n()
</script>

<template>
	<WindowPanel class="recent-project-card">
		<template #header>
			<WindowPanelHeader :title="panelHeaderTitle" />
		</template>

		<template #thumbnail>
			<WindowPanelThumbnail :thumbnail="preview" />
		</template>

		<template #default>
			<h3 class="recent-project-card__title typo-h3">{{ title }}</h3>
			<DatocmsStructuredText class="recent-project-card__text" :data="description" />
			<NuxtLink class="recent-project-card__button button" :to="linkTo">
				{{ t('projectDetails') }}
			</NuxtLink>
		</template>
	</WindowPanel>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts/mixins' as *;

.recent-project-card {
	width: 100%;
	height: 100%;

	&__title {
		margin: 0 0 10px;
	}

	&__text {
		margin: 0 0 24px;
	}
}
</style>
