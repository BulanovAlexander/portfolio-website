<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
	<div id="app">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>

		<ClientOnly>
			<ModalsContainer />
		</ClientOnly>
	</div>
</template>
