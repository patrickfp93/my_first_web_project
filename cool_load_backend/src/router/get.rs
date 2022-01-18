use std::{path::{Path, PathBuf}};

use rocket::{Route, fs::NamedFile};


#[get("/")]
async fn index() -> Option<NamedFile> {
    let page_directory_path = 
  format!("{}/../cool-load-alfa/build", env!("CARGO_MANIFEST_DIR"));
  NamedFile::open(Path::new(&page_directory_path).join("index.html")).await.ok()
}

#[get("/<file..>")]
async fn files(file: PathBuf) -> Option<NamedFile> {
  let page_directory_path = env!("CARGO_MANIFEST_DIR");
  let page_directory_path = format!("{}/../cool-load-alfa/build", page_directory_path);
  NamedFile::open(Path::new(&page_directory_path).join(file)).await.ok()
}

pub(crate) fn get_routers() -> Vec<Route>{
    routes![index,files]
}