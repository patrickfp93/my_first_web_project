#![feature(proc_macro_hygiene, decl_macro)]

use std::{path::Path, io};

use rocket::response::NamedFile;

#[macro_use] extern crate rocket; 

#[get("/")]
fn index() -> io::Result<NamedFile> {
    let page_directory_path = 
  format!("{}/../cool-load/build", env!("CARGO_MANIFEST_DIR"));
  NamedFile::open(Path::new(&page_directory_path).join("index.html"))
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}