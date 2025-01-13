module.exports = {
	extends: 'stylelint-config-standard-scss',
	plugins: ['stylelint-prettier'],
	customSyntax: 'postcss-html',
	overrides: [
		{
			files: ['**/*.vue']
		}
	],
	rules: {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['deep', 'slotted', 'global']
			}
		],
		'prettier/prettier': true,
		'color-hex-length': 'long',
		'color-function-notation': 'legacy',
		'font-family-name-quotes': 'always-unless-keyword'
	}
}
