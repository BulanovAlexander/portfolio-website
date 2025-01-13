export default function useLock() {
	let scrollOffset: number = 0
	const scrollLock = () => {
		const documentElement: HTMLElement = document.documentElement as HTMLElement

		scrollOffset = window.scrollY
		const lockPaddingOffset: number = window.innerWidth - documentElement.offsetWidth
		documentElement.style.cssText = `
		overflow: hidden;
		padding-right: ${lockPaddingOffset}px;

    `
		const matches: NodeListOf<HTMLInputElement> = document.querySelectorAll('.lock-padding')

		if (matches.length > 0) {
			matches.forEach(elem => {
				elem.style.paddingRight = `${lockPaddingOffset}px`
			})
		}

		document.documentElement.style.scrollBehavior = 'unset'
	}

	const scrollUnLock = () => {
		const documentElement: HTMLElement = document.documentElement as HTMLElement

		documentElement.style.cssText = ''
		window.scroll({ top: scrollOffset })
		document.documentElement.style.scrollBehavior = ''

		const matches: NodeListOf<HTMLInputElement> = document.querySelectorAll('.lock-padding')
		if (matches.length > 0) {
			matches.forEach(elem => {
				elem.style.paddingRight = ''
			})
		}
	}

	return {
		scrollLock,
		scrollUnLock
	}
}
