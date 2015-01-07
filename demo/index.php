<?php

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application(['debug' => true]);

is_dir(__DIR__.'/files') or
	die('You need to create "files" directory under "demo" directory contains files yout want to browse');

$app['finder'] = new Drafterbit\Finder(__DIR__.'/files');

$app->get('/', function () use ($app) {
	return file_get_contents('template.php');
});

$app->get('/data', function () use ($app) {

	$data = array();
	$path = $app['request']->get('path');
	switch ($app['request']->get('op')) {
		
		case 'ls':
			$data = $app['finder']->ls($path);
			break;
		
		default:
			# code...
			break;
	}

	return $app->json($data);
});

$app->run();