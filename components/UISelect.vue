<script setup lang="ts">
interface Option {
	value: string
	label: string
}

interface Props {
	modelValue: Option
	options: Option[]
}

const props = defineProps<Props>()
const emits = defineEmits<{
	(e: 'update:modelValue', value: {}): void
}>()

const isActive = ref<boolean>(false)
const optionElementRefs = ref<(HTMLElement | null)[]>([])
const selectElementRef = ref<HTMLElement | null>(null)

const selected = computed({
	get() {
		return props.modelValue
	},
	set(newValue) {
		emits('update:modelValue', newValue)
	}
})

function handleSelect(option: Option): void {
	selected.value = option
	isActive.value = false
}

function handleDropdownToggle(event: Event): void {
	isActive.value = !isActive.value

	if (isActive.value) {
		document.addEventListener('click', handleClickOutside)

		nextTick(() => {
			if (optionElementRefs.value[0]) {
				optionElementRefs.value[0]?.focus()
			}
		})
	} else {
		document.removeEventListener('click', handleClickOutside)
	}
}

function handleClickOutside(event: Event): void {
	const target = event.target as HTMLElement

	if (selectElementRef.value && !selectElementRef.value.contains(target)) {
		if (selectElementRef.value.classList.contains('is-active')) {
			isActive.value = false
			document.removeEventListener('click', handleClickOutside)
		}
	}
}

function handleKeydown(event: KeyboardEvent): void {
	if (!isActive.value) return

	const activeIndex = optionElementRefs.value.findIndex(ref => ref === document.activeElement)
	const optionsCount = optionElementRefs.value.length

	// Проверяем, какая клавиша была нажата
	if (event.key === 'Tab') {
		event.preventDefault()

		// Определяем, в каком направлении перемещается фокус (вперед или назад)
		const isShiftPressed = event.shiftKey
		let nextIndex: number

		if (isShiftPressed) {
			// Если Shift зажат, перемещаем фокус на предыдущий элемент
			nextIndex = activeIndex === 0 ? optionsCount - 1 : activeIndex - 1
		} else {
			// Если Shift не зажат, перемещаем фокус на следующий элемент
			nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % optionsCount
		}

		optionElementRefs.value[nextIndex]?.focus()
	} else if (event.key === 'Escape') {
		// Закрытие выпадающего списка при нажатии Escape
		isActive.value = false
	}
}
</script>

<template>
	<div
		ref="selectElementRef"
		class="ui-select"
		:class="{ 'is-active': isActive }"
		role="combobox"
		aria-haspopup="listbox"
		:aria-expanded="isActive ? 'true' : 'false'"
		@keydown="handleKeydown"
	>
		<button class="ui-select__selected" type="button" aria-haspopup="listbox" @click="handleDropdownToggle">
			<span class="ui-select__label">{{ selected.label }}</span>
			<NuxtIcon class="ui-select__arrow-icon" name="arrow-down" filled />
		</button>
		<div class="ui-select__container">
			<div class="ui-select__options" role="listbox">
				<button
					v-for="(option, index) in options"
					:key="index"
					ref="optionElementRefs"
					class="ui-select__option"
					:value="option.value"
					type="button"
					role="option"
					:aria-selected="option.value === selected.value ? 'true' : 'false'"
					@click="handleSelect(option)"
				>
					{{ option.label }}
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins.scss' as *;

.ui-select {
	position: relative;
	max-width: 224px;
	width: 100%;

	&__selected {
		position: relative;
		appearance: none;
		outline: none;
		border: 4px solid var(--color-text);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 12px 48px 12px 18px;
		font-family: 'Nunito', 'Arial', 'Helvetica', sans-serif;
		font-size: 18px;
		font-weight: 800;
		line-height: 22px;
		background-color: var(--color-theme);
		text-decoration: none;
		text-align: center;
		cursor:
			url('~/assets/images/cursor-pointer@1x.png') 15 10,
			url('~/assets/images/cursor-pointer@2x.png') 15 10,
			auto;
		color: var(--color-text);
		transition-property: color, background-color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;

		@media (hover: hover) {
			&:hover,
			&:focus-visible {
				color: var(--color-bg);
				background-color: var(--color-text);
			}
		}

		&:disabled {
			opacity: 0.6;
			pointer-events: none;
			cursor: image-set(url('~/assets/images/cursor@1x.png') 1x, url('~/assets/images/cursor@2x.png') 2x), auto;
		}
	}

	&__label {
		@include line-clamp(1);
	}

	&__arrow-icon {
		position: absolute;
		top: 50%;
		right: 12px;
		transform: translateY(-50%);
		transition-property: transform;
		transition-duration: 100ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	&__arrow-icon.nuxt-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 24px;
		height: 24px;

		& > * {
			margin: 0;
			width: 100%;
			height: 100%;
		}
	}

	&__container {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 40;
		width: 100%;
		max-width: 100%;
		border: 4px solid var(--color-text);
		display: none;
		visibility: hidden;
		background-color: var(--color-theme);
		box-shadow: 8px 8px 0 0 var(--color-text);
	}

	&__options {
		display: flex;
		flex-direction: column;
	}

	&__option {
		border: 0;
		outline: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 12px 18px;
		font-size: 18px;
		font-weight: 800;
		line-height: 22px;
		line-height: 1;
		text-align: left;
		text-decoration: none;
		color: var(--color-text);
		background-color: var(--color-theme);
		transition-property: color, background-color;
		transition-duration: 100ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		cursor: image-set(url('~/assets/images/cursor-pointer@1x.png') 1x, url('~/assets/images/cursor-pointer@2x.png') 2x),
			auto;

		@media (hover: hover) {
			&:hover,
			&:focus-visible {
				color: var(--color-bg);
				background-color: var(--color-text);
			}
		}
	}

	&.is-active &__container {
		display: block;
		visibility: visible;
	}

	&.is-active &__arrow-icon {
		transform: translateY(-50%) rotateX(-180deg);
	}
}
</style>
