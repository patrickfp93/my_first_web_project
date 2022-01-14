export default class Container{
    constructor(client,id,type,status,category){
        this.client = client;
        this.id = id;
        this.type = type;
        this.status = status;
        this.category = category;
    }
}

export class TypeContainer{
    static T20 = new TypeContainer("T20")
    static T40 = new TypeContainer("T40")
    constructor(name){
        this.name = name;
    }
}

export class ContainerStatus{
    static Full = new ContainerStatus("Full")
    static Empty = new ContainerStatus("Empty")
    constructor(name){
        this.name = name;
    }
}

export class ContainerCategory{
    static Importation = new ContainerCategory("Importation");
    static Exportation = new ContainerCategory("Exportation");
    constructor(name){
        this.name = name;
    }
}