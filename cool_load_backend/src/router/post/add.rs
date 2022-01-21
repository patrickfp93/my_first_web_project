use rocket::Route;

use crate::{model::{pack_container::PackContainer, pack_moviment::PackMoviment}, persist::{container_persist, client_persist, moviment_persist}};
use rocket::serde::json::Json;
use rusqlite::Connection;



#[post("/add/client", format = "application/json", data = "<name>")]
fn add_client(name: String) -> Json<String>{
    let name = name.replace("\"","");
    let conn = Connection::open("data.db").unwrap();
    client_persist::add(name, &conn).unwrap();
    Json::from(String::from("Ok!"))
}

#[post("/add/container", format = "application/json", data = "<pack>")]
fn add_container(pack: Json<PackContainer>){
    let conn = Connection::open("data.db").unwrap();
    let pack = pack.into_inner();
    container_persist::add(pack.client, pack.type_container, pack.status, pack.category, &conn).unwrap();
}

#[post("/add/moviment", format = "application/json", data = "<pack>")]
fn add_moviment(pack: Json<PackMoviment>){
    let conn = Connection::open("data.db").unwrap();
    let pack = pack.into_inner();    
    println!("START TIME: {:?}",pack.start_time);
    println!("END TIME: {:?}",pack.end_time);
    moviment_persist::add(pack.type_movimentation,pack.container,pack.start_time,pack.end_time, &conn).unwrap();
}

pub(crate) fn get_routers() -> Vec<Route> {
    routes![add_client,add_container,add_moviment]
}