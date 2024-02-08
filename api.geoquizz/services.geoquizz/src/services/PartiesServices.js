import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

class PartiesServices {
    async createToken() {
       let token = crypto.randomUUID().toString();
       await db('parties').update({token: token});
    }

    async updatePartyStatus(partyId, nouvelEtat){
        await db('parties').where('id', '=', partyId).update({status: nouvelEtat});
    }
}

export default PartiesServices;