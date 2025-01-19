<script setup lang="ts">
import { view } from '~/constants.js'
import type { Project } from '~/types/Project'

interface Props {
	content: {
		title: string
		projects: Project[]
	}
}

const props = defineProps<Props>()
const { title, projects } = props.content

const { $gsap, $ScrollTrigger } = useNuxtApp()

function initHorizontalScroll() {
	destroyHorizontalScroll()

	const slides = $gsap.utils.toArray('.scroll-slide')

	const tween = $gsap.to(slides, {
		xPercent: -100 * (slides.length - 1),
		ease: 'none'
	})

	$ScrollTrigger.create({
		id: 'tween02',
		trigger: '.scroll-trigger',
		start: 'top center-=35%',
		end: 'end+=4000',
		markers: false,
		pin: '.scroll-pinner',
		scrub: true,
		animation: tween
	})

	$ScrollTrigger.update()
}

function destroyHorizontalScroll() {
	$ScrollTrigger.getById('tween02')?.kill()
}

function handleResize(event: Event) {
	if (window.innerWidth >= view.lg) {
		initHorizontalScroll()
	} else {
		destroyHorizontalScroll()
	}
}

onMounted(() => {
	nextTick(() => {
		if (window.innerWidth >= view.lg) {
			initHorizontalScroll()
		}
		window.addEventListener('resize', handleResize)
	})
})

onBeforeUnmount(() => {
	destroyHorizontalScroll()
	window.removeEventListener('resize', handleResize)
})
</script>

<template>
	<PageSection class="home-recents" pattern>
		<div class="home-recents__container scroll-trigger">
			<PageSectionHeader class="home-recents__header">
				<h2 class="typo-h2">{{ title }}</h2>
			</PageSectionHeader>

			<div class="container">
				<div class="home-recents__wrapper">
					<div v-for="project in projects" :key="project.id" class="home-recents__slide scroll-slide">
						<ProjectCard class="home-recents__project" :project="project" />
					</div>
				</div>
			</div>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.home-recents.section {
	padding-top: 146px;
}

.home-recents {
	&__container {
		overflow: hidden;
	}

	&__header.page-section-header {
		margin: 0 0 16px;
	}

	&__wrapper {
		& > * + * {
			margin-top: 36px;
		}

		@media screen and (min-width: $lg) {
			display: flex;
			flex-direction: row;
			width: fit-content;

			& > * + * {
				margin-top: 0;
				margin-left: 50px;
			}
		}
	}

	&__slide {
		@media screen and (min-width: $lg) {
			flex-shrink: 0;
			max-width: 680px;
		}
	}
}
</style>
