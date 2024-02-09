import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

import SeriesServices from "../services/SeriesServices.js";
import SeriesAction from "../actions/seriesAction.js";

const seriesService = new SeriesServices();
const seriesAction = new SeriesAction(seriesService);

class PartiesServices {
    async updatePartyStatus(partyId, nouvelEtat){
        await db('parties').where('id', '=', partyId).update({status: nouvelEtat});
    }

    async getRandomItems(serie_id){
        console.log(serie_id);
        try {
            const serieData = await seriesAction.getSerieByID(serie_id);
        } catch (error) {
            console.log(error);
        }
        const randomItems = null;
        // Logique pour récupérer 10 items aléatoires de la série
        // Remplacez cette logique par votre propre code pour extraire les items de la série
        return randomItems;
    }

    async createParty(serie_id, user_email){
        let token = crypto.randomUUID().toString();
        console.log("token :" + token)

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