use rocket::{Route, serde::json::Json};
use rusqlite::Connection;

use crate::{model::{container::Container, moviment::Moviment}, persist::{container_persist, moviment_persist}};

#[post("/edit/container", format = "application/json", data = "<container>")]
fn edit_container(container: Json<Container>) -> Json<String>{
    let conn = Connection::open("data.db").unwrap();
    container_persist::edit(container.into_inner(), &conn).unwrap();
    Json::from(String::from("Ok!"))
}

#[post("/edit/moviment", format = "application/json", data = "<moviment>")]
fn edit_moviment(moviment: Json<Moviment>) -> Json<String>{
    let conn = Connection::open("data.db").unwrap();
    moviment_persist::edit(moviment.into_inner(), &conn).unwrap();
    Json::from(String::from("Ok!"))
}

pub(crate) fn get_routers() -> Vec<Route> {
    routes![edit_container,edit_moviment]
}