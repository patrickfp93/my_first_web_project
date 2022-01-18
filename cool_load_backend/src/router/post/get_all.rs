use rocket::Route;

use crate::{model::{container::Container, client::Client}, persist::{container_persist, client_persist}};
use rocket::serde::json::Json;
use rusqlite::Connection;


#[post("/get/all/container")]
fn containers() -> Json<Vec<Container>> {
    let conn = Connection::open("data.db").unwrap();
    let result = container_persist::all(&conn).unwrap();
    Json::from(result)
}

#[post("/get/all/client")]
fn clients() -> Json<Vec<Client>>{
    let conn = Connection::open("data.db").unwrap();
    let result = client_persist::all(&conn).unwrap();
    Json::from(result)
}

pub(crate) fn get_routers() -> Vec<Route> {
    routes![containers,clients]
}