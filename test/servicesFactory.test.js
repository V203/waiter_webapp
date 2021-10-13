/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');
const ServicesFactory = require('../servicesFactory');
const pg = require('pg');

const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb';
const pool = new Pool({
	connectionString
});
describe('Waiter App functions Test\'s', function () {
	var counter = 1;
	beforeEach(async function () {
		
		console.log(`******** test No ${counter++} ***********`);
		try {
			await pool.query('delete from days');
		} catch (error) {
			console.log(`at before each error function : ${error}`);
		}
			
		
	});



	it('Should store a name in any day chosen by the user',async ()=>{
		let serve = ServicesFactory(pool);
		// await pool.query(`insert into days(monday) values('vuyo')`)
		await serve.addDays("monday","vuyo");
		let expect = await serve.getSpecificDay("monday")
		let actual = "vuyo"
		console.log(expect);
		console.log(actual);
		assert.equal(expect,actual)
	})

	// it("And now we should be able to insert pat into monday",async ()=>{
		
	// 	let servicesFactory = ServicesFactory(pool);
	// 	await pool.query(`SELECT monday FROM days INSERT INTO days()  values(paty)`)
	// 	let expected = await pool.query(`select monday from days`)
	// 	let actual = await servicesFactory.getSpecificDay('monday');
		
		

	// 	assert.equal(actual,expected.rows)


	// })

	

	after(function () {
		pool.end();
	});


});