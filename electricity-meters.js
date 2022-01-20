// this is our
module.exports = function (pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {

		const metersForEachStreet = await pool.query(`select id, street_number, street_id, balance from  electricity_meter where street_id = $1 order by id`, [streetId]);
		return metersForEachStreet.rows;
	}

	async function idMeters(id) {

		const metersForEachStreet = await pool.query(`select id, street_number, street_id, balance from  electricity_meter where id = $1 `, [id]);
		return metersForEachStreet.rows;
	}

	// return all the appliances
	async function appliances() {
		const usagePerAppliance = await pool.query(`select * from appliance`);
		return usagePerAppliance.rows;
	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {
		await pool.query('UPDATE electricity_meter SET balance = balance + $1 WHERE id = $2', [units, meterId]);
	}

	// return the data for a given balance/id
	async function meterData(meterId) {

		const balance = await pool.query(`select balance from electricity_meter where id = $1 `, [meterId]);
		return balance.rows;
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		await pool.query('UPDATE electricity_meter SET balance = balance - $1 WHERE id = $2', [units, meterId]);
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity,
		idMeters
	}


}