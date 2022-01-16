pub mod client_persist;
pub mod container_persist;
pub mod moviment_persist;

use rusqlite::{Connection, Result};


pub fn init_bank() -> Result<()>{
    let conn = Connection::open("data.db").unwrap();
    conn.execute(
        "create table if not exists client (
             id integer primary key,
             name text not null unique
         )",
        [],
    )?;
    conn.execute(
        "create table if not exists container (
             id text primary key UNIQUE,
             client_id integer not null references client(id),
             type TEXT CHECK(type IN ('T20', 'T40')) NOT NULL ,
             status TEXT CHECK(status IN ('Empty','Full')) NOT NULL,
             category TEXT CHECK(status IN ('Importation','Exportation'))
         )",
        [],
    )?;
    conn.execute(
        "create table if not exists moviments (
             id integer primary key,
             type TEXT CHECK(type IN ('Boarding','Unloading','GateIn','Repositioning', 'Weighing','Scanner', 'GateOut')) NOT NULL ,
             container_id integer not null references container(id),
             start_date_time datetime not null,
             end_date_time datetime not null
         )",
        [],
    )?;

    Ok(())
}