<?php
namespace geoquizz\parties\domain\service\classes;

use geoquizz\parties\domain\entities\PartieEntity;

class PartiesService implements IPartiesService
{
    public function __construct()
    {

    }

    /**
     * @throws \Exception
     */
    public function createPartie($idSerie, $idUser)
    {
        $partie = new PartieEntity();
        $partie->idSerie = $idSerie;
        $partie->idUser = $idUser;
        $partie->token = bin2hex(random_bytes(16));
        $partie->token_expires_at = date('Y-m-d H:i:s', strtotime('+2 minutes'));
        $partie->save();
        return $partie->partieToDTO();
    }

    public function getPartie($id)
    {
        $partie = PartieEntity::find($id);
        return $partie->partieToDTO();
    }

    public function getParties($idJoueur)
    {
        // TODO
    }

    public function deletePartie($id)
    {
        // TODO
    }

    public function updatePartie($id, $score)
    {
        // TODO
    }

    public function getPhoto($id)
    {
        // TODO
    }

    public function deletePhoto($id)
    {
        // TODO
    }

    public function updatePhoto($id, $url, $longitude, $latitude)
    {
        // TODO
    }

    public function getPhotosByPartie($idPartie)
    {
        // TODO
    }
}