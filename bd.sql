drop database if exists web20182_chat;
create database if not exists web20182_chat;

use web20182_chat;

-- DOWN
drop table if exists messages;
drop table if exists logged;
drop table if exists users;
-- ENDDOWN

-- UP
create table users(
    id          int primary key auto_increment,
    username    varchar(255),
    password    varchar(255)
);

create table logged (
    id          int primary key auto_increment,
    user_id     int,
    loggedIn    timestamp default current_timestamp,
    foreign key (user_id) references users(id)
);

create table messages(
    id          int primary key auto_increment,
    user_id     int,
    message     text,
    created_at  timestamp default current_timestamp,
    foreign key (user_id) references users(id)
);

-- ENDUP

-- drop user if exists web20182;
create user if not exists web20182 identified with mysql_native_password by 'web20182';
grant all privileges on web20182_chat.* to web20182;