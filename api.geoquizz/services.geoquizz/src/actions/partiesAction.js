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

}