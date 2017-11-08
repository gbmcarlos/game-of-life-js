<?php
/**
 * Created by PhpStorm.
 * User: gbmcarlos
 * Date: 11/6/17
 * Time: 11:38 AM
 */

namespace App\controllers;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class FrontController {

    private $twig;
    private $app;
    private $urlGenerator;

    public function __construct(\Twig_Environment $twig, UrlGeneratorInterface $urlGenerator, Application $app) {
        $this->twig = $twig;
        $this->urlGenerator = $urlGenerator;
        $this->app = $app;
    }

    public function index(Request $request) {

        $page = $request->query->get('page');

        if ($page) {
            return $this->forward($page, $request);
        } else {
            return $this->twig->render('index.twig');
        }

    }

    public function randomPattern(Request $request) {
        return $this->twig->render('random-pattern.twig');
    }

    public function gosperGliderGun(Request $request) {
        return $this->twig->render('gosper-glider-gun.twig');
    }

    public function createPattern(Request $request) {
        return $this->twig->render('create-pattern.twig');
    }

    public function tests(Request $request) {
        return $this->twig->render('tests.twig');
    }

    protected function forward($page, Request $request) {

        try {
            $url = $this->urlGenerator->generate($page, array(), UrlGeneratorInterface::ABSOLUTE_URL);
            $url = '/' . str_replace($request->getUriForPath('/'), '', $url);
        } catch (RouteNotFoundException $e) {
            throw $e;
        }

        $request = Request::create($url);

        $response = $this->app->handle($request, HttpKernelInterface::SUB_REQUEST, false);

        return $response;

    }

}