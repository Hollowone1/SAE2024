import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

import SeriesServices from "../services/SeriesServices.js";
import SeriesAction from "../actions/seriesAction.js";

class PartiesServices {
    async updatePartyStatus(partyId, nouvelEtat){
        await db('parties').where('id', '=', partyId).update({status: nouvelEtat});
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async getRandomItems(serie_id){
        const seriesActionInstance = new SeriesAction(new SeriesServices());

        try {
            const serieData = await seriesActionInstance.getSerieByID(serie_id);

            console.log(serieData)

            const itemsArray = serieData.data.Series_by_id.Items;

            console.log(itemsArray);

            const shuffledArray = this.shuffleArray([...itemsArray]);

            const randomItems = shuffledArray.slice(0, 10);
            console.log(randomItems);

            return randomItems;
        } catch (error) {
            console.log(error);
        }
    }

    async createParty(serie_id, user_email){
        let token = crypto.randomUUID().toString();

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