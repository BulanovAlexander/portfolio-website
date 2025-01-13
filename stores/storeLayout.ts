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
			const response: any = await useFetch(`/api/layout/`)

			const { data, errors } = response.data.value

			if (errors)
				throw createError({
					statusCode: 500,
					statusMessage: errors.map((error: any) => error.message).join(', '),
					fatal: true
				})

			const { navigation, copyright } = data.layout

			this._navigation = navigation
			this._copyright = copyright
		}
	}
})
