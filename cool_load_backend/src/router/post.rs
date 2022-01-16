use rocket::Route;
use serde::{Serialize, Deserialize};

use crate::{model::{container::{Container, TypeContainer, ContainerCategory, ContainerStatus}, client::Client}, persist::{container_persist, client_persist}};
use rocket::serde::json::Json;
use rusqlite::Connection;

#[post("/get/all/container")]
fn containers() -> Json<Vec<Container>> {
    let conn = Connection::open("data.db").unwrap();
    let result = container_persist::all(&conn).unwrap();

    Json::from(result)
}

#[post("/add/client", format = "application/json", data = "<name>")]
fn add_client(name: String) {
    let conn = Connection::open("data.db").unwrap();
    client_persist::add(name, &conn).unwrap();
}

#[post("/add/container", format = "application/json", data = "<pack>")]
fn add_container(pack: Json<PackContainer>) {
    let conn = Connection::open("data.db").unwrap();
    let pack = pack.into_inner();
    container_persist::add(pack.client, pack.type_container, pack.status, pack.category, &conn).unwrap();
}

pub(crate) fn get_routers() -> Vec<Route> {
    routes![containers,add_client,add_container]
}

#[derive(Serialize,Deserialize)]
pub struct PackContainer{
    pub client : Client,
    pub type_container : TypeContainer,
    pub status : ContainerStatus,
    pub category: ContainerCategory
}

#[cfg(test)]
#[test]
fn test_generete_code() {
    println!("{:?}",Json::from(Client{id:0,name:String::from("client")}));
    println!("{:?}",Json::from(ContainerStatus::Full));
    println!("{:?}",Json::from(Container {
        id: String::from("ASDF4125789"),
        client: Client{ id: 0, name: String::from("shuazarny")},
        type_container: TypeContainer::T40,
        status: ContainerStatus::Full,
        category: ContainerCategory::Exportation,
    }))
}
