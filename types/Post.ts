export interface Post {
	id: string | number
	_createdAt: string
	slug: string
	title: string
	preview: {
		id: string
		url: string
		alt: string
	}
}
