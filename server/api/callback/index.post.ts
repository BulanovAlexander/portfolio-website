export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig()
	const telegramBotToken = runtimeConfig.public.telegramBotToken as string
	const telegramChatId = runtimeConfig.public.telegramChatId as string
	const body = await readBody(event)
	const { name, email, message } = body
	const text = `
	<b>От:</b> ${name}&#10;
	<b>Почта:</b> <a href="mailto:${email}">${email}</a>&#10;
	<b>Сообщение:</b>&#10;<pre>${message}</pre>
	`

	const baseUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

	const response = await $fetch(baseUrl, {
		method: 'POST',
		body: {
			chat_id: telegramChatId,
			parse_mode: 'HTML',
			text
		},
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return response
})
