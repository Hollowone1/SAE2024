export default class seriesAction {
    #_service;

    constructor(service) {
        this.#_service = service;
    }

    async listerSeries(req, res, next) {
        try {
            const series = await this.#_service.getSeries();
            res.json(series);
        } catch (error) {
            next(500);
        }
    }

    async getSerieByID(req, res, next){
        try {
            const id = req.params.id;
            const serie = await this.#_service.getSerieById(id);
            res.json(serie);
        } catch (error) {
            next(500);
        }
    }

}