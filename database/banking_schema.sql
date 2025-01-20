CREATE TABLE customer (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    address varchar(200) NOT NULL,
    username varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL
);

CREATE TABLE account (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    owner uuid NOT NULL REFERENCES customer(id),
    name varchar(100) NOT NULL,
    balance NUMERIC(20,2) NOT NULL,
    frozen bool
);

CREATE TABLE transaction (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    message varchar(100) NOT NULL,
    amount NUMERIC(20,2) NOT NULL,
    sender uuid NOT NULL REFERENCES account(id),
    receiver uuid NOT NULL REFERENCES account(id),
    timestamp timestamptz NOT NULL
);

CREATE TABLE withdrawal (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    account uuid NOT NULL REFERENCES account(id),
    amount NUMERIC(20,2) NOT NULL,
    timestamp timestamptz NOT NULL
);

CREATE TABLE deposit (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    account uuid NOT NULL REFERENCES account(id),
    amount NUMERIC(20,2) NOT NULL,
    timestamp timestamptz NOT NULL
);