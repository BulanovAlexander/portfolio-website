// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },

	modules: [
		'@nuxtjs/eslint-module',
		'@nuxtjs/stylelint-module',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vee-validate/nuxt',
		'nuxt-icons'
	],

	css: ['normalize.css', 'vue-final-modal/style.css', '~/assets/scss/main.scss'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					silenceDeprecations: ['legacy-js-api'],
					additionalData: `@use "@/assets/scss/general/variables.scss" as *;`
				}
			}
		}
	},

	runtimeConfig: {
		public: {
			datoCmsUrl: process.env.DATO_CMS_URL,
			datoCmsReadOnlyPublishToken: process.env.DATO_CMS_READ_ONLY_PUBLISH_TOKEN,
			telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
			telegramChatId: process.env.TELEGRAM_CHAT_ID
		}
	},

	app: {
		head: {
			link: [
				{ rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon-57x57.png' },
				{ rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon-60x60.png' },
				{ rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon-72x72.png' },
				{ rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon-76x76.png' },
				{ rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon-114x114.png' },
				{ rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon-120x120.png' },
				{ rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon-144x144.png' },
				{ rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon-152x152.png' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180x180.png' },
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
				{ rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
				{ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
				{ rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'manifest', href: '/manifest.json' }
			],
			meta: [
				{
					name: 'msapplication-TileColor',
					content: '#ffffff'
				},
				{
					name: 'msapplication-TileImage',
					content: '/favicon-144x144.png'
				},
				{
					name: 'msapplication-config',
					content: '/browserconfig.xml'
				},
				{ name: 'apple-mobile-web-app-title', content: 'My App' },
				{
					name: 'theme-color',
					content: '#ffffff'
				}
			]
		}
	},

	i18n: {
		vueI18n: './i18n.config.ts',
		strategy: 'prefix_except_default',
		locales: ['en', 'ru'],
		defaultLocale: 'ru',
		detectBrowserLanguage: {
			useCookie: true,
			cookieCrossOrigin: true,
			redirectOn: 'root'
		}
	}
})
