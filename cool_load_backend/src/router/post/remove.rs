use rocket::Route;

use crate::{persist::{client_persist, container_persist}};
use rocket::serde::json::Json;
use rusqlite::Connection;



#[post("/remove/client", format = "application/json", data = "<id>")]
fn remove_client(id: Json<usize>) -> Json<String>{
    let conn = Connection::open("data.db").unwrap();
    client_persist::remove(id.into_inner(), &conn).unwrap();
    Json::from(String::from("Ok!"))
}

#[post("/remove/container", format = "application/json", data = "<id>")]
fn remove_container(id: Json<usize>) -> Json<String>{
    let conn = Connection::open("data.db").unwrap();
    container_persist::remove(id.into_inner(), &conn).unwrap();
    Json::from(String::from("Ok!"))
}

pub(crate) fn get_routers() -> Vec<Route> {
    routes![remove_client,remove_container]
}