import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

class SeriesService {

    async getSeries() {
        return await db.select('*').from('series');
    }
}

export default SeriesService;