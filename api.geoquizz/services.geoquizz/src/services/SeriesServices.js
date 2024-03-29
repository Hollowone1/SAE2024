import axios from "axios";
import knex from "knex";
import knexConfig from '../configs/db.config.js'

const directusURL = 'http://docketu.iutnc.univ-lorraine.fr:45056/graphql';

class SeriesServices {
    async getSeries() {
        const query = `
        query series {
            Series {
                id
                title
                difficulty
                description
                coordinates
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

            return response.data;
        } catch (error) {
            console.error("Erreur Axios :", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async getSerieById(id){
        const query = `
        query Series_by_id {
            Series_by_id(id: ${id}) {
                id
                title
                difficulty
                coordinates
                description
                maxzoom
                Items {
                    id
                    coordinates
                    title
                    description
                    image {
                        id
                        filename_download
                    }
                }
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

            return response.data;
        } catch (error) {
            console.error("Erreur Axios :", error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

export default SeriesServices;