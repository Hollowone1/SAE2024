<?php

namespace geoquizz\parties\domain\dto;

class PartieDTO
{
    public string $idPartie;
    public string $idSerie;
    public string $idUser;
    public string $token;
    public string $token_expires_at;
    public string $started_at;
    public string $ended_at;
    public int $score;


    public function __construct(string $idPartie, string $idSerie, string $idUser, string $token, string $token_expires_at, string $started_at, string $ended_at, int $score)
    {
        $this->idPartie = $idPartie;
        $this->idSerie = $idSerie;
        $this->idUser = $idUser;
        $this->token = $token;
        $this->token_expires_at = $token_expires_at;
        $this->started_at = $started_at;
        $this->ended_at = $ended_at;
        $this->score = $score;
    }

    public function toArray() {
        return [
            "idPartie" => $this->idPartie,
            "idSerie" => $this->idSerie,
            "idUser" => $this->idUser,
            "token" => $this->token,
            "token_expires_at" => $this->token_expires_at,
            "started_at" => $this->started_at,
            "ended_at" => $this->ended_at,
            "score" => $this->score
        ];
    }
}