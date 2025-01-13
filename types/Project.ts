export interface Project {
	id: string | number
	_createdAt: string
	slug: string
	title: string
	description: any
	categories: {
		id: string | number
		label: string
		value: string
	}[]
	preview: {
		id: string
		url: string
		alt: string
	}
}
