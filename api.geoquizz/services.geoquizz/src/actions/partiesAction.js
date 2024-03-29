export default class partiesAction {
    #_service;

    constructor(service) {
        this.#_service = service;
    }

    async updatePartyStatus(req, res, next){
        const id = req.body.id;
        const newStatus = req.body.status;
        const newScore = req.body.score;

        try {
            await this.#_service.updatePartyStatus(id, newStatus, newScore);
            res.json({ message: 'Status de la partie mis à jour avec succès.' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
            next(500);
        }
    }

    async getParty(req, res, next) {
        try {
            const id = req.body.id;
            const partie = await this.#_service.getParty(id);
            res.json(partie);
        } catch (error) {
            console.error(error);
            next(500);
        }
    }

    async createParty(req, res, next) {
        const user_email = req.body.user_email;
        const serie_id = req.body.serie_id;

        try {
            const partie = await this.#_service.createParty(serie_id, user_email);
            res.json({
                partie: partie,
                token: partie.token,
                items: partie.items
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            next(500);
        }
    }

}