import { useEffect, useState } from "react";
import { Form, Icon} from "react-bulma-components";
import { useDispatch, useSelector } from "react-redux";
import { Update } from "../service/Middleware/ContainersMiddleware";
import { Push, Set } from "../service/Middleware/MovimentsMiddleware";
import { buildMoviment, TypeMovimentation } from "../util/builders";
import DateTime from "../util/component/DateTime";
import Field from "../util/component/Field";
import MessageBox from "../util/component/MessageBox";

const EditorMoviment = (props) => {
    const [init, setInit] = useState(false);
    const [addMode, setAddMode] = useState(true);
    const [moviment, setMoviment] = useState(buildMoviment(null, TypeMovimentation[0], null, null));
    const dispatch = useDispatch();
    let containers = useSelector((state) => state.container.value);
    useEffect(() => {
        if (!init) {
            Update(dispatch);
            setInit(true);
        }
    }, [Update, dispatch, setInit, init]);
    const eventSeletedData = (datepicker) => {
        let startDate = new Date(datepicker.data.startDate);
        startDate.setUTCMinutes(datepicker.data.startTime.getUTCMinutes());
        startDate.setUTCHours(datepicker.data.startTime.getUTCHours());
        let endDate = new Date(datepicker.data.endDate);
        endDate.setUTCMinutes(datepicker.data.endTime.getUTCMinutes());
        endDate.setUTCHours(datepicker.data.endTime.getUTCHours());
        setMoviment({
            ...moviment, start_time: Math.floor(startDate / 1000),
            end_time: Math.floor(endDate / 1000)
        });
    };
    const editMoviment = () => {
        Set(dispatch, moviment);
        beforeClose();
    };
    const addMoviment = () => {
        Push(dispatch, moviment);
        beforeClose();
    };
    const beforeClose = () => {
        if (props.onClose instanceof Function) {
            setMoviment(buildMoviment(null, TypeMovimentation[0], null, null));
            props.onClose();
        }
    }
    let selectedContainer = (moviment.container) ? moviment.container.id : "";
    if (addMode && props.moviment) {
        console.log(addMode, props.moviment);
        setAddMode(false);
        setMoviment(props.moviment);
    } else if (!addMode && !props.moviment) {
        setAddMode(true);
    }
    return (<>
        <MessageBox show={props.show} title={(addMode) ? "Cadastro" : "Edição"}
            options={[{ value: "Confimar", color: "primary", disabled: !moviment.container 
            || !moviment.start_time || !moviment.end_time }, { value: "Cancelar", color: "warning" }]}
            onClose={(option)=>{
                if(option === "Confirmar"){
                    (addMode) ? addMoviment() : editMoviment();
                }else{
                    beforeClose();
                }
            }}>
            <form>
                <Field space={120} label="Intervalo" textColor="primary">
                    <DateTime onSelected={(data) => eventSeletedData(data)} options={{
                        type: "datetime", lang: "pt", displayMode: "dialog", isRange: true,
                        dateFormat: "dd/MM/yyyy", timeFormat: "hh:mm"
                    }} startDateValue={new Date(moviment.start_time * 1000)} endDateValue={new Date(moviment.end_time * 1000)} />
                </Field>
                <Field space={120} label="Container" textColor="primary">
                    <Form.Select color="white" value={selectedContainer} onChange={(e) => {
                        let index = containers.findIndex((v, _) => v.id === e.target.value);
                        console.log("index", index);
                        if (index > -1) setMoviment({ ...moviment, container: containers[index] });
                    }}>
                        <option key={"O--1"} value={""}>Selecione um Container</option>
                        {containers.map((v, i) => {
                            return (<option key={"O-" + i} value={v.id}>{v.id} - {v.client.name}</option>);
                        })}
                    </Form.Select>
                    <Icon color="primary" align='left'><i className="fas fa-box" /></Icon>
                </Field>
                <Field space={120} label="Tipo" textColor="primary">
                    <Form.Select color="white" value={moviment.type_movimentation} onChange={(e) => setMoviment({ ...moviment, type_movimentation: e.target.value })}>
                        <option value="Boarding">Embarque</option>
                        <option value="Unloading">Descarregamento</option>
                        <option value="GateIn">Entrada</option>
                        <option value="GateOut">Saída</option>
                        <option value="Repositioning">Reposicionamento</option>
                        <option value="Weighing">Pesagem</option>
                        <option value="Scanner">Scanner</option>
                    </Form.Select>
                    <Icon align='left'><i className="fas fa-dolly-flatbed" /></Icon>
                </Field>
            </form>
        </MessageBox>
    </>);
};

export default EditorMoviment;