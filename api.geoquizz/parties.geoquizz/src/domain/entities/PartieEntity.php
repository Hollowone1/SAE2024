<?php

namespace geoquizz\parties\domain\entities;

use geoquizz\parties\domain\dto\PartieDTO;
use Illuminate\Database\Eloquent\Model;

class PartieEntity extends Model
{
    public $incrementing = false;
    public $timestamps = false;

    protected $table = 'parties';
    protected $primaryKey = 'idPartie';
    protected $keyType = 'string';
    protected $fillable = [];

    public function partieToDTO()
    {
        return new PartieDTO($this->idPartie, $this->idSerie, $this->idUser, $this->token, $this->expires_at, $this->started_at, $this->ended_at , $this->score);
    }
}