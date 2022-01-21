
import { useState } from "react";
import { Notification, Heading, Columns, Button, Table, Form, Icon } from "react-bulma-components";
import FaIcon from "./FaIcon";
import Field from "./Field";
import MessageBox from "./MessageBox";

const TableView = (props) => {
    let items = [];
    if (Array.isArray(props.items)) {
        items = props.items;
    }
    let columns = [];
    for (var name in items[0]) {
        columns.push(name);
    }
    let headers = columns;
    if (props.headers !== undefined && props.headers.length > 0) {
        headers = props.headers.filter((_,i)=> i < columns.length);
    }
    let [hasSelection, setSelection] = useState(false);
    let [multSelected, setMultSelected] = useState(true);
    let [multSelections, setMultSelections] = useState([]);
    let [singleSelection, setSingleSelection] = useState(-1);
    let [sortHeader, setSortHeader] = useState({id:-1,inverted : false});
    let [showFilterMB,setShowFilterMB] = useState(false);
    let [colunmFilter,setColunmFilter] = useState(-1);
    let [keyWord,setKeyWord] = useState("");
    let [itemsFilted,setItemsFilted] = useState(false);
    ///filter and sort    
    const compare = (a, b) => {
        let selectedColumn = columns[sortHeader.id];
        if (a[selectedColumn] < b[selectedColumn]) {
            return (sortHeader.inverted)?1:-1;
        }
        if (a[selectedColumn] > b[selectedColumn]) {
            return (sortHeader.inverted)?-1:1;
        }
        return 0;
    };
    items = items.filter((row) => {
        if (props.filterLine instanceof Function) {
            if (row === null || row === undefined) {
                return false;
            }
        }
        return true;
    }).map((row,_)=>{
        if (props.filterLine instanceof Function) {
            return props.filterLine(row);
        }
        return row;
    });
    if(itemsFilted && colunmFilter > -1  && keyWord.length > 0){
        items = items.filter((v,_)=> v[columns[colunmFilter]].toString().search(keyWord) > -1);
    }
    if(sortHeader.id > -1)items.sort(compare);
    const deleteAction = () => {
        if (hasSelection) {
            if (multSelections.length > 0) {
                props.onMinusClick(multSelections);
            }
            setSelection(false);
        } else {
            setSelection(true);
            setMultSelected(true);
            setMultSelections([]);
        }
    }
    const editAction = () => {
        if (hasSelection) {
            if (singleSelection >= 0) {
                props.onEditClick(singleSelection);
            }
            setSelection(false);
        } else {
            setSelection(true);
            setMultSelected(false);
            setSingleSelection(-1);
        }
    }
    const onFilter = ()=>{
        if(!itemsFilted){
            setShowFilterMB(true);
        }else{
            setItemsFilted(false);
            setColunmFilter(-1);
            setKeyWord("");
        }
    }
    if(props.hasSort && sortHeader.id === -1){
        setSortHeader({...sortHeader,id:0});
    }

    let styleButtonHeader={ margin: "0px", borderWidth: "0px", padding: "0px",height:"24px",width:"100%"};
    return (<>
        <MessageBox title="Filtro" show={showFilterMB} onClose={(option)=>{
            setShowFilterMB(false);
            if(option === "Confirmar"){
                setItemsFilted(true);
            }
        }}
        options={[{value:"Confirmar",color:"primary",disabled: colunmFilter === -1 || keyWord.length === 0}
        ,{value:"Cancelar",color:"warning"}]}>
            <Field space={120} textColor="primary" label="Coluna">
                <Form.Select value={colunmFilter} onChange={(e)=> setColunmFilter(e.target.value)}>
                    {(colunmFilter === -1)?(<option value={-1}> Selecione a coluna</option>):(<></>)}
                    {headers.map((v,i)=><option key={v+"-"+i} value={i}>{v}</option>)}
                </Form.Select>
                <Icon align="left"><i className="fas fa-columns" /></Icon>
            </Field>
            <Field space={120} textColor="primary" label="Palavra-chave">
                <Form.Input value={keyWord} onChange={(e)=> setKeyWord(e.target.value)}/>
                <Icon align="left"><i className="fas fa-search" /></Icon>
            </Field>
        </MessageBox>
        {(props.title || props.subtitle || props.onUpdateClick || props.onAddClick || props.onEditClick || props.onMinusClick) ?
            (<Notification color="primary" style={{ marginBottom: "0px", borderRadius: "0px" }}>
                <Columns>
                    <Columns.Column>
                        {(props.title) ? (<Heading>{props.title}</Heading>) : (<></>)}
                        {(props.subtitle) ? (<Heading subtitle>{props.subtitle}</Heading>) : (<></>)}
                    </Columns.Column>
                    <Columns.Column size={4}>
                        <Button.Group>
                            {(props.hasFilter) ? (<Button disabled={hasSelection} inverted={itemsFilted} size="large" onClick={() => onFilter()} color="primary"><FaIcon className="filter" /></Button>) : <></>}
                            {(props.onUpdateClick) ? (<Button disabled={hasSelection || itemsFilted} size="large" onClick={() => props.onUpdateClick()} color="primary"><FaIcon className="sync" /></Button>) : <></>}
                            {(props.onAddClick) ? (<Button disabled={hasSelection || itemsFilted} size="large" color="primary" onClick={() => props.onAddClick()}><FaIcon className="plus-square" /></Button>) : (<></>)}
                            {(props.onEditClick) ? (<Button disabled={(hasSelection && multSelected) || itemsFilted} inverted={hasSelection && !multSelected} size="large" color="primary" onClick={() => editAction()}><FaIcon className="edit" /></Button>) : (<></>)}
                            {(props.onMinusClick) ? (<Button disabled={(hasSelection && !multSelected) || itemsFilted} inverted={hasSelection && multSelected} size="large" color="primary" onClick={() => deleteAction()}><FaIcon className="minus-square" /></Button>) : (<></>)}
                        </Button.Group>
                    </Columns.Column>
                </Columns>
            </Notification>) : (<></>)}
        <Table style={props.style} size="fullwidth" striped hoverable>
            <thead>
                <tr key="header">
                    {(hasSelection) ? (<th></th>) : (<></>)}
                    {
                        headers.map((c, i) => {
                            return (
                                <th key={"header" + i} style={{padding:"2px"}}>
                                    {(sortHeader.id === i)?
                                    (<Button color="white"  style={styleButtonHeader} onClick={()=> {if(props.hasSort)setSortHeader({...sortHeader,inverted:!sortHeader.inverted})}}>
                                        <Icon style={{margin:"2px"}}><i className={"fas fa-sort-amount-"+((sortHeader.inverted)?"down":"up-alt") }/></Icon><b>{(c.name) ? c.name : c}</b>
                                    </Button>)
                                    :(<Button color="white" onClick={()=> {if(props.hasSort)setSortHeader({...sortHeader,id:i})}} style={styleButtonHeader}><b>{(c.name) ? c.name : c}</b></Button>)}
                                </th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    items.map((row, x) => {
                        let index = multSelections.indexOf(x);
                        let checked = (index > -1);
                        return (
                            <tr key={"line" + x}>
                                {(hasSelection) ? (
                                    <td key={"lineFirst" + x}>
                                        {(multSelected) ? <Form.Checkbox checked={checked} onChange={(e) => {
                                            if (e.target.checked) {
                                                setMultSelections([...multSelections, x]);
                                            } else {
                                                let newSelections = multSelections;
                                                let index = newSelections.indexOf(x);
                                                if (index > -1) {
                                                    multSelections.splice(index, 1);
                                                    setMultSelections(multSelections.filter(number => number !== x));
                                                }
                                            }
                                        }} /> : (
                                            <Form.Checkbox color="primary" checked={singleSelection === x} onChange={() => {
                                                if (x === singleSelection) setSingleSelection(-1);
                                                else setSingleSelection(x);
                                            }} />
                                        )}

                                    </td>) : (<></>)}

                                {
                                    columns.map((value, y) => {
                                        if (y < headers.length) {
                                            return (<td width={(headers[y].width) ? headers[y].width : "auto"} key={"col" + y + "," + x}>{row[value]}</td>)
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

