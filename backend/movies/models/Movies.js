const { Model } = require('objection');

class Movie extends Model {
	static get tableName() {
		return 'Movies';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'name',
				'description',
				'release_date',
				'genres',
				'duration',
				'ratings',
			],

			properties: {
				id: { type: 'integer' },
				name: { type: 'string' },
				description: { type: 'string' },
				release_date: { type: 'date' },
				genres: { type: 'jsonb' },
				duration: { type: 'double' },
				ratings: { type: 'double' },
				created_at: { type: 'date-time' },
				updated_at: { type: 'date-time' },
			},
		};
	}

	$beforeInsert() {
		this.genres = JSON.stringify(this.genres);
		this.created_at = new Date().toISOString();
	}

	$beforeUpdate() {
		this.updated_at = new Date().toISOString();
	}
}

module.exports = Movie;
