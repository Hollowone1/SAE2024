<?php
namespace geoquizz\parties\domain\service\classes;

interface IPartiesService
{
    public function createPartie($idSerie, $idJoueur);
    public function getPartie($id);
    public function getParties($idJoueur);
    public function deletePartie($id);
    public function updatePartie($id, $score);
    public function getPhoto($id);
    public function deletePhoto($id);
    public function updatePhoto($id, $url, $longitude, $latitude);
    public function getPhotosByPartie($idPartie);
}