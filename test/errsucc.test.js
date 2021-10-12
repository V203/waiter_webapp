// /* eslint-disable no-undef */
// const assert = require('assert');
// const ServicesFactory = require('../servicesFactory');
// const pg = require('pg');
// const Pool = pg.Pool;
// const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb_test';
// const pool = new Pool({
// 	connectionString
// });

// // import Errsucc from "../errsucc";

// describe('Error messages test\'s', () => {
    
// 	beforeEach(async  ()=>{
// 		try {
// 			await pool.query('delete * from days');
// 		} catch (error) {
// 			console.log(`before function err ==> ${error}`);
// 		}
        
// 	});
// 	it('skeleton test', () => {
// 		let servicesFactory = ServicesFactory(pool);
// 		servicesFactory;
// 		let expected = 'actual';
// 		let actual = 'actual';
// 		assert.equal(expected, actual);

// 	});

// });