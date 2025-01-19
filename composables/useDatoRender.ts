import { h } from 'vue'
import StackCard from '~/components/StackCard.vue'

export default function useDatoRender() {
	const renderBlock = (context: any) => {
		const { record } = context

		if (record.__typename === 'ImageBlockRecord') {
			return h('img', { src: record.image.url, alt: record.image.alt || ' ' })
		}

		if (record.__typename === 'StackRecord') {
			return h(StackCard, { technologies: record.technologies })
		}

		return null
	}

	return {
		renderBlock
	}
}
