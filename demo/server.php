<?php

$op = $_GET['op'] or $op = $_POST['op'];
$path = $_GET['path'] or $path = $_POST['path'];
$root = __DIR__.'/files';

$data = array();

switch($op) {
	
	case 'ls':

		$files = new FilesystemIterator($root.$path);

		foreach ($files as $file) {
			$type = $file->isDir() ? 'dir' : 'file';
			$data[] = array(
				'thumbnail' => 'false',
				'base64' => 'false',
				'type' => $type,
				'path' => makePathRelative($file->getRealpath(), $root),
				'label' => $file->getFilename()
			);
		}
	break;
}

function makePathRelative($full, $base) {
	$base = realpath($base);
	$full = realpath($full);

	return trim(str_replace($base, '', $full), '/');
}

header('Content-type: application/json');
echo json_encode($data);