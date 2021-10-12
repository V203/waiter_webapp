/* eslint-disable no-undef */
const assert = require('assert');
const ServicesFactory = require('../servicesFactory');
const pg = require('pg');
const { S } = require('xmlchars/xml/1.0/ed5');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb_test';
const pool = new Pool({
	connectionString
});
describe('Waiter App functions Test\'s', function () {
	var counter = 1;
	beforeEach(async function () {
		
		console.log(`******** test No ${counter++} ***********`);
		
			await pool.query('delete from days');
		
	});

	it('It should insert sam into monday and check if sam is under column monday.', async () => {
		try {
			await pool.query(`insert into days(monday) values('sam')`);
			const result = await pool.query(`SELECT monday FROM days`);
			let expected = [{monday:"sam"}];
			let actual = result.rows
			// console.log(`actual :==: {${actual}} | expected :==: ${expected}`);
			assert.deepEqual(actual, expected)

		} catch (error) {
			console.log(`${error}`)

		}
		

	})

	it('Should store a name in any day chosen by the user',async ()=>{
		let servicesFactory = ServicesFactory(pool)
		await servicesFactory.setUserName('Pat');
		let actual = await  servicesFactory.getUserName()
		let expected = 'Pat'
		assert.equal(actual,expected)
	})

	it("And now we should be able to insert pat into monday",async ()=>{
		
		let servicesFactory = ServicesFactory(pool);
		await pool.query(`SELECT monday FROM days INSERT INTO days()  values(paty)`)
		let expected = await pool.query(`select monday from days`)
		let actual = await servicesFactory.getSpecificDay('monday');
		
		

		assert.equal(actual,expected.rows)


	})

	

	after(function () {
		pool.end();
	});


});