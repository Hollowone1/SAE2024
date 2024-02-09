import axios from "axios";
import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

class PartiesServices {
    async createToken() {
       let token = crypto.randomUUID().toString();
       await db('parties').update({token: token});
    }

}

export default PartiesServices;