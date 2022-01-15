use serde::{Serialize, Deserialize};

#[derive(Serialize,Deserialize)]
pub struct Client{
    pub id : usize,
    pub name : String
}