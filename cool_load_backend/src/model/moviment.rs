use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use chrono::serde::ts_seconds_option;

use super::container::Container;

#[derive(Serialize,Deserialize,Debug)]
pub struct Moviment{
    pub id : usize,
    pub container : Container,
    pub type_movimentation : TypeMovimentation,
    #[serde(with = "ts_seconds_option")]
    pub start_time : Option<DateTime<Utc>>,
    #[serde(with = "ts_seconds_option")]
    pub end_time: Option<DateTime<Utc>>
}
#[derive(Serialize,Deserialize,Debug)]
pub enum TypeMovimentation{
    Boarding,Unloading,GateIn,Repositioning, Weighing,Scanner
}
impl TypeMovimentation{
    pub fn from(txt : String) -> Self{
        if txt == "Boarding"{
            return Self::Boarding;
        }else if txt == "Unloading"{
            return Self::Unloading;
        } if txt == "GateIn"{
            return Self::GateIn;
        } if txt == "Repositioning"{
            return Self::Repositioning;
        } if txt == "Weighing"{
            return Self::Weighing;
        } else{
            return Self::Scanner;
        } 
    }
}