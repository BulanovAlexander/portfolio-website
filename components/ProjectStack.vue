<script setup lang="ts">
import type { Technology } from '~/types/Technology'

interface Props {
	technologies: Technology[]
}

defineProps<Props>()
</script>

<template>
	<div class="project-stack">
		<div class="project-stack__wrapper">
			<div v-for="technology in technologies" :key="technology.id" class="project-stack__technology">
				<img class="project-stack__technology-logo" :src="technology.logo" alt="" />
				<span class="project-stack__technology-label">{{ technology.label }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.project-stack {
	&__wrapper {
		margin: -4px -8px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	&__technology {
		margin: 4px 8px;
		display: flex;
		align-items: center;
	}

	&__technology-logo {
		margin: 0 8px 0 0;
		max-width: 24px;
		min-width: 24px;
		height: auto;
		flex-shrink: 0;
	}

	&__technology-label {
		font-size: 16px;
		font-weight: 600;
		line-height: 24px;
		white-space: nowrap;
	}
}
</style>
