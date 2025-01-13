<script setup lang="ts">
import * as Yup from 'yup'

const emits = defineEmits<{
	(e: 'submit-success'): void
	(e: 'submit-failure', error: any): void
}>()

const formRef = ref<any>(undefined)
const pending = ref<boolean>(false)

const formState = reactive({
	name: undefined,
	email: undefined,
	message: undefined
})

const schema = Yup.object().shape({
	name: Yup.string().trim().required('Обязательное поле'),
	email: Yup.string().trim().email('Некорректный email').required('Обязательное поле'),
	message: Yup.string().trim().required('Обязательное поле')
})

async function handleSubmit(values: any, actions: any) {
	try {
		await $fetch(`/api/callback/`, {
			method: 'POST',
			body: {
				...values
			}
		})

		actions.resetForm()
		emits('submit-success')
	} catch (error: any) {
		emits('submit-failure', error)
	}
}
</script>

<template>
	<Form ref="formRef" class="feedback-contact-form" :validation-schema="schema" @submit="handleSubmit">
		<div class="feedback-contact-form__wrapper">
			<Field v-slot="{ field, meta, errorMessage }" v-model="formState.name" name="name">
				<div class="feedback-contact-form__form-group form-group" :class="{ disabled: pending }">
					<label class="form-label" for="name">Ваше имя</label>
					<input id="name" v-bind="field" class="form-input" type="text" placeholder="ФИО" :disabled="pending" />

					<div v-if="meta.validated && !meta.valid" class="form-help-message form-help-message_error">
						{{ errorMessage }}
					</div>
				</div>
			</Field>

			<Field v-slot="{ field, meta, errorMessage }" v-model="formState.email" name="email">
				<div class="feedback-contact-form__form-group form-group" :class="{ disabled: pending }">
					<label class="form-label" for="email">Ваша почта</label>
					<input
						id="email"
						v-bind="field"
						class="form-input"
						type="email"
						placeholder="example@mail.com"
						:disabled="pending"
					/>

					<div v-if="meta.validated && !meta.valid" class="form-help-message form-help-message_error">
						{{ errorMessage }}
					</div>
				</div>
			</Field>

			<Field v-slot="{ field, meta, errorMessage }" v-model="formState.message" name="message">
				<div class="feedback-contact-form__form-group form-group" :class="{ disabled: pending }">
					<label class="form-label" for="message">Сообщение</label>
					<textarea
						id="message"
						v-bind="field"
						class="form-textrea"
						name="message"
						placeholder="Ваше сообщение"
						:disabled="pending"
					></textarea>

					<div v-if="meta.validated && !meta.valid" class="form-help-message form-help-message_error">
						{{ errorMessage }}
					</div>
				</div>
			</Field>

			<div class="feedback-contact-form__form-group form-group" :class="{ disabled: pending }">
				<button class="button" type="submit" :disabled="pending">Отправить</button>
			</div>
		</div>
	</Form>
</template>

<style lang="scss" scoped>
.feedback-contact-form {
	display: block;
	width: 100%;

	&__wrapper {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 20px;

		@media screen and (min-width: $md) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	&__form-group:nth-child(n + 3) {
		@media screen and (min-width: $md) {
			grid-column: span 2 / span 2;
		}
	}
}
</style>
