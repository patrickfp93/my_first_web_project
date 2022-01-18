use serde::{Deserialize, Serialize};

use super::{client::Client, container::{TypeContainer, ContainerStatus, ContainerCategory}};

#[derive(Serialize,Deserialize)]
pub struct PackContainer{
    pub client : Client,
    pub type_container : TypeContainer,
    pub status : ContainerStatus,
    pub category: ContainerCategory
}