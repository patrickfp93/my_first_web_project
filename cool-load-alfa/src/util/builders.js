export const TypeContainers = ["T20", "T40"];
export const ContainersStatus = ["Full", "Empty"];
export const ContainersCategory = ["Importation", "Exportation"];

export function buildContainer(client, type, status, category) {
    return {
        client: client,
        type_container: type,
        status: status,
        category: category
    }
}

export const TypeMovimentation = ["Boarding","Unloading","GateIn","GateOut","Repositioning", "Weighing","Scanner"];

export function buildMoviment(container, type, start_time, end_time) {
    return {
        container: container,
        type_movimentation: type,
        start_time: start_time,
        end_time: end_time
    }
}
