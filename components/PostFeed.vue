<script setup lang="ts">
import type { Post } from '~/types/Post'

interface Props {
	posts: Post[]
}

defineProps<Props>()
</script>

<template>
	<div class="post-feed">
		<div class="container">
			<div class="post-feed__wrapper">
				<template v-if="posts.length > 0">
					<PostFeedCard v-for="post in posts" :key="post.id" :post="post" />
				</template>
				<template v-else>
					<h2 class="typo-h2">Здесь пока ничего нет</h2>
				</template>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.post-feed {
	&__wrapper {
		& > * + * {
			margin-top: 36px;
		}
	}
}
</style>
