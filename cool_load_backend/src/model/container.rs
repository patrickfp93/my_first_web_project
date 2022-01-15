use serde::{Deserialize, Serialize};

use super::client::Client;

#[derive(Serialize,Deserialize)]
pub struct Container{
    pub id: String,
    pub client: Client,
    pub type_container : TypeContainer,
    pub status : ContainerStatus,
    pub category : ContainerCategory 
}

#[derive(Serialize,Deserialize)]
pub enum TypeContainer{
    T20,
    T40
}

#[derive(Serialize,Deserialize)]
pub enum ContainerStatus{
    Empty,
    Full
}

#[derive(Serialize,Deserialize)]
pub enum ContainerCategory{
    Importation,
    Exportation
}
