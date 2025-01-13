import { useModal, useModalSlot } from 'vue-final-modal'
import { h } from 'vue'

import AppModal from '~/components/AppModal.vue'

export default function useUIModal() {
	// const { closeAll } = useVfm()

	function openSuccessModal() {
		const { open, close } = useModal({
			component: AppModal,
			attrs: {
				title: 'Success',
				onClose: () => {
					close()
				}
			},
			slots: {
				default: useModalSlot({
					component: h(
						'div',
						{
							class: 'modal__body'
						},
						[
							h(
								'h3',
								{
									class: 'typo-h3'
								},
								[`Спасибо, что написали!`]
							),
							h(
								'p',
								{
									class: 'typo-p2'
								},
								[`Ответ скоро появится в вашем почтовом ящике.`]
							),
							h(
								'button',
								{
									class: 'button',
									onClick: () => close()
								},
								[`Закрыть`]
							)
						]
					)
				})
			}
		})

		open()
	}

	function openFailureModal(error: any) {
		const { open, close } = useModal({
			component: AppModal,
			attrs: {
				title: 'Error',
				onClose: () => {
					close()
				}
			},
			slots: {
				default: useModalSlot({
					component: h(
						'div',
						{
							class: 'modal__body'
						},
						[
							h(
								'h3',
								{
									class: 'typo-h3'
								},
								[`Error`]
							),
							h(
								'p',
								{
									class: 'typo-p2'
								},
								[`${error.message}`]
							),
							h(
								'button',
								{
									class: 'button',
									onClick: () => close()
								},
								[`close`]
							)
						]
					)
				})
			}
		})

		open()
	}

	return {
		openFailureModal,
		openSuccessModal
	}
}
