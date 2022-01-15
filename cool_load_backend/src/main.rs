use rocket::{Request, Response, http::Header, fairing::{Fairing, Info, Kind}};

#[macro_use] extern crate rocket;

mod router;
mod model;

#[catch(404)]
fn not_found(_req: &Request<'_>) -> String {
    String::from("error/error_404")
}

#[launch]
fn rocket() -> _ {
    rocket::build().
    mount("/",router::post::get_routers()).
    mount("/", router::get::get_routers()).
    register("/", catchers![not_found]).attach(CORS())
}
 
pub struct CORS();
 
#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to requests",
            kind: Kind::Response
        }
    }
    async fn on_response<'r>(&self, _req: &'r Request<'_>, response: &mut Response<'r>){
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "GET, DELETE, HEAD, OPTIONS"));
    }
}