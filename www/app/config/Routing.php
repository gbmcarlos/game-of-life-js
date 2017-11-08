<?php
/**
 * Created by PhpStorm.
 * User: gbmcarlos
 * Date: 11/6/17
 * Time: 11:34 AM
 */

namespace App\config;

use Silex\Application;

class Routing {

    public static function registerRoutes(Application $app){

        // Register routes here
        $app->get('/', "FrontController:index")
            ->bind('front.index');
        $app->get('/index.php', "FrontController:index")
            ->bind('front.index2');
        $app->get('/random-pattern', "FrontController:randomPattern")
            ->bind('front.random-pattern');
        $app->get('/gosper-glider-gun', "FrontController:gosperGliderGun")
            ->bind('front.gosper-glider-gun');
        $app->get('/create-pattern', "FrontController:createPattern")
            ->bind('front.create-pattern');
        $app->get('/tests', "FrontController:tests")
            ->bind('front.tests');

    }

}