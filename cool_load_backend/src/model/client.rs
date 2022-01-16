use serde::{Serialize, Deserialize};

#[derive(Serialize,Deserialize,Debug,PartialEq, Eq)]
pub struct Client{
    pub id : usize,
    pub name : String
}