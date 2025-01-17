<script setup lang="ts">
import { storeLayout } from '~/stores/storeLayout'

const { copyright } = storeToRefs(storeLayout())

const copyText = computed<string>(() => `© ${new Date().getFullYear()} ${copyright.value}`)
</script>

<template>
	<footer class="footer">
		<div class="container">
			<p class="typo-p3">{{ copyText }}</p>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	padding: 20px 0 12px;

	@media screen and (min-width: $md) {
		text-align: center;
	}

	@media screen and (min-width: $lg) {
		padding: 12px 0;
		text-align: left;
	}
}
</style>
