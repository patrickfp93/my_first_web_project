
import { Notification, Heading, Columns, Button, Table } from "react-bulma-components";
import { useEffect, useState } from "react";
import {getAll,Add} from "./../../service/crud";
import FaIcon from "./FaIcon";

const TableView = (props) => {
    const [items, setItems] = useState([]);
    const [init, setInit] = useState(false);
    const updateItems = () => {
        getAll(props.model).then(data => {
            let date_result = data;
            console.log("TableView(" + props.title + ") make update.");
            ///filter
            if (Array.isArray(date_result)) {
                if (props.filter) {
                    date_result = props.filter(date_result);
                } setItems(date_result);
            }
        });
    };
    const addItem = (item) => {
            if (item !== undefined) {
                Add(props.model, item).then(response => {
                    console.log("response:", response);
                });
            }
    };
    useEffect(() => {
        if (!init) {
            setInit(true);
            console.log("TableView(" + props.title + ") initialized.")
            updateItems();
        }
    }, []);

    let columns = [];
    for (var name in items[0]) {
        columns.push(name);
    }
    let headers = columns;
    if (props.columns !== undefined && props.columns.length > 0) {
        headers = props.columns;
    }

    return (<>
        <Notification color="primary">
            <Columns>
                <Columns.Column>
                    {(props.title)?(<Heading>{props.title}</Heading>):(<></>)}
                    {(props.subtitle)?(<Heading subtitle>{props.subtitle}</Heading>):(<></>)}
                </Columns.Column>
                <Columns.Column size={4}>
                    <Button.Group>
                        <Button size="large" color="primary"><FaIcon className="sync" /></Button>
                        {(props.onAddClick)? (<Button size="large" color="primary" onClick={()=> props.onAddClick(addItem) }><FaIcon className="plus-square"/></Button>):(<></>)}
                        {(props.onEditClick)? (<Button size="large" color="primary" onClick={()=> props.onEditClick(addItem) }><FaIcon className="edit"/></Button>):(<></>)}
                        {(props.onMinusClick)? (<Button size="large" color="primary" onClick={()=> props.onMinusClick(addItem) }><FaIcon className="minus-square"/></Button>):(<></>)}
                    </Button.Group>
                </Columns.Column>
            </Columns>
        </Notification>
        <Table size="fullwidth" striped hoverable>
                <thead>
                    <tr>
                        {
                            headers.map((c, i) => {
                                return (
                                    <th key={"header" + i}>{c}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((line, x) => {
                            return (
                                <tr key={"line" + x}>
                                    {
                                        columns.map((value, y) => {
                                            if (y < headers.length) {
                                                return (<td key={"col" + y}>{line[value]}</td>)
                                            } else {
                                                return (<></>)
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
    </>);
}

export default TableView;