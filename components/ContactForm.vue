<script setup lang="ts">
import * as Yup from 'yup'

const { t } = useI18n()

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
	name: Yup.string().trim().required(t('requiredField')),
	email: Yup.string().trim().email(t('incorrectEmail')).required(t('requiredField')),
	message: Yup.string().trim().required(t('requiredField'))
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
	<Form ref="formRef" class="contact-form" :validation-schema="schema" @submit="handleSubmit">
		<div class="contact-form__wrapper">
			<Field v-slot="{ field, meta, errorMessage }" v-model="formState.name" name="name">
				<div class="contact-form__form-group form-group" :class="{ disabled: pending }">
					<label class="form-label" for="name">{{ t('nameField') }}</label>
					<input
						id="name"
						v-bind="field"
						class="form-input"
						type="text"
						:placeholder="t('namePlaceholder')"
						:disabled="pending"
					/>

					<div v-if="meta.validated && !meta.valid" class="form-help-message form-help-message_error">
						{{ errorMessage }}
					</div>
				</div>
			</Field>

			<Field v-slot="{ field, meta, errorMessage }" v-model="formState.email" name="email">
				<div class="contact-form__form-group form-group" :class="{ disabled: pending }">
					<label class="form-label" for="email">{{ t('emailField') }}</label>
					<input
						id="email"
						v-bind="field"
						class="form-input"
						type="email"
						:placeholder="t('emailPlaceholder')"
						:disabled="pending"
					/>

					<div v-if="meta.validated && !meta.valid" class="form-help-message form-help-message_error">
						{{ errorMessage }}
					</div>
				</div>
			</Field>

			<Field v-slot="{ field, meta, errorMessage }" v-model="formState.message" name="message">
				<div class="contact-form__form-group form-group" :class="{ disabled: pending }">
					<label class="form-label" for="message">{{ t('messageField') }}</label>
					<textarea
						id="message"
						v-bind="field"
						class="form-textrea"
						name="message"
						:placeholder="t('messagePlaceholder')"
						:disabled="pending"
					></textarea>

					<div v-if="meta.validated && !meta.valid" class="form-help-message form-help-message_error">
						{{ errorMessage }}
					</div>
				</div>
			</Field>

			<div class="contact-form__form-group form-group" :class="{ disabled: pending }">
				<button class="button" type="submit" :disabled="pending">{{ t('submit') }}</button>
			</div>
		</div>
	</Form>
</template>

<style lang="scss" scoped>
.contact-form {
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
