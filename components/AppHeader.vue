<script setup lang="ts"></script>

<template>
	<header class="header lock-padding">
		<div class="header__wrapper">
			<AppHeaderLogo />
			<AppHeaderMenu />
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	position: fixed;
	top: 12px;
	z-index: 50;
	border-bottom: 4px solid var(--color-text);
	width: calc(100% - 16px);
	min-height: 60px;

	@media screen and (min-width: $md) {
		width: calc(100% - 24px);
	}

	@media screen and (min-width: $lg) {
		top: 20px;
		width: calc(100% - 40px);
		min-height: 68px;
	}

	&__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		background-color: var(--color-theme);

		&::after {
			content: '';
			position: absolute;
			bottom: -4px;
			z-index: 50;
			display: block;
			width: 100%;
			height: 4px;
			background-color: var(--color-text);
		}

		@media screen and (min-width: $lg) {
			justify-content: flex-start;
		}
	}
}
</style>
