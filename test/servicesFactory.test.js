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


describe('Waiter App functions Test\'s', async function () {
	var counter = 1;
	beforeEach(async function () {

		console.log(`******** test No ${counter++} ***********`);
		try {
		
		await pool.query('delete from shift cascade');
		await pool.query('delete from waiters cascade');

		} catch (error) {
			console.log(`at before each error function : ${error}`);
		}


	});




	it(`**addWaiter function** Should assign Jake to work monday and tuesday the ID of monday and tuesday should equal [{week_day:'monday'},{week_day:'tuesday'}]`, async () => {
		let ourArr = [1,2]
		let serve = ServicesFactory(pool);
		let waiters_name ="jake"
		await serve.addWaiter(waiters_name);
		await serve.addToWeek(waiters_name,ourArr)
		let expected = [{week_day:'monday'},{week_day:'tuesday'}]
		let actual = await serve.getShift('shift_days_id')
		assert.deepEqual(expected,actual);
		
	})


	it('**addWaiter and getWaiter function** the getWaiter where jill is parsed in as the parameter should return jill from the waiters database', async function () {
		let serve = ServicesFactory(pool);
		
		await serve.addWaiter('jill');
		let actual = await serve.getWaiter('jill');
		let expected = 'jill'		  
		assert.deepEqual(expected,actual[0]['waiters_name']);

	})
	it("**addToweek function** Should take in a parameter of the waiters name and an array of days and insert all waiters name along side the days id in shift table",async function(){
		const serve = ServicesFactory(pool);
		let waiterA = 'Sam';
		let waiterB = 'Jake';
		let waiterC = 'Jon';

		await serve.addWaiter('Sam')
		await serve.addWaiter('Jake')
		await serve.addWaiter('Jon')

		let samWeek = [3,4,7];
		let jakeWeek = [5,6,7];
		let jonWeek = [1,6,7];

		await serve.addToWeek(waiterA,samWeek);
		await serve.addToWeek(waiterB,jakeWeek);
		await serve.addToWeek(waiterC, jonWeek);

		let actual = await serve.getAllFromSpecificDay(7);
		let expected = [{ shift_days_id: 7},{shift_days_id: 7},{shift_days_id:7}]		  

		assert.deepEqual(actual,expected)

	})

	it("Should return the days of the week",async function(){
		let serve = ServicesFactory(pool);
		let waiterA = 'Sam';

		await serve.addWaiter('Sam');

		let samWeek = ['3','4'];

		await serve.addToWeek(waiterA,samWeek);

		

		
		let actual = [{ week_day: 'wednesday'},{week_day: 'thursday'}]
		let expected = await serve.getSelectDays()
		assert.deepEqual(expected, actual);
	});
	
	// it("Should return all the names of the people who are working on a specific day",async function(){
	// 	let serve = ServicesFactory(pool);
	// 	let waiterA = 'Samy';
	// 	let waiterB = 'Ja-rule';
	// 	let waiterC = 'John';

	// 	await serve.addWaiter('Samy')
	// 	await serve.addWaiter('Ja-rule')
	// 	await serve.addWaiter('John')

	// 	let samyWeek = [3,4,7];
	// 	let jaWeek = [5,6,7];
	// 	let johnWeek = [1,6,7];

	// 	await serve.addToWeek(waiterA,samyWeek);
	// 	await serve.addToWeek(waiterB,jaWeek);
	// 	await serve.addToWeek(waiterC, johnWeek);

	// 	let actual = await serve.getAllFromSpecificDay_V_II(1);
	// 	let expected = '';
	// 	assert.deepEqual(actual,expected)
	// })



	after(function () {
		pool.end();
	});


});