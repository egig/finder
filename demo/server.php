<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

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
                'path' => make_path_relative($file->getRealpath()),
                'label' => $file->getFilename()
            );
        }
    break;

    case 'mkdir':
        $folderName = $_GET['folder-name'];
        mkdir(prepare_path($path).'/'.$folderName);
    break;

    case 'delete':
        $path = prepare_path($path);
        if (is_dir($path)) {
             $objects = array_diff(scandir($path), array('.','..'));
            foreach ($objects as $object) {
                if (filetype($path."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object);
            }
            reset($objects);
            rmdir($path);
        } else {
            unlink($path);
        }
    break;

    case 'rename':
        $path = prepare_path($path);
        $tmp = explode(DIRECTORY_SEPARATOR, $path);
        array_pop($tmp);
        $rel = implode(DIRECTORY_SEPARATOR, $tmp);
        $new_name = $_POST['newName'];
        $new_path = $rel.'/'.$new_name;
        rename($path, $new_path);

    break;

    case 'move':
        $path = prepare_path($path);
        $dest = $_POST['dest'];
        $explodes = explode(DIRECTORY_SEPARATOR, $path);
        $file = array_pop($explodes);
        $dest = prepare_path($dest).'/'.$file;
        rename($path, $dest);

    break;

    case 'properties':
        $path = prepare_path($path);
        $file = new SplFileInfo($path);

        $data['Name'] = $file->getFileName();
        $data['Type'] = $file->getType();
        $data['Size'] = $file->getSize() .' b';
        $data['Location'] = make_path_relative($file->getRealpath());
    break;
}

function make_path_relative($full) {
    global $root;
    $base = realpath($root);
    $full = realpath($full);
    return trim(str_replace($base, '', $full), '/');
}

function prepare_path($path) {
    global $root;
    return realpath(implode(DIRECTORY_SEPARATOR, array($root, trim($path, DIRECTORY_SEPARATOR))));
}

header('Content-type: application/json');
echo json_encode($data);