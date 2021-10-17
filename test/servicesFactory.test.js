/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');
const ServicesFactory = require('../servicesFactory');
const pg = require('pg');

const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb_test';
const pool = new Pool({
	connectionString,
	ssl: {
		rejectUnauthorized: false
	}
});
describe('Waiter App functions Test\'s', function () {
	var counter = 1;
	beforeEach(async function () {

		console.log(`******** test No ${counter++} ***********`);
		try {
		await pool.query('delete from waiters');
		} catch (error) {
			console.log(`at before each error function : ${error}`);
		}


	});




	it('Should store a name in the database assign it using addDays function and retrieve it using getSpecific function', async () => {
		let serve = ServicesFactory(pool);
		await serve.addDays('vuyani', 'monday');


		let expected = await serve.getSpecificDay('monday')
		let actual = [{ name: "vuyani" }]

		assert.deepEqual(expected, actual)
	})
	it(`Should return all the names of the people who are working on friday who which in this case are themba and soli`, async () => {
		let serve = ServicesFactory(pool);
		await serve.addDays('themba', 'friday')
		await serve.addDays('soli', 'friday')
		await serve.addDays('sally', 'tuesday')
		await serve.addDays('sili', 'monday')

		let actual = await serve.getSpecificDay('friday');
		let expected = [{ name: "themba" }, { name: "soli" }]

		assert.deepEqual(actual, expected)
	})

	it(`Should add sally and sili for tuesday and delete sili from tuesday and return only sally`, async () => {
		let serve = ServicesFactory(pool);

		await serve.addDays('sally', 'tuesday');
		await serve.addDays('sili', 'tuesday');

		await serve.deleteDays('sili');

		let actual = await serve.getSpecificDay('tuesday')
		let expected = [{ name: "sally" }]

		assert.deepEqual(actual, expected)


	});
	
	it(`Should add five entries to the database and delete all entries and return the table with no names`, async () => {
		let serve = ServicesFactory(pool);
		await serve.addDays('themba', 'friday')
		await serve.addDays('soli', 'friday')
		await serve.addDays('sally', 'tuesday')
		await serve.addDays('sili', 'monday')
		
		await serve.deleteAll()
		let actual = []
		let expected = []
		
		assert.deepEqual(actual, expected)
	})
	
	it(`A function that takes in a name and an array of days and inserts the name with the array into the data base`, async () => {
		let serve = ServicesFactory(pool);
		let ourArr = ['monday','tuesday']
		await serve.addDays_vI('sue',ourArr)
		await serve.addDays_vI('molly',ourArr)
		
		let actual = await serve.getAllFromAday('tuesday','name');
		let expected = ['sue','molly']
		assert.deepEqual(actual, expected)
	})


	after(function () {
		pool.end();
	});


});