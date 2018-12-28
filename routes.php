<?php

get('/', function() {
    view('index');
});

get('/main', function() {
    view('main');
});

get('/login', function() {
    view('login');
});

get('/user/is-logged', 'Controller::isLogged');
post('/users/add', 'Controller::addUser');
post('/users/login', 'Controller::login');
get('/users/logout', 'Controller::logout');
get('/users/list-logged', 'Controller::getLoggerUsers');
post('/messages/add', 'Controller::addMessage');
get('/messages/get', 'Controller::getMessages');


?>