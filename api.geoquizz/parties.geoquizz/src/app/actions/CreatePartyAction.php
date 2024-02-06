<?php

namespace geoquizz\parties\app\actions;

use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class CreatePartyAction extends AbstractAction
{

    protected mixed $service;

    public function __construct(ContainerInterface $container)
    {
        $this->service = $container->get('parties.service');
    }

    public function __invoke(Request $request, Response $response, array $args)
    {
        $body = $request->getParsedBody();
        $idPartie = $body['idPartie'];
        $iduser = $body['iduser'];

        $partie = $this->service->createPartie($idPartie, $iduser);
        // renvoyer la partie créée ainsi que le token
        $response->getBody()->write(json_encode($partie->toArray()));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);


    }
}