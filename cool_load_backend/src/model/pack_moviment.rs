use chrono::{DateTime, Utc};
use serde::{Serialize, Deserialize};

use super::{container::Container, moviment::TypeMovimentation};
use chrono::serde::ts_seconds_option;


#[derive(Serialize,Deserialize)]
pub struct PackMoviment{
    pub container : Container,
    pub type_movimentation : TypeMovimentation,
    #[serde(with = "ts_seconds_option")]
    pub start_time : Option<DateTime<Utc>>,
    #[serde(with = "ts_seconds_option")]
    pub end_time: Option<DateTime<Utc>>
}