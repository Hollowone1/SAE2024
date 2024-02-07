import axios from "axios";
import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

const directusURL = 'http://directus:8055/graphql';

class SeriesService {
    async getSeries() {
        const query = `
        query series {
            series {
                title
                difficulty
                description
                coodinates
                maxzoom
            }
        }
    `;

        try {
            const response = await axios({
                method: "post",
                url: directusURL,
                data: {
                    query: query
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log(response.data);

            return response.data;
        } catch (error) {
            console.error("Erreur Axios :", error.response ? error.response.data : error.message);
            throw error;
        }
    }

}

export default SeriesService;