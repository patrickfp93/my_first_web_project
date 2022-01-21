import { TypeMovimentation } from "./builders";

export const getRandomColor = ()=>{
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#"+randomColor;
}

export const getRandomFlatColor = ()=>{
    return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (65 + 10 * Math.random()) + '%)';
}

export const timeConverter =(UNIX_timestamp) =>{
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
export const translateTypeMovimentation = (type) =>{
    let pt_array = ["Embarque","Descarregamento","Entrada","Saída","Reposicionamento", "Pesagem","Scanner"];
    let index = TypeMovimentation.findIndex((v,_)=> type === v);
    if(index > -1){
      return pt_array[index];
    }        
    return type;
}