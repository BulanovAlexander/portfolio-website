<script setup lang="ts">
import { storeLayout } from '~/stores/storeLayout'

const { navigation } = storeToRefs(storeLayout())
// 👇 Use Nuxt I18n's auto-imported composable
const localePath = useLocalePath()
function handleDropdownToggle(event: Event) {
	const toggle = event.target as HTMLElement
	const dropdown = toggle.closest('[data-header-dropdown]')

	if (dropdown) {
		dropdown.classList.toggle('is-active')

		if (dropdown.classList.contains('is-active')) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}
	}
}

function handleClickOutside(event: Event): void {
	const target = event.target as HTMLElement

	if (!target.matches('[data-header-dropdown-toggle]')) {
		document.querySelectorAll('[data-header-dropdown]').forEach(dropdown => {
			if (dropdown.classList.contains('is-active')) {
				dropdown.classList.remove('is-active')
				document.removeEventListener('click', handleClickOutside)
			}
		})
	}
}
</script>

<template>
	<nav class="header-navigation">
		<div class="header-navigation__container">
			<ul class="header-navigation__list">
				<template v-for="nav in navigation" :key="nav.id">
					<template v-if="!nav.to && nav.dropdownElements && nav.dropdownElements.length > 0">
						<li class="header-navigation__item header-navigation__dropdown" data-header-dropdown>
							<a
								class="header-navigation__link header-navigation__link_lg"
								href="/"
								data-header-dropdown-toggle
								@click.stop.prevent="handleDropdownToggle"
							>
								{{ nav.label }}
							</a>
							<div class="header-navigation__dropdown-container">
								<a
									v-for="elem in nav.dropdownElements"
									:key="elem.id"
									class="header-navigation__link header-navigation__link_sm"
									:href="elem.to"
									target="_blank"
									rel="nofollow noopener"
									>{{ elem.label }}</a
								>
							</div>
						</li>
					</template>
					<template v-if="nav.to">
						<li class="header-navigation__item">
							<NuxtLink class="header-navigation__link header-navigation__link_lg" :to="localePath(nav.to)">{{
								nav.label
							}}</NuxtLink>
						</li>
					</template>
				</template>
			</ul>
		</div>
	</nav>
</template>

<style lang="scss">
.header-navigation {
	@media screen and (min-width: $lg) {
		width: 100%;
		height: 100%;
	}

	&__container {
		@media screen and (min-width: $lg) {
			height: 100%;
			padding: 0;
		}
	}

	&__list {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0;
		list-style: none;

		@media screen and (min-width: $lg) {
			flex-direction: row;
			height: 100%;
		}
	}

	&__item {
		border-bottom: 4px solid var(--color-text);
		display: flex;
		flex-wrap: wrap;

		@media screen and (min-width: $lg) {
			border: 0;
		}
	}

	&__link {
		border: 0;
		outline: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		text-decoration: none;
		color: var(--color-text);
		background-color: var(--color-theme);
		transition-property: color, background-color;
		transition-duration: 100ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		@media (hover: hover) {
			&:hover,
			&:focus-visible,
			&:focus-within {
				color: var(--color-bg);
				background-color: var(--color-text);
			}
		}
	}

	&__link_lg {
		padding: 20px 16px;
		font-size: 36px;
		font-weight: 800;
		line-height: 1;

		@media screen and (min-width: $lg) {
			padding: 0 20px;
			font-size: 28px;
		}
	}

	&__link_sm {
		padding: 12px 16px;
		font-size: 22px;
		font-weight: 800;
		line-height: 1;
	}

	&__dropdown {
		position: relative;
	}

	&__dropdown-container {
		border: 4px solid var(--color-text);
		width: 100%;
		display: none;
		visibility: hidden;
		background-color: var(--color-theme);
		box-shadow: 8px 8px 0 0 var(--color-text);

		@media screen and (min-width: $lg) {
			position: absolute;
			top: 100%;
			left: 0;
			z-index: 40;
			min-width: 100%;
			width: max-content;
		}
	}

	&__dropdown.is-active &__dropdown-container {
		display: block;
		visibility: visible;
	}
}
</style>
