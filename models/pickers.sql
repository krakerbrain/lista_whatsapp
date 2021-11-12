CREATE DATABASE boosmap;

\c boosmap;

CREATE TABLE pickers (
    id SERIAL PRIMARY KEY,
    telefono INT,
    nombre VARCHAR(30)
);