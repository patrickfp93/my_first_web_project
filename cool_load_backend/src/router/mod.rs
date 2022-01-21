use rocket::Route;

pub mod get;
pub mod post;


pub fn all_routers() -> Vec<Route>{
    let mut reply = vec![];
    for route in get::get_routers() {
        reply.push(route);
    }
    for route in post::get_routers() {
        reply.push(route);
    } 
    reply
}