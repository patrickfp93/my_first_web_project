use rusqlite::{Connection, Result, params};

use crate::model::client::Client;

pub fn add(client_name : String, conn:&Connection ) -> Result<()>{
    conn.execute(
        "INSERT INTO client (name) VALUES (?1)",
        params![client_name],
    )?;
    Ok(())
}

pub fn remove(id: usize,conn:&Connection) -> Result<()>{
    conn.execute(
        "DELETE FROM client WHERE id=?1",
        params![id],
    )?;
    Ok(())
}

pub fn edit(client: Client,conn:&Connection)-> Result<()>{
    conn.execute("UPDATE client
    SET name = ?1
    WHERE id=?2;", params![client.id,client.name])?;
    Ok(())
}

pub fn all(conn:&Connection) -> Result<Vec<Client>> {
    let mut stmt = conn.prepare("SELECT id, name FROM client")?;
    let client_iter = stmt.query_map([], |row| {
        Ok(Client {
            id: row.get(0)?,
            name: row.get(1)?
        })
    })?;

    let mut result = vec![];

    for client in client_iter{
        if let Ok(value) = client{
            result.push(value);
        }
    } 
    Ok(result)
}