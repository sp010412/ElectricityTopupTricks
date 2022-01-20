// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {

		const metersForEachStreet = await pool.query(`select street_number, street_id, balance from  electricity_meter where street_id = $1 `, [streetId]);
		return metersForEachStreet.rows;
	}

	// return all the appliances
	async function appliances() {
		const  usagePerAppliance= await pool.query(`select * from appliance`);
		return usagePerAppliance.rows;
	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {
		const topUp = await pool.query(`select street_number from electricity_meter`);

		await pool.query('UPDATE fruits SET qty = qty + $1 WHERE fruit_type = $2', [perFruit, type]);
	}
	
	// return the data for a given balance
	function meterData(meterId) {
	
	}

	// decrease the meter balance for the meterId supplied
	function useElectricity(meterId, units) {
	
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity
	}


}