<script setup lang="ts">
import type { Media } from '~/types/Media'

interface Props {
	content: Media
}

const props = defineProps<Props>()
const { url: cardImageUrl, alt: cardImageAlt } = props.content

const panelHeaderTitle = computed<string>(() => `achievement.html`)
</script>

<template>
	<WindowPanel class="about-achievements-card">
		<template #header>
			<WindowPanelHeader :title="panelHeaderTitle" />
		</template>

		<template #default>
			<img class="about-achievements-card__image" :src="cardImageUrl" width="264" height="370" :alt="cardImageAlt" />
		</template>
	</WindowPanel>
</template>

<style lang="scss" scoped>
.about-achievements-card {
	&__image {
		display: flex;
		width: 100%;
		height: auto;
		object-fit: contain;
	}
}
</style>
