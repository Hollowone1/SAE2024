export default class seriesAction {
    #_service;

    constructor(service) {
        this.#_service = service;
    }

    async listerSeries(req, res, next) {
        try {
            const series = await this.#_service.getSeries();
            res.json(series);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({error : 'Internal Server Error' });
            next(500);
        }
    }

}