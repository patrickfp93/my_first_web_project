export function generate_id_container() {
    //generate letters
    let result = "";
    for (let i = 0; i < 4; i++) {
        let rnd = Math.floor(Math.random() * 26);
        result += String.fromCharCode(97 + rnd);
    }
    //generate numbers
    for (let i = 0; i < 7; i++) {
        let rnd = Math.floor(Math.random() * 10);
        result += rnd;
    }
    return result.toUpperCase();
}