use rocket::Route;

mod add;

mod remove;

mod get_all;

pub(crate) fn get_routers() -> Vec<Route> {
    let mut result = vec![];
    for r in add::get_routers(){
        result.push(r);
    }
    for r in remove::get_routers(){
        result.push(r);
    }
    for r in get_all::get_routers(){
        result.push(r);
    }
    result
}

#[cfg(test)]
#[test]
fn test_generete_code() {
    use rocket::serde::json::Json;
    use crate::model::{client::Client, container::{ContainerStatus, Container, TypeContainer, ContainerCategory}};
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