export default class partiesAction {
    #_service;

    constructor(service) {
        this.#_service = service;
    }

    async createToken(req, res, next) {
        try {
            const token = await this.#_service.createToken();
            res.json("token créee avec succès");
            next();
        } catch (error) {
            console.error(error);
            next(500);
        }
    }

    async updatePartyStatus(req, res, next){
        const id = req.body.id;
        const newStatus = req.body.status;

        try {
            await this.#_service.updatePartyStatus(id, newStatus);
            res.json({ message: 'Status de la partie mis à jour avec succès.' });
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
            next(500);
        }
    }

    async createParty(req, res, next) {
        try {
            const partie = await this.#_service.createParty(req.body);
            res.json(partie);
            next();
        } catch (error) {
            console.error(error);
            next(500);
        }
    }

}