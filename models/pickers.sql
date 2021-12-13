CREATE DATABASE boosmap;

\c boosmap;

CREATE TABLE pickers (
    id SERIAL PRIMARY KEY,
    telefono INT UNIQUE,
    nombre VARCHAR(30)
);

CREATE TABLE lista (
    id SERIAL ,
    fecha TIMESTAMP default current_timestamp,
    telefono_lista INT PRIMARY KEY,
    nombre VARCHAR(30),
    estado BOOLEAN,
    FOREIGN KEY (telefono_lista) REFERENCES pickers(telefono)
);