/**
 *
 * @param {import ("knex").Knex} knex
 * @returns
 */
exports.up = function (knex) {
	return knex.schema.createTable('Genres', (t) => {
		t.increments();
		t.string('name').notNullable();
		t.string('description');
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
	return knex.schema.dropTable('Genres');
};
