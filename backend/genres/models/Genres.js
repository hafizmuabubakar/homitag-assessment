const { Model } = require('objection');

class Genres extends Model {
	static get tableName() {
		return 'Genres';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name', 'description'],

			properties: {
				id: { type: 'integer' },
				name: { type: 'string' },
				description: { type: 'string' },
				created_at: { type: 'date-time' },
				updated_at: { type: 'date-time' },
			},
		};
	}

	$beforeInsert() {
		this.created_at = new Date().toISOString();
	}

	$beforeUpdate() {
		this.updated_at = new Date().toISOString();
	}
}

module.exports = Genres;
