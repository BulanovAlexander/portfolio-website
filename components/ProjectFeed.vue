<script setup lang="ts">
import type { Project } from '~/types/Project'

interface Props {
	projects: Project[]
}

defineProps<Props>()
const { t } = useI18n()
</script>

<template>
	<div class="project-feed">
		<div class="container">
			<div class="project-feed__wrapper">
				<template v-if="projects.length > 0">
					<ProjectFeedCard v-for="project in projects" :key="project.id" :project="project" />
				</template>
				<template v-else>
					<h2 class="typo-h2">{{ t('emptyPlaceholder') }}</h2>
				</template>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.project-feed {
	&__wrapper {
		& > * + * {
			margin-top: 36px;
		}
	}
}
</style>
