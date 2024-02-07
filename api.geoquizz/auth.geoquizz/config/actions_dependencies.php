<?php

use geoquizz\auth\api\domain\service\classes\AuthService;
use geoquizz\auth\api\domain\service\classes\JWTAuthService;
use geoquizz\auth\api\domain\service\classes\JWTManager;
use Psr\Container\ContainerInterface;

return [
    'jwtmanager.service' => function () {
        return new JWTManager();
    },
    'auth.service' => function () {
        return new AuthService();
    },
    'jwtauth.service' => function (ContainerInterface $c) {
        return new JWTAuthService($c->get('auth.service'), $c->get('jwtmanager.service'));
    },
];
