<script setup lang="ts">
import type { Post } from '~/types/Post'

interface Props {
	posts: Post[]
}

defineProps<Props>()
const { t } = useI18n()
</script>

<template>
	<div class="post-feed">
		<div class="container">
			<div class="post-feed__wrapper">
				<template v-if="posts.length > 0">
					<PostFeedCard v-for="post in posts" :key="post.id" :post="post" />
				</template>
				<template v-else>
					<h2 class="typo-h2">{{ t('emptyPlaceholder') }}</h2>
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
