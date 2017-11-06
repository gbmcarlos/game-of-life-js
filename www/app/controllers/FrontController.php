<?php
/**
 * Created by PhpStorm.
 * User: gbmcarlos
 * Date: 11/6/17
 * Time: 11:38 AM
 */

namespace app\controllers;


use Symfony\Component\HttpFoundation\Request;

class FrontController {

    private $twig;

    public function __construct(\Twig_Environment $twig) {
        $this->twig = $twig;
    }

    public function helloWorld(Request $request) {
        return $this->twig->render('index.twig');
    }

}