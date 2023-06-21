

create database planeacion;

use planeacion;

/*
    ionic g page modals/instructores

    ionic g page modals/cursos

    ionic g page modals/alumnos

    ionic g page modals/eventos
*/

create table Ubicaciones(
    id int primary key auto_increment,
    nombre varchar(60),
    direccion varchar(150)

);

INSERT INTO Ubicaciones VALUES ('','Bicentenario','Queretaro')

create table Instructores(
    id int primary key auto_increment,
    nombre varchar(60),
    direccion varchar(150)

);

create table Cursos(
    id int primary key auto_increment,
    titulo varchar(60),
    duracion time,
    precio float,
    descripcion varchar(500)

);

create table Alumnos(
    id int primary key auto_increment,
    nombre varchar(60),
    direccion varchar(150)

);


create table Eventos_Cursos(
    id int primary key auto_increment,
    fecha_inicio datetime,
    fecha_fin datetime,
    fk_instructor int,
    FOREIGN KEY(fk_instructor) REFERENCES Instructores(id),
    fk_curso int,
    FOREIGN KEY(fk_curso) REFERENCES Cursos(id),
    fk_ubicacion int,
    FOREIGN KEY(fk_ubicacion) REFERENCES Ubicaciones(id)

);