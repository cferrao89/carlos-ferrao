module.exports = {
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./jest.setup.js'],
	reporters: [
		'default',
		[
			'jest-html-reporters',
			{
				publicPath: './reports',
				filename: 'com.monefy.app.lite.testresults.html',
				expand: true,
			},
		],
	],
};
