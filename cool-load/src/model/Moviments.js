export default class Moviments{
    constructor(type,start_full_date,end_full_date){
        this.type = type;
        this.start_full_date = start_full_date;
        this.end_full_date = end_full_date; 
    }
}

export class TypeMoviments{
    static Boarding = new TypeMoviments("boading")
    static Unloading = new TypeMoviments("unloading")
    static GateIn = new TypeMoviments("gateIn")
    static Repositioning = new TypeMoviments("repositioning")
    static Weighing = new TypeMoviments("weighing")
    static Scanner = new TypeMoviments("scanner")
    static GateOut = new TypeMoviments("gateOut")
    constructor(name){
        this.name = name
    }
}