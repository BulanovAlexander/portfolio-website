<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

interface Props {
	title?: string
}

defineProps<Props>()

const emits = defineEmits<{
	(e: 'update:modelValue', modelValue: boolean): void
	(e: 'close'): void
}>()

const { scrollLock, scrollUnLock } = useLock()

function handleBeforeOpen(): void {
	scrollLock()
}

function handleClosed(): void {
	scrollUnLock()
}
</script>

<template>
	<VueFinalModal
		class="modal final-modal"
		content-class="modal__content"
		overlay-class="modal__overlay"
		:overlay-transition="'vfm-fade'"
		data-lenis-prevent-touch
		data-lenis-prevent-wheel
		@before-open="handleBeforeOpen"
		@closed="handleClosed"
		@update:model-value="val => emits('update:modelValue', val)"
	>
		<WindowPanel>
			<template #header>
				<WindowPanelHeader :title="title" closed @close="emits('close')" />
			</template>

			<template #default>
				<slot />
			</template>
		</WindowPanel>
	</VueFinalModal>
</template>

<style lang="scss">
.modal {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px;

	&__overlay {
		background-color: rgba(0, 0, 0, 60%);
	}

	&__content {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-height: 100%;
		max-width: 100%;
		overflow: hidden auto;
		background-color: var(--color-bg);

		@media screen and (min-width: $md) {
			max-width: 600px;
		}
	}

	&__body {
		width: 100%;
	}
}
</style>
