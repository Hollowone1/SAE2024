<?php

declare(strict_types=1);

use geoquizz\auth\api\app\actions\RefreshTokenAction;
use geoquizz\auth\api\app\actions\SigninAction;
use geoquizz\auth\api\app\actions\SignupAction;
use geoquizz\auth\api\app\actions\ValidateTokenAction;
use geoquizz\auth\api\domain\service\classes\AuthService;
use geoquizz\auth\api\domain\service\classes\JWTManager;
use Slim\App;

return function (App $app): void {

    $app->get('/', function ($request, $response, $args) {
        $response->getBody()->write("Welcome to the auth.geoquizz API!");
        return $response;
    });

    $app->post('/api/users/signin', SigninAction::class)
        ->setName('sign_in');

    $app->get('/api/users/validate', ValidateTokenAction::class)
        ->setName('validate_token');

    $app->post('/api/users/refresh', RefreshTokenAction::class)
        ->setName('refresh_token');

    $app->post('/api/users/signup', SignupAction::class)
        ->setName('sign_up');
};