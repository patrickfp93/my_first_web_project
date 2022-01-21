export async function getAll(type_name) {
    return await fetch('http://127.0.0.1:8000/get/all/' + type_name, { method: 'POST' });
}

export async function Add(type_name, object) {
    return fetch('http://127.0.0.1:8000/add/' + type_name, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });
}

export async function Edit(type_name, object) {
    return fetch('http://127.0.0.1:8000/edit/' + type_name, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });
}

export async function Remove(type_name, id) {
    return fetch('http://127.0.0.1:8000/remove/' + type_name, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    });
}