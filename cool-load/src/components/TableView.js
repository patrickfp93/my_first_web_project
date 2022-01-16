import { Box, Button, Columns, Heading, Icon, Notification, Table } from "react-bulma-components";
import { Icon as MDI } from "@mdi/react";
import { mdiDelete, mdiPencil, mdiPencilPlus, mdiRestore } from "@mdi/js";
import { useEffect, useState } from "react";
import { Add, getAll } from "../services/CRUD";

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
        <Notification color="info">
            <Columns>
                <Columns.Column>
                    {(props.title) ? (<Heading>{props.title}</Heading>) : (<></>)}
                </Columns.Column>
                <Columns.Column>
                    {(props.subtitle) ? (<Heading subtitle>{props.subtitle}</Heading>) : (<></>)}
                </Columns.Column>
                <Columns.Column>
                    <Button.Group>
                        <Button
                            color="info"
                            renderAs="span"
                            onClick={() => { updateItems(); }}
                        >
                            <Icon><MDI path={mdiRestore} /></Icon>
                        </Button>
                        <Button
                            color="info"
                            renderAs="span"
                            onClick={() => { if(props.requestNewItem){props.requestNewItem(addItem);} }}
                        >
                            <Icon><MDI path={mdiPencilPlus} /></Icon>
                        </Button>
                        <Button
                            color="info"
                            renderAs="span"
                        >
                            <Icon><MDI path={mdiPencil} /></Icon>
                        </Button>
                        <Button
                            color="info"
                            renderAs="span"
                        >
                            <Icon><MDI path={mdiDelete} /></Icon>
                        </Button>
                    </Button.Group>
                </Columns.Column>
            </Columns>
        </Notification>
        <Box style={{ marginTop: "-25px" }}>
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
        </Box>
    </>);
};

export default TableView;