import { h } from 'vue'

export default function useDatoRender() {
	const renderBlock = (context: any) => {
		const { record } = context

		if (record.__typename === 'ImageBlockRecord') {
			return h('img', { src: record.image.url, alt: record.image.alt || ' ' })
		}

		return null
	}

	return {
		renderBlock
	}
}
