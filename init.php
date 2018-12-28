<?php

session_start();

$getProcessors = [];
$posttProcessors = [];
$_CON = new PDO('mysql:host=localhost;dbname=web20182_chat', 'root', '522');

function get($path, $function) {
    global $getProcessors;

    $getProcessors[$path] = $function;
}

function post($path, $function) {
    global $postProcessors;

    $postProcessors[$path] = $function;
}

function processUri() {
    global $getProcessors;
    global $postProcessors;

    $uri = $_SERVER['REQUEST_URI'];
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method == 'GET') {
        if (isset($getProcessors[$uri])) {
            $getProcessors[$uri]();
        }
    } elseif ($method = 'POST') {
        if (isset($postProcessors[$uri])) {
            $postProcessors[$uri]($_POST);
        }
    }
}

function view($view, $data = []) {
    foreach($data as $var => $val) {
        $$var = $val;
    }
    ob_start();
    include "views/{$view}.php";
    $content = ob_get_clean();
    echo $content;
}

function json($data) {
    echo json_encode($data);
}

function getConn() {
    global $_CON;
    return $_CON;
}

function login($user, $pw) {
    $stmt = pdoExec('select * from users where username = ? and password = ?', [$user, $pw]);
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch();
        $_SESSION['username'] = $row['username'];
        $_SESSION['user_id'] = $row['id'];
        return true;
    }
    return false;
}

function logout() {
    session_destroy();
}

function isLogged() {
    return isset($_SESSION['user_id']);
}

function currentUser() {
    return $_SESSION['username'];
}

function currentUserId() {
    return $_SESSION['user_id'];
}

function currentUserEmail() {
    return $_SESSION['email'];
}

function pdoExec($query, $params) {
    $stmt = getConn()->prepare($query);
    $stmt->execute($params);
    return $stmt;
}

function rowCount($query, $params = []) {
    return pdoExec($query, $params)->rowCount();
}

function fetchAll($query, $params = []) {
    return pdoExec($query, $params)->fetchAll();
}

function fetchOne($query, $params = []) {
    return pdoExec($query, $params)->fetch();
    // return pdoExec($query, $params)->fetch();
}

?>