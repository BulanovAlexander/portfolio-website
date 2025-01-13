<script setup lang="ts">
import type { Media } from '~/types/Media'

interface Props {
	thumbnail: Media
}

const props = defineProps<Props>()
const { url: thumbnailUrl, alt: thumbnailAlt } = props.thumbnail
</script>

<template>
	<div class="window-panel-thumbnail">
		<img class="window-panel-thumbnail__img" :src="thumbnailUrl" width="280" height="160" :alt="thumbnailAlt" />
	</div>
</template>

<style lang="scss" scoped>
.window-panel-thumbnail {
	border-bottom: 4px solid var(--color-text);
	height: 160px;
	filter: grayscale(100%);

	&__img {
		display: flex;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.window-panel-thumbnail.large {
	height: 300px;
}
</style>
