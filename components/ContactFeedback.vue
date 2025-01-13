<script setup lang="ts">
const { openSuccessModal, openFailureModal } = useFinalModal()

function handleSubmitFailure(error: any): void {
	openFailureModal(error)
}

function handleSubmitSuccess(): void {
	openSuccessModal()
}
</script>

<template>
	<PageSection class="feedback-contact" pattern>
		<div class="container">
			<WindowPanel>
				<template #header>
					<WindowPanelHeader title="contact.html" />
				</template>

				<template #default>
					<!-- <h2 class="feedback-contact__title typo-h1">Say Hi</h2> -->
					<h2 class="feedback-contact__title typo-h2">Напишите мне!</h2>
					<p class="feedback-contact__text typo-p2">
						Оставьте сообщение, и я постараюсь ответить в ближайшее время. Я всегда на связи и готов обсудить
						интересующие вас вопросы.
					</p>

					<ContactFeedbackForm @submit-success="handleSubmitSuccess" @submit-failure="handleSubmitFailure" />
				</template>
			</WindowPanel>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.feedback-contact {
	&__title {
		margin: 0 0 10px;
	}

	&__text {
		margin: 0 0 24px;
	}
}
</style>
