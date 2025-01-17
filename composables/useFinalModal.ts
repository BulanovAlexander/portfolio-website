import { useModal, useModalSlot } from 'vue-final-modal'
import { h } from 'vue'

import AppModal from '/components/AppModal.vue'

export default function useUIModal() {
	// const { closeAll } = useVfm()

	function openSuccessModal(t: (key: string) => string) {
		const { open, close } = useModal({
			component: AppModal,
			attrs: {
				title: `${t('successTitle')}`,
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
								[`${t('successSendTitle')}`]
							),
							h(
								'p',
								{
									class: 'typo-p2'
								},
								[`${t('successSendText')}`]
							),
							h(
								'button',
								{
									class: 'button',
									onClick: () => close()
								},
								[`${t('close')}`]
							)
						]
					)
				})
			}
		})

		open()
	}

	function openFailureModal(t: (key: string) => string, error: any) {
		const { open, close } = useModal({
			component: AppModal,
			attrs: {
				title: t('failureTitle'),
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
								[`${t('failureSendTitle')}`]
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
								[`${t('close')}`]
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
