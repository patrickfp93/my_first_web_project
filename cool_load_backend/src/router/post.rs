use rocket::Route;

use rocket::serde::json::Json;

use crate::model::client::Client;
use crate::model::container::{Container, ContainerCategory, ContainerStatus, TypeContainer};

#[post("/containers")]
fn containers() -> Json<Vec<Container>> {
    let result = vec![Container {
        id: String::from("EDRA168525"),
        client: Client {
            id: 0,
            name: String::from("TrotanCorp"),
        },
        type_container: TypeContainer::T20,
        status: ContainerStatus::Full,
        category: ContainerCategory::Exportation,
    },
    Container {
        id: String::from("POIH1995452"),
        client: Client {
            id: 0,
            name: String::from("TrotanCorp"),
        },
        type_container: TypeContainer::T20,
        status: ContainerStatus::Full,
        category: ContainerCategory::Exportation,
    }];
    Json(result)
}

pub(crate) fn get_routers() -> Vec<Route> {
    routes![containers]
}
