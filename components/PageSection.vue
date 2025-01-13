<script setup lang="ts">
interface Props {
	pattern?: boolean
	small?: boolean
}

defineProps<Props>()
</script>

<template>
	<section class="section" :class="{ pattern: pattern, small: small }">
		<PageSectionHeader v-if="$slots.header" />

		<slot />
	</section>
</template>

<style lang="scss" scoped>
.section {
	border-bottom: 4px solid var(--color-text);
	padding: 60px 0;

	@media screen and (min-width: $md) {
		padding: 80px 0;
	}

	@media screen and (min-width: $lg) {
		padding: 120px 0;
	}

	&.pattern {
		background-image: url('~/assets/images/pattern-grey.svg');
		background-position: 0 0;
		background-size: 6px;
	}

	&.small {
		@media screen and (min-width: $md) {
			padding: 60px 0;
		}

		@media screen and (min-width: $lg) {
			padding: 60px 0;
		}
	}
}
</style>
