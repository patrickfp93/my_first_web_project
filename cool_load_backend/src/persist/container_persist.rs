use crate::model::{
    client::Client,
    container::{Container, ContainerCategory, ContainerStatus, TypeContainer},
};
use rand::prelude::*;
use rusqlite::{params, Connection, Result};

fn generate_code() -> String {
    let mut rng = thread_rng();
    let mut result = String::new();
    let model = "QWERTYUIOPASDFGHJKLÇZXCVBNM".chars();
    for _ in 0..4 {
        result += &format!("{:}", model.clone().choose(&mut rng).unwrap());
    }
    for _ in 0..7 {
        result += &format!("{:?}", rng.gen_range(1..9));
    }
    result
}

pub fn add(
    client: Client,
    type_container: TypeContainer,
    status: ContainerStatus,
    category: ContainerCategory,
    conn: &Connection,
) -> Result<()> {
    let id = generate_code();
    let client_id = client.id;
    let type_container = format!("{:?}", type_container);
    let status = format!("{:?}", status);
    let category = format!("{:?}", category);
    for _ in 0..1000 {
        let result = conn.execute(
            "INSERT INTO container (id,client_id,type,status,category)
            VALUES (?1,?2,?3,?4,?5)",
            params![id, client_id, type_container, status, category],
        );
        if let Ok(_) = result{
            break;
        } 
    }
    Ok(())
}

pub fn remove(ids: Vec<String>, conn: &Connection) -> Result<()> {
    for id in ids{
        conn.execute("DELETE FROM container WHERE id=?1", params![id])?;
    }
    Ok(())
}

pub fn edit(container: Container, conn: &Connection) -> Result<()> {
    let id = container.id;
    let client_id = container.client.id;
    let type_container = format!("{:?}", container.type_container);
    let status = format!("{:?}", container.status);
    let category = format!("{:?}", container.category);
    conn.execute(
        "UPDATE container
    SET client_id = ?2,type =?3,status =?4,category=?5
    WHERE id=?1;",
        params![id, client_id, type_container, status, category],
    )?;
    Ok(())
}

pub fn all(conn: &Connection) -> Result<Vec<Container>> {
    let mut stmt = conn.prepare("SELECT container.id,client.id,client.name,
    container.type,container.status,container.category,
    container.client_id
    FROM container INNER JOIN client ON container.client_id=client.id")?;
    let client_iter = stmt.query_map([], |row| {
        Ok(Container {
            id: row.get(0)?,
            client: Client {
                id: row.get(1)?,
                name: row.get(2)?,
            },
            type_container: TypeContainer::from(row.get(3)?),
            status: ContainerStatus::from(row.get(4)?),
            category: ContainerCategory::from(row.get(5)?),
        })
    })?;
    let mut result = vec![];
    for moviment in client_iter {
        if let Ok(value) = moviment {
            result.push(value);
        }
    }
    Ok(result)
}

#[cfg(test)]
#[test]
fn test_generete_code() {
    println!("{:?}", generate_code());
}
