export async function getAll(type_name) {
    return await (await fetch('http://127.0.0.1:8000/get/all/' + type_name, { method: 'POST' })).json();
}

export async function Add(type_name, object) {
    fetch('http://127.0.0.1:8000/add/' + type_name,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(object)
    });
}

