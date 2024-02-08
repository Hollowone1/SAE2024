import express from 'express';
import SeriesService from "../services/SeriesService.js";
import SeriesAction from "../actions/seriesAction.js";

const router = express.Router();

const seriesService = new SeriesService();
const seriesAction = new SeriesAction(seriesService);

router
    .route("/series")
    .get(seriesAction.listerSeries.bind(seriesAction))
    .all((req, res, next) => next(405));

router
    .route("/serie/:id")
    .get(seriesAction.getSerieByID.bind(seriesAction))
    .all((req, res, next) => next(405));

export default router;