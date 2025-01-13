import { defineStore } from 'pinia'

interface State {
	_setup:
		| {
				perPage: number
		  }
		| undefined
}

export const storeSetup = defineStore('setup', {
	state: (): State => ({
		_setup: undefined
	}),

	getters: {
		setup: state => state._setup
	},

	actions: {
		async fetch() {
			const response: any = await useFetch(`/api/setup/`)

			const { data, errors } = response.data.value

			if (errors)
				throw createError({
					statusCode: 500,
					statusMessage: errors.map((error: any) => error.message).join(', '),
					fatal: true
				})

			this._setup = data.setup
		}
	}
})
