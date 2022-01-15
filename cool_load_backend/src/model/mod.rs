pub mod client;
pub mod container;
use rocket::data::FromData;
use serde::{Serialize, Deserialize};

#[derive(Serialize,Deserialize)]
pub struct Message<T: FromData<'static>>{
    title: String,
    description: String,
    model: Option<T>
}