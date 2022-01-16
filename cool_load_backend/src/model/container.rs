use serde::{Deserialize, Serialize};
use rocket::data::FromData;
use super::client::Client;

#[derive(Serialize,Deserialize,Debug)]
pub struct Container{
    pub id: String,
    pub client: Client,
    pub type_container : TypeContainer,
    pub status : ContainerStatus,
    pub category : ContainerCategory 
}

#[derive(Serialize,Deserialize,Debug)]
pub enum TypeContainer{
    T20,
    T40
}


impl TypeContainer{
    pub fn from(txt : String) -> Self{
        if txt == "T20"{
            Self::T20
        }else{
            Self::T40
        } 
    }
}

#[derive(Serialize,Deserialize,Debug)]
pub enum ContainerStatus{
    Empty,
    Full
}

impl ContainerStatus{
    pub fn from(txt : String) -> Self{
        if txt == "Empty"{
            Self::Empty
        }else{
            Self::Full
        } 
    }
}

#[derive(Serialize,Deserialize,Debug)]
pub enum ContainerCategory{
    Importation,
    Exportation
}
impl ContainerCategory{
    pub fn from(txt : String) -> Self{
        if txt == "Importation"{
            Self::Importation
        }else{
            Self::Exportation
        } 
    }
}
