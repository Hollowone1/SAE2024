import axios from "axios";
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

    async createParty(partie){
        await this.createToken();
        await db('parties').insert({user_email: partie.user_email, serie_id: partie.serie_id, status: "Démarrage", score: 0});
    }

}

export default PartiesServices;