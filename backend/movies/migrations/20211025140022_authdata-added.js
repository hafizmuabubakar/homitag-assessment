/**
 *
 * @param {import ("knex").Knex} knex
 * @returns
 */
exports.up = function (knex) {
	return knex.schema.createTable('Movies', (t) => {
		t.increments();
		t.string('name').notNullable();
		t.string('description');
		t.date('release_date');
		t.json('genres');
		t.double('duration');
		t.double('ratings');
		t.timestamp('created_at').defaultTo(knex.fn.now());
		t.timestamp('updated_at').defaultTo(knex.fn.now());
	});
};

/**
 *
 * @param {import ("knex").Knex} knex
 * @returns
 */
exports.down = function (knex) {
	return knex.schema.dropTable('Movies');
};
