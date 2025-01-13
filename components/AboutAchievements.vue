<script setup lang="ts">
import type { Media } from '~/types/Media'
import { view } from '~/constants.js'

interface Props {
	content: {
		title: string
		gallery: Media[]
	}
}

const props = defineProps<Props>()
const { title, gallery } = props.content

const { $gsap, $ScrollTrigger } = useNuxtApp()

function initHorizontalScroll() {
	destroyHorizontalScroll()

	const slides = $gsap.utils.toArray('.scroll-slide')

	const tween = $gsap.to(slides, {
		xPercent: -100 * (slides.length - 1),
		ease: 'none'
	})

	$ScrollTrigger.create({
		id: 'tween01',
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
	$ScrollTrigger.getById('tween01')?.kill()
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
	<PageSection class="about-achievements">
		<div class="about-achievements__container scroll-trigger">
			<PageSectionHeader class="about-achievements__header">
				<h2 class="typo-h2">{{ title }}</h2>
			</PageSectionHeader>

			<div class="container">
				<div class="about-achievements__wrapper">
					<div v-for="media in gallery" :key="media.id" class="about-achievements__slide scroll-slide">
						<AboutAchievementsCard :content="media" class="about-achievements__achievement" />
					</div>
				</div>
			</div>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.about-achievements {
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
			max-width: 420px;
		}
	}
}
</style>
