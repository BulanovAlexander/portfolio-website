import { defineStore } from 'pinia'
import type { Nav } from '~/types/Nav'

interface State {
	_navigation: Nav[] | undefined
	_copyright: string | undefined
}

export const storeLayout = defineStore('layout', {
	state: (): State => ({
		_navigation: undefined,
		_copyright: undefined
	}),

	getters: {
		navigation: state => state._navigation,
		copyright: state => state._copyright
	},

	actions: {
		async fetch() {
			const headers = useRequestHeaders(['cookie'])
			const { layout } = await $fetch('/api/layout/', { headers })

			const { navigation, copyright } = layout

			this._navigation = navigation
			this._copyright = copyright
		}
	}
})
