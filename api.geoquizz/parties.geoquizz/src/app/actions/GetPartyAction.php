<?php

namespace geoquizz\parties\app\actions;

use Exception;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class GetPartyAction extends AbstractAction
{
    protected mixed $service;

    public function __construct(ContainerInterface $container)
    {
        $this->service = $container->get('parties.service');
    }

    public function __invoke(Request $request, Response $response, array $args)
    {
        try {
            $id = $args['id'];
            $partie = $this->service->getPartie($id);
            $response->getBody()->write(json_encode($partie->toArray()));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

    }
}