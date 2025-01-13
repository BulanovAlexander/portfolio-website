<script setup lang="ts">
import { StructuredText as DatocmsStructuredText } from 'vue-datocms'

const route = useRoute()
const { data, error } = await useAsyncData('post', () => $fetch(`/api/blog/${route.params.slug}/`))

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode || 404,
		statusMessage: error.value.statusMessage || 'Страница не найдена',
		fatal: true
	})
}

const { slug, content, preview } = data.value.blogPost

const panelHeaderTitle = computed<string>(() => `${slug}.html`)
const { renderBlock } = useDatoRender()
const router = useRouter()
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
						<div class="container">
							<DatocmsStructuredText :data="content" :render-block="renderBlock" />
						</div>
					</template>
				</WindowPanel>
			</div>
		</PageSection>

		<PageSection small>
			<PageSectionHeader>
				<h2 class="typo-h2">Все статьи</h2>
				<NuxtLink class="typo-link" to="/" @click.prevent="router.go(-1)">Назад к статьям</NuxtLink>
			</PageSectionHeader>
		</PageSection>
	</main>
</template>
