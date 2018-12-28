<?php

include 'init.php';
include 'functions.php';
include 'routes.php';

$uri = $_SERVER['REQUEST_URI'];

if (preg_match('/\.(?:png|jpg|jpeg|gif|js|css)$/', $uri)) {
    if (file_exists("assets/{$uri}")) {
        if (preg_match('/\.(?:css)$/', $uri)) {
            header('Content-type: text/css');
        }
        echo file_get_contents("assets/{$uri}");
        return;
    }
    return false;    // serve the requested resource as-is.
} else {
    processUri();
}

?>