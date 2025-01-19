<script setup lang="ts">
// TODO: Компонент в разработке
const options = [
	{
		label: 'Показать по 4',
		value: 'default'
	},
	{
		label: 'Показать по 8',
		value: '8'
		// value: 'date_desc'
	},
	{
		label: 'Показать по 16',
		value: '16'
		// value: 'date_asc'
	}
]

const selected = ref(options[0])
</script>

<template>
	<div class="project-sorting">
		<div class="container">
			<div class="project-sorting__wrapper">
				<UISelect v-model="selected" :options="options" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.project-sorting {
	margin: 0 0 36px;

	&__wrapper {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
	}
}
</style>
