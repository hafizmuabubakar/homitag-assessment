module.exports = {

	development: {
		client: 'pg',
		connection: {
			connectionString: 'postgres://rfjwqhebnecszl:de7cd9e108da3a4d035317921fd2b6dd0cc4da2d1424c93f5ee8db012700a3ab@ec2-3-209-124-113.compute-1.amazonaws.com:5432/d7rpujhbg84p5p',
			ssl: { rejectUnauthorized: false },
		},
		migrations: {
			directory: './migrations',
		},
	},


};
