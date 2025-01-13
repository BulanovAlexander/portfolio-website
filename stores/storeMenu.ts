import { defineStore } from 'pinia'

interface State {
	_opened: string | undefined
}

export const storeMenu = defineStore('menu', {
	state: (): State => ({
		_opened: undefined
	}),

	getters: {
		opened: state => state._opened
	},

	actions: {
		open(menuName: string) {
			this._opened = menuName
		},
		close() {
			this._opened = undefined
		}
	}
})
