import express from 'express';
import SeriesService from "../services/SeriesService.js";
import SeriesAction from "../actions/seriesAction.js";

import PartyService from "../services/PartyService.js";
import PartyAction from "../actions/PartyAction.js";

const router = express.Router();

const seriesService = new SeriesService();
const seriesAction = new SeriesAction(seriesService);

const partyService = new PartyService();
const partyAction = new PartyAction(partyService);

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