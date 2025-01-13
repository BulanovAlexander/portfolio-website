<script setup lang="ts"></script>

<template>
	<div class="header-logo">
		<NuxtLink class="header-logo__link" to="/">
			<NuxtIcon class="header-logo__icon" name="logo" filled />
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.header-logo {
	&__link {
		outline: none;
		display: flex;
		justify-self: center;
		align-items: center;
		height: 56px;
		padding: 0 20px;
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
			min-height: 68px;
		}
	}

	&__icon.nuxt-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 44px;
		height: 44px;

		& > * {
			margin: 0;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
