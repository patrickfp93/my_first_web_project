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
