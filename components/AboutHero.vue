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

const { title, text, button } = props.content
const panelHeaderTitle = computed<string>(() => `about.html`)

const { renderBlock } = useDatoRender()
</script>

<template>
	<PageSection class="about-hero" pattern>
		<div class="container">
			<WindowPanel>
				<template #header>
					<WindowPanelHeader :title="panelHeaderTitle" />
				</template>

				<template #default>
					<div class="about-hero__text">
						<div class="user-content container">
							<h1>{{ title }}</h1>

							<DatocmsStructuredText :data="text" :render-block="renderBlock" />

							<a v-if="button" class="button" :href="button.to" target="_blank" download> {{ button.label }}</a>
						</div>
					</div>
				</template>
			</WindowPanel>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.about-hero {
	&__text {
		text-align: justify;

		.container {
			@media screen and (max-width: $sm) {
				padding: 0;
			}
		}
	}

	:deep(img) {
		border-radius: 50%;
		display: flex;
		width: 100%;

		@media screen and (min-width: $md) {
			margin-top: 12px;
			margin-right: 24px;
			margin-bottom: 12px;
			width: 200px;
			float: left;
		}
	}
}
</style>
