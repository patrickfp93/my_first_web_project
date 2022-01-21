use chrono::{DateTime, TimeZone, Utc};
use rusqlite::{params, Connection, Result};

use crate::model::{
    client::Client,
    container::{Container, ContainerCategory, ContainerStatus, TypeContainer},
    moviment::{Moviment, TypeMovimentation},
};

pub fn add(
    type_movimentation: TypeMovimentation,
    container: Container,
    start_time: Option<DateTime<Utc>>,
    end_time: Option<DateTime<Utc>>,
    conn: &Connection,
) -> Result<()> {
    let start_time = start_time.unwrap();
    let end_time = end_time.unwrap();
    let container_id = container.id;
    conn.execute(
        "INSERT INTO moviment (type,container_id,start_date_time,end_date_time)
         VALUES (?1,?2,?3,?4)",
        params![
            format!("{:?}", type_movimentation),
            container_id,
            get_string(&start_time),
            get_string(&end_time)
        ],
    )?;
    Ok(())
}

pub fn remove(ids: Vec<usize>, conn: &Connection) -> Result<()> {
    for id in ids {
        conn.execute("DELETE FROM moviment WHERE id=?1", params![id])?;
    }
    Ok(())
}

pub fn edit(moviment: Moviment, conn: &Connection) -> Result<()> {
    let id = moviment.id;
    let container_id = moviment.container.id;
    let type_container = format!("{:?}", moviment.type_movimentation);
    let start_time = get_string(&moviment.start_time.unwrap());
    let end_time = get_string(&moviment.end_time.unwrap());
    conn.execute(
        "UPDATE moviment SET type = ?2,container_id = ?3,start_date_time=?4,end_date_time=?5 WHERE id=?1;",
        params![id, type_container,container_id , start_time, end_time],
    )?;
    Ok(())
}

pub fn all(conn: &Connection) -> Result<Vec<Moviment>> {
    let mut stmt = conn.prepare(
        "SELECT m.id, m.type, m.start_date_time, m.end_date_time,l.id,l.name,
        c.id,c.type,c.status,c.category from  moviment as m inner join container as c on m.container_id = c.id
        inner join client as l on c.client_id = l.id",
    )?;
    let client_iter = stmt.query_map([], |row| {
        let container = Container {
            id: row.get(6)?,
            client: Client {
                id: row.get(4)?,
                name: row.get(5)?,
            },
            type_container: TypeContainer::from(row.get(7)?),
            status: ContainerStatus::from(row.get(8)?),
            category: ContainerCategory::from(row.get(9)?),
        };
        Ok(Moviment {
            id: row.get(0)?,
            type_movimentation: TypeMovimentation::from(row.get(1)?),
            start_time: Some(get_datetime(row.get(2)?)),
            end_time: Some(get_datetime(row.get(3)?)),
            container: container,
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

fn get_string(dt: &DateTime<Utc>) -> String {
    (&format!("{:?}", dt)[..19]).replace("T", " ")
}

fn get_datetime(date_txt: String) -> DateTime<Utc> {
    let y = (&date_txt[0..4]).parse().unwrap();
    let m = (&date_txt[5..7]).parse().unwrap();
    let d = (&date_txt[8..10]).parse().unwrap();
    let h = (&date_txt[11..13]).parse().unwrap();
    let mn = (&date_txt[14..16]).parse().unwrap();
    let s = (&date_txt[17..19]).parse().unwrap();
    Utc.ymd(y, m, d).and_hms(h, mn, s)
}

#[cfg(test)]
#[test]
fn test_conversions() {
    use chrono::TimeZone;
    let dt = Utc.ymd(2018, 1, 26).and_hms_micro(18, 30, 9, 453_829);
    let date_string = get_string(&dt);
    println!("{}", date_string);
    println!("Y:{}", &date_string[0..4]);
    println!("M:{}", &date_string[5..7]);
    println!("D:{}", &date_string[8..10]);
    println!("H:{}", &date_string[11..13]);
    println!("M:{}", &date_string[14..16]);
    println!("s:{}", &date_string[17..19]);
    println!("new Dt:{:?}", get_datetime(date_string))
}
