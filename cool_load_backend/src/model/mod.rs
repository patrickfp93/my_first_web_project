pub mod client;
pub mod container;
pub mod moviment;
pub mod pack_container;
pub mod pack_moviment;

use rocket::data::FromData;
use serde::{Serialize, Deserialize};

#[derive(Serialize,Deserialize)]
pub struct Message<T: FromData<'static>>{
    title: String,
    description: String,
    model: Option<T>
}