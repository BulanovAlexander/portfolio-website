<script setup lang="ts">
import { view } from '~/constants.js'
import { storeMenu } from '~/stores/storeMenu'

const MENU_NAME = 'header-menu'

const { open, close } = storeMenu()
const { opened } = storeToRefs(storeMenu())
const { scrollLock, scrollUnLock } = useLock()

const isActive = computed(() => opened.value === MENU_NAME)

function handleMenuClick(event: Event) {
	const target = event.target as HTMLElement

	if (target && target.closest('a')) {
		closeMenu()
	}
}

function handleDocumentResize(): void {
	if (window.innerWidth >= view.lg && isActive.value === true) {
		closeMenu()
	}
}

function handleClickOutside(event: Event): void {
	const target = event.target as HTMLElement

	if (!target.closest('[data-menu-toggle]') && !target.closest('data-menu-content') && isActive.value) {
		closeMenu()
	}
}

function handleEscPress(event: KeyboardEvent): void {
	if (event.key === 'Escape' || event.key === 'Esc') {
		closeMenu()
	}
}

function closeMenu(): void {
	close()

	document.removeEventListener('keydown', handleEscPress)
	document.removeEventListener('resize', handleDocumentResize)
	document.removeEventListener('click', handleClickOutside)

	scrollUnLock()
}

function openMenu(): void {
	open(MENU_NAME)

	document.addEventListener('keydown', handleEscPress)
	document.addEventListener('resize', handleDocumentResize)
	document.addEventListener('click', handleClickOutside)

	scrollLock()
}

function handleMenuToggle(event: Event): void {
	if (isActive.value === true) {
		closeMenu()
	} else {
		openMenu()
	}
}
</script>

<template>
	<div class="header-menu" :class="{ 'is-active': isActive }">
		<button
			class="header-menu__toggle cursor-pointer"
			type="button"
			data-menu-toggle
			aria-label="Показать/скрыть меню"
			@click="handleMenuToggle"
		>
			<NuxtIcon class="header-menu__toggle-icon" name="burger" filled />
		</button>

		<div class="header-menu__container">
			<div class="header-menu__body">
				<div class="header-menu__content" data-menu-content @click="handleMenuClick">
					<AppHeaderNavigation />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.header-menu {
	height: 100%;

	@media screen and (min-width: $lg) {
		height: 68px;
	}

	&__toggle {
		border: 0;
		outline: none;
		display: flex;
		justify-self: center;
		align-items: center;
		height: 56px;
		padding: 0 20px;
		background-color: transparent;
		transition-property: color, background-color;
		transition-duration: 100ms;
		transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

		@media (hover: hover) {
			&:hover,
			&:focus-visible {
				color: var(--color-bg);
				background-color: var(--color-text);
			}
		}

		@media screen and (min-width: $lg) {
			display: none;
		}

		&:disabled {
			pointer-events: none;
		}
	}

	&__toggle-icon.nuxt-icon {
		display: flex;
		width: 40px;
		height: 40px;

		& > * {
			margin: 0;
			width: 100%;
			height: 100%;
		}
	}

	&__container {
		position: fixed;
		top: 68px;
		left: 100%;
		z-index: 40;
		width: 100%;
		height: calc(100svh - 68px);
		padding: 0 8px;
		visibility: hidden;
		overflow: hidden;
		transition: all 0s linear 400ms;

		@media screen and (min-width: $md) {
			padding: 0 12px;
		}

		@media screen and (min-width: $lg) {
			position: static;
			display: flex;
			height: 100%;
			padding: 0;
			visibility: visible;
			overflow: visible;
			transition: none;
		}
	}

	&__body {
		position: relative;
		margin: 4px 0 0;
		top: -100%;
		z-index: 40;
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		overflow: hidden;
		overflow-y: auto;
		transition: top 400ms linear 0s;
		overscroll-behavior: none;

		@media screen and (min-width: $lg) {
			position: static;
			margin: 0;
			padding: 0;
			transition: none;
			overflow: visible;
		}
	}

	&__content {
		@media screen and (min-width: $lg) {
			height: 100%;
		}
	}

	.is-active &__toggle {
		color: var(--color-bg);
		background-color: var(--color-text);
	}

	&.is-active &__container {
		left: 0;
		visibility: visible;
		transition: all 0s linear 0s;
	}

	&.is-active &__body {
		top: 0;
		transition: top 500ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
	}
}
</style>
