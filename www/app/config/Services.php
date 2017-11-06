<?php

namespace App\config;
use Silex\Application;
use Silex\Provider\ServiceControllerServiceProvider;

/**
 * Created by PhpStorm.
 * User: gbmcarlos
 * Date: 11/6/17
 * Time: 11:28 AM
 */
class Services {

    public static function registerServices(Application $app) {

        // To register controllers as services (with DI)
        $app->register(new ServiceControllerServiceProvider());

        // Register the services and controllers here

    }

}