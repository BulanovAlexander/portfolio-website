import type { Pinia } from 'pinia'
import { storeSetup } from '~/stores/storeSetup'
import { storeLayout } from '~/stores/storeLayout'

export default defineNuxtPlugin(async nuxtApp => {
	const pinia = nuxtApp.$pinia as Pinia

	const setup = storeSetup(pinia)
	const layout = storeLayout(pinia)

	try {
		await Promise.all([setup.fetch(), layout.fetch()])
	} catch (error) {
		console.error('Ошибка при загрузке:', error)
	}
})
