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
const panelHeaderTitle = computed<string>(() => `contact.html`)

const { renderBlock } = useDatoRender()
const { t } = useI18n()
const { openSuccessModal, openFailureModal } = useFinalModal()

function handleSubmitFailure(error: any): void {
	openFailureModal(t, error)
}

function handleSubmitSuccess(): void {
	openSuccessModal(t)
}
</script>

<template>
	<PageSection class="contact-hero" pattern>
		<div class="container">
			<WindowPanel>
				<template #header>
					<WindowPanelHeader :title="panelHeaderTitle" />
				</template>

				<template #default>
					<div class="container">
						<h2 class="contact-hero__title typo-h2">{{ title }}</h2>
						<DatocmsStructuredText class="contact-hero__text typo-p2" :data="text" :render-block="renderBlock" />

						<ContactForm @submit-success="handleSubmitSuccess" @submit-failure="handleSubmitFailure" />
					</div>
				</template>
			</WindowPanel>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.contact-hero {
	&__title {
		margin: 0 0 10px;
	}

	&__text {
		margin: 0 0 24px;
	}
}
</style>
