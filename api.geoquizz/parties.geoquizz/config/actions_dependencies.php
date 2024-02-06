<?php

use geoquizz\auth\api\domain\service\classes\AuthService;
use geoquizz\auth\api\domain\service\classes\JWTAuthService;
use geoquizz\auth\api\domain\service\classes\JWTManager;
use Psr\Container\ContainerInterface;

return [
    'parties.service' => function (ContainerInterface $c) {
        return new \geoquizz\parties\domain\service\classes\PartiesService();
    },
];
