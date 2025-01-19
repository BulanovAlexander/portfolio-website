<script setup lang="ts">
import { StructuredText as DatocmsStructuredText } from 'vue-datocms'
const route = useRoute()

const headers = useRequestHeaders(['cookie'])
const { data, error } = await useAsyncData('project', () => $fetch(`/api/portfolio/${route.params.slug}/`, { headers }))

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode || 404,
		statusMessage: error.value.statusMessage || 'Страница не найдена',
		fatal: true
	})
}

const { slug, preview, text } = data.value.projectPost

const panelHeaderTitle = computed<string>(() => `${slug}.html`)
const { renderBlock } = useDatoRender()
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
	<main>
		<PageSection pattern>
			<div class="container">
				<WindowPanel>
					<template #header>
						<WindowPanelHeader :title="panelHeaderTitle" />
					</template>

					<template #thumbnail>
						<WindowPanelThumbnail class="large" :thumbnail="preview" />
					</template>

					<template #default>
						<div class="user-container">
							<DatocmsStructuredText class="user-content" :data="text" :render-block="renderBlock" />
						</div>
					</template>
				</WindowPanel>
			</div>
		</PageSection>

		<PageSection small>
			<PageSectionHeader>
				<h2 class="typo-h2">{{ t('allProjects') }}</h2>

				<NuxtLink class="typo-link" :to="localePath('/portfolio/')">{{ t('backToProjects') }}</NuxtLink>
			</PageSectionHeader>
		</PageSection>
	</main>
</template>
