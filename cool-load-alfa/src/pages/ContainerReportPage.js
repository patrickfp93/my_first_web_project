import { useEffect, useLayoutEffect, useState } from "react";
import { Box, Heading, Notification } from "react-bulma-components";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { Update } from "../service/Middleware/ContainersMiddleware";
import TableView from "../util/component/TableView";
import { getRandomFlatColor } from "../util/utilities";

const ContainerReportPage = () => {
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
        }
    }, [dispatch, init, setInit]);
    let containers = useSelector((state) => state.container.value);
    let data = [];
    let colors = [];
    for (let i = 0; i < containers.length; i++) {
        let name = containers[i].client.name;
        let index = data.findIndex(v => v.name === name);
        if (index === -1) {
            colors.push(getRandomFlatColor());
            data.push({
                name: name,
                count: 1
            });
        } else {
            data[index].count++;
        }
    }
    return (<Box id="box" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Notification>
            <Heading>Relatório</Heading>
            <Heading subtitle> de Containers Registrados por Cliente</Heading>
        </Notification>
        <TableView items={[...data,{name:"Total",count:containers.length}]} headers={["Cliente", "QDT Containers"]} />
        <PieChart width={width} height={400}>
            <Pie data={data} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={120} fill={colors} label>
                {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Pie>
            <Legend verticalAlign="bottom" height={0} />
        </PieChart>
        <BarChart width={width} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Bar>
        </BarChart>
    </Box>);
};

export default ContainerReportPage;