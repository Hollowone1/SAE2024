import express from 'express';
import SeriesServices from "../services/SeriesServices.js";
import SeriesAction from "../actions/seriesAction.js";

import PartiesServices from "../services/PartiesServices.js";
import PartiesAction from "../actions/PartiesAction.js";

const router = express.Router();

const seriesService = new SeriesServices();
const seriesAction = new SeriesAction(seriesService);

const partyServices = new PartiesServices();
const partyAction = new PartiesAction(partyServices);

//récupère la liste des série disponible -> choix de la série à la creation de la partie
router
    .route("/series")
    .get(seriesAction.listerSeries.bind(seriesAction))
    .all((req, res, next) => next(405));

//récupère une série grâce à son id en paramètre -> création de la partie
router
    .route("/serie/:id")
    .get(seriesAction.getSerieByID.bind(seriesAction))
    .all((req, res, next) => next(405));

//post pour créer la partie -> penser à fournir la série nécéssaire pour la création
//réponse du post contient les data de la partie(token + liste de 10 items)
router
    .route("/party")
    .post(partyAction.createParty.bind(partyAction))
    .all((req, res, next) => next(405));

//patch pour changer le statue de la partie ->Creer ->En cours ->Fini
router
    .route("/party")
    .patch(partyAction.updatePartyStatus.bind(partyAction))
    .all((req, res, next) => next(405));

export default router;