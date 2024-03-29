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

    async getSerieByID(id){
        try {
            return await this.#_service.getSerieById(id);
        } catch (error) {
            //next(500);
            throw error;
        }
    }

    async getSerieRouteByID(req, res, next){
        try {
            const id = req.params.id;
            const serie = await this.getSerieByID(id);
            res.json(serie);
        } catch (error) {
            next(500);
        }
    }
}