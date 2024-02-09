import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

import SeriesServices from "../services/SeriesServices.js";
import SeriesAction from "../actions/seriesAction.js";

const seriesService = new SeriesServices();
const seriesAction = new SeriesAction(seriesService);

class PartiesServices {
    async createToken() {
       let token = crypto.randomUUID().toString();
       await db('parties').update({token: token});
    }

    async updatePartyStatus(partyId, nouvelEtat){
        await db('parties').where('id', '=', partyId).update({status: nouvelEtat});
    }

    async getRandomItems(serie_id){
        const serieData = await seriesAction.getSerieByID(serie_id);

        // Logique pour récupérer 10 items aléatoires de la série
        // Remplacez cette logique par votre propre code pour extraire les items de la série
        return randomItems;
    }

    async createParty(serie_id, user_email){
        const token = await this.createToken();

        const randomItems = await this.getRandomItems(serie_id);

        const insertedPartie = await db('parties').insert({
            user_email: user_email,
            serie_id: serie_id,
            status: "CREATED",
            score: 0,
            token: token
        });

        const createdPartie = await db('parties').where('id', insertedPartie[0]).first();
        createdPartie.items = randomItems;

        return createdPartie;
    }

}

export default PartiesServices;