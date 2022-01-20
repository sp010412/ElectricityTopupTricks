// this is our
module.exports = function (pool) {

	// list all the streets the we have on records
	async function streets() {
		try {
			const streets = await pool.query(`select * from street`);
			return streets.rows;

		} catch (err) {
			console.log(err)
		}
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
		try {
			const metersForEachStreet = await pool.query(`select id, street_number, street_id, balance from  electricity_meter where street_id = $1 order by id`, [streetId]);
			return metersForEachStreet.rows;

		} catch (err) {
			console.log(err)
		}
	}

	async function idMeters(id) {
		try {
			const metersForEachStreet = await pool.query(`select id, street_number, street_id, balance from  electricity_meter where id = $1 `, [id]);
			return metersForEachStreet.rows;
		} catch (err) {
			console.log(err)
		}
	}

	// return all the appliances
	async function appliances() {
		try {
			const usagePerAppliance = await pool.query(`select * from appliance`);
			return usagePerAppliance.rows;
		} catch (err) {
			console.log(err)
		}
	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {
		try {
			await pool.query('UPDATE electricity_meter SET balance = balance + $1 WHERE id = $2', [units, meterId]);
		} catch (err) {
			console.log(err)
		}
	}

	// return the data for a given balance/id
	async function meterData(meterId) {
		try {
			const balance = await pool.query(`select balance from electricity_meter where id = $1 `, [meterId]);
			return balance.rows;
		} catch (err) {
			console.log(err)
		}
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		try {
			await pool.query('UPDATE electricity_meter SET balance = balance - $1 WHERE id = $2', [units, meterId]);
		} catch (err) {
			console.log(err)
		}
	}

	// return lower balance 
	async function lowest() {
		try {

			const low = await pool.query(`SELECT * FROM electricity_meter  WHERE balance =(SELECT MIN(balance) FROM electricity_meter)`);
			return low.rows;
		} catch (err) {
			console.log(err)
		}
	}

	// return highest balance 
	async function highest() {
		try {

			const high = await pool.query(`SELECT * FROM electricity_meter  WHERE balance =(SELECT MAX(balance) FROM electricity_meter)`);
			return high.rows;
		} catch (err) {
			console.log(err)
		}
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity,
		idMeters,
		lowest,
		highest
	}


}