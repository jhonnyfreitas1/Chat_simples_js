<?php

class Controller {
    public function isLogged() {
        if (isLogged()) {
            return json(['isLogged' => true, 'username' => currentUser()]);
        }
        return json(['isLogged' => false]);
    }

    public function addUser($data) {
        $username = $data['username'] ?? false;
        $password = $data['password'] ?? false;

        if ($username === false || $password === false) {
            return json(['error', true]);
        }
        $hasUser = rowCount(
            'select * from users where username = ?',
            [$username]
        ) >= 1;

        if ($hasUser) {
            return json(['user_exists' => true]);
        }

        pdoExec(
            'insert into users(username, password) values (?, ?)',
            [$username, $password]
        );

        return json(['inserted' => true]);
    }

    public function login($data) {
        $username = $data['username'] ?? false;
        $password = $data['password'] ?? false;

        if ($username === false || $password === false) {
            return json(['error' => true]);
        }

        if (login($username, $password)) {
            pdoExec('delete from logged where user_id = ?', [currentUserId()]);
            pdoExec('insert into logged (user_id) values (?)', [currentUserId()]);
            return json(['login' => true, 'username' => $username]);
        }
        return json(['login' => false]);
    }

    public function logout() {
        $id = currentUserId();
        logout();
        pdoExec('delete from logged where user_id = ?', [$id]);
    }

    public function getLoggerUsers() {
        if (!isLogged()) {
            return view('forbidden');
        }
        $users = fetchAll('select u.* from logged l join users u on u.id = l.user_id order by u.username');
        return view('users', ['users' => $users]);
    }

    public function addMessage($data) {
        $message = $data['message'] ?? false;
        $currentUserId = currentUserId() ?? false;

        if ($currentUserId === false || $message === false) {
            return json(['error' => true]);
        }
        pdoExec(
            'insert into messages(message, user_id) values (?, ?)',
            [$message, $currentUserId]
        );
        return json(['inserted' => true]);
    }

    public function getMessages() {
        if (!isLogged()) {
            return view('forbidden');
        }

        $messages = fetchAll(
            "select
                m.*, u.username
            from
                messages m
                join users u on u.id = m.user_id
            where
                m.created_at > (select loggedIn from logged where user_id = ?)
            order by
                m.created_at desc",
            [currentUserId()]
        );

        return view('messages', ['messages' => $messages]);
    }
}


?>