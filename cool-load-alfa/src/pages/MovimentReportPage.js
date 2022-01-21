import { useEffect, useLayoutEffect, useState } from "react";
import { Box, Heading, Notification } from "react-bulma-components";
import { useDispatch, useSelector } from "react-redux";
import { Update } from "../service/Middleware/MovimentsMiddleware";
import { Update as UpdateContainers } from "../service/Middleware/ContainersMiddleware";
import TableView from "../util/component/TableView";
import { getRandomFlatColor, translateTypeMovimentation } from "../util/utilities";
import { ContainersCategory, TypeMovimentation } from "../util/builders";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const MovimentReportPage = () => {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    const [width, setWidth] = useState(700);
    useLayoutEffect(() => {
        let box = document.getElementById("box");
        let width = box.offsetWidth - 25;
        setWidth(width);
    }, []);
    useEffect(() => {
        let box = document.getElementById("box");
        let width = box.offsetWidth - 25;
        setWidth(width);
        if (!init) {
            setInit(true);
            Update(dispatch);
            UpdateContainers(dispatch);
        }
    }, [dispatch, init, setInit]);
    let moviments = useSelector((state) => state.moviment.value);
    let containers = useSelector((state) => state.container.value);
    let data = [];
    let dataImpExp = {importations: 0,operatonsImp : 0,exportations: 0,operatonsExp : 0};
    for (let i = 0; i < moviments.length; i++) {
        let name = moviments[i].container.client.name;
        let x = data.findIndex(v => v.name === name);
        if (x === -1) {
            data.push({
                name: name,
                types: [{
                    type_movimentation: translateTypeMovimentation(moviments[i].type_movimentation),
                    count: 1
                }],
                count: 1
            });
        } else {
            let tm = translateTypeMovimentation(moviments[i].type_movimentation);
            let y = data[x].types.findIndex((v, _) => v.type_movimentation === tm);
            if (y === -1) {
                data[x].types.push({
                    type_movimentation: tm,
                    count: 1
                });
            } else {
                data[x].types[y].count++;
            }
            data[x].count++;
        }
        if(moviments[i].container.category === ContainersCategory[0]){
            dataImpExp.operatonsImp++;
        }else{
            dataImpExp.operatonsExp++;
        }        
    }
    for (let i= 0; i< containers.length; i++){
        if(containers[i].category === ContainersCategory[0]){
            dataImpExp.importations++;
        }else{
            dataImpExp.exportations++;
        }
    }
    let dataChart = data.map((v,_)=>{
        let obj = {
            name : v.name
        };
        v.types.forEach((v,_)=>{
            obj[translateTypeMovimentation(v.type_movimentation)] = v.count;
        })
        return obj;
    });
    let tableStyle = {marginTop:"-30px"};
    return (<Box id="box" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Notification style={{marginBottom:"30px"}}>
            <Heading>Relatório</Heading>
            <Heading subtitle> de Movimentações agrupadas por Cliente</Heading>
        </Notification>
        {data.map((v, i) => {
            return (<TableView style={tableStyle} key={"tv" + i} items={[...v.types, { type_movimentation: "TOTAL", count: v.count }]}
                    headers={["Movimentações da "+v.name, {name:"QDT Movimentações", width:"50%"}]} />)
        })}
        <TableView style={tableStyle} key={"final"} items={[dataImpExp]} headers={["Importações (Total)","Operações (Importação)"
         ,"Exportações (Total)","Operações (Exportação)"]} />
        
        <BarChart width={width} height={250} data={dataChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis/>
            <Tooltip/>
            {TypeMovimentation.map((v,i)=>{
                let value =  translateTypeMovimentation(v);
                return (<Bar key={value+"-"+i} stackId="a" dataKey={value}  fill={getRandomFlatColor()}/>);
            })}

        </BarChart>
    </Box>);
};

export default MovimentReportPage;