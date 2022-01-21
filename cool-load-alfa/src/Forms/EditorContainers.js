import { useEffect, useState } from 'react';
import { Button, Form, Icon} from 'react-bulma-components';
import './../main.scss';
import { Add, getAll, Remove } from '../service/crud';
import FaIcon from '../util/component/FaIcon';
import ErrorMessages from '../util/component/ErrorMessages';
import { useDispatch } from 'react-redux';
import { increment } from '../reducers/ErrorSlice';
import {
  buildContainer, ContainersCategory,
  ContainersStatus, TypeContainers
} from '../util/builders';
import MessageBox from '../util/component/MessageBox';
import Field from '../util/component/Field';
import { Push, Set } from '../service/Middleware/ContainersMiddleware';
const labelStyleDefault = {
  minWidth: "75px",
  marginTop: "10px"
};
const EditorContainers = (props) => {
  let dispatch = useDispatch();
  const [addMode, setAddMode] = useState(true);
  const [container, setContainer] = useState(buildContainer({}, TypeContainers[0], ContainersStatus[0], ContainersCategory[0]));
  useEffect(() => {
    if (addMode && props.container) {
      setContainer(props.container);
      setAddMode(false);
    }
  }, [setContainer, setAddMode, addMode, props]);
  const close = () => {
    if (props.onClose instanceof Function) {
      props.onClose();
      setContainer({ ...container, client: "" });
    }
  };
  const addItem = async () => {
    try {
      Push(dispatch, container);
      close();
    } catch (e) {
      dispatch(increment(e));
    }
  };
  const editItem = async () => {
    try {
      Set(dispatch, container);
      close();
    } catch (e) {
      dispatch(increment(e));
    }
  };
  if (addMode && props.container) {
    setContainer(props.container);
    setAddMode(false);
  }
  return (<>
    <MessageBox show={props.show} title={(addMode) ? "Cadastro" : "(<b>Edição</b>)"}
      options={[{ value: "Confirmar", color: "primary", disabled: !container.client.name }, { value: "Cancelar", color: "warning" }]}
      onClose={(option) => {
        if (option === "Confirmar") {
          (addMode) ? addItem() : editItem();
        } else {
          close();
        }
      }}>
      <ErrorMessages />
      <form>
        <Field label="ID" textColor="primary">
          <Form.Input color="primary" textColor="primary" value={(container.id) ? container.id : "Novo"} disabled />
          <Icon color="primary" align='left'><i className="fas fa-barcode" /></Icon>
        </Field>
        <ClientInput selectedClient={container.client} setSelectedClient={(client) => setContainer({ ...container, client: client })} />
        <Field label="Tipo">
          <Form.Select color="white" value={container.type_container}
            onChange={(e) => setContainer({ ...container, type_container: e.target.value })}>
            <option value="T20">20</option>
            <option value="T40">40</option>
          </Form.Select>
          <Icon align='left'><i className="fas fa-box" /></Icon>
        </Field>
        <Field label="Status">
          <Form.Select color="white" value={container.status}
            onChange={(e) => setContainer({ ...container, status: e.target.value })}>
            <option value="Full">Cheio</option>
            <option value="Empty">Vazio</option>
          </Form.Select>
          <Icon align='left'><i className={(container.status === "Full") ?
            "fas fa-battery-full" : "fas fa-battery-empty"} /></Icon>
        </Field>
        <Field label="Categoria">
          <Form.Select color="white" value={container.category}
            onChange={(e) => setContainer({ ...container, category: e.target.value })}>
            <option value="Importation">Importação</option>
            <option value="Exportation">Exportação</option>
          </Form.Select>
          <Icon align='left'><i className={(container.category === "Importation") ?
            "fas fa-arrow-alt-circle-left" : "fas fa-arrow-alt-circle-right"} /></Icon>
        </Field>
      </form>
    </MessageBox>
  </>);
};

export default EditorContainers;

const ClientInput = (props) => {
  const [isInit, init] = useState(false);
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState();
  const dispatch = useDispatch();
  const getAllClients = async () => {
    try {
      const receiver = await getAll("client");
      const data = await receiver.json();
      setClients(data);
    } catch (error) {
      dispatch(increment(error.toString()))
    }
  };
  useEffect(() => {
    if (!isInit) {
      init(true);
      getAllClients();
    }
  }, [dispatch, isInit, getAllClients]);

  const AddClient = () => {
    if (newClient !== "") {
      Add("client", newClient).then((_) => {
        getAllClients();
      }).catch(e => dispatch(increment(e.toString())));
      setNewClient(undefined);
    } else {
      dispatch(increment("O campo do cliente está vazio!"));
    }
  };
  const RemoveClient = () => {
    let idClient = props.selectedClient.id;
    Remove("client", idClient).then((r) => {
      if (r.status === 500) {
        dispatch(increment("500 (Internal Server Error)! Possívelmente, o cliente " + props.selectedClient.name + " não pode ser excluido porque está associado a um ou mais containers!"))
      }
      getAllClients();
    }).catch(e => dispatch(increment(e.toString())));
  };
  const nameClient = (props.selectedClient && props.selectedClient.name) ? props.selectedClient.name : "";
  const [message, setMessage] = useState();
  return (<Form.Field kind="addons">
    <MessageBox show={message} onClose={(result) => {
      if (result === "Yes") { RemoveClient() }
      setMessage();
    }}>
      {message}
    </MessageBox>
    <Form.Label textColor="primary"><p style={labelStyleDefault}>Cliente </p></Form.Label>
    <Form.Control style={{ marginRight: "2px" }}>
      {(newClient !== undefined) ?
        (<Form.Input textColor="primary" align="left"
          placeholder="cliente"
          color="primary"
          type="text"
          value={newClient}
          onChange={(e) => { if (e.target.value.length < 30) setNewClient(e.target.value) }}
        />)
        : (<Form.Select textColor="primary" color="primary" disabled={clients.length === 0} value={nameClient}
          onChange={(e) => {
            let index = clients.findIndex((elm) => elm.name === e.target.value);
            props.setSelectedClient(clients[index]);
          }}>
          {(nameClient === "") ? (<option key={-1} value={""}>Selecione um cliente...</option>) : (<></>)}
          {(clients.length > 0) ? clients.map((client, index) => {
            return (<option key={index} value={client.name}>
              {client.name}
            </option>);
          }) : <></>}
        </Form.Select>)}
      <Icon align="left" color="primary" >
        <i className="fas fa-user-tie" />
      </Icon>
    </Form.Control>
    {(newClient === undefined) ?
      (<Button.Group>
        <Button renderAs='span' color="primary" onClick={() => { setNewClient(""); }} inverted>
          <FaIcon color="primary" size="small" className="plus" />
        </Button>
        <Button renderAs='span' disabled={clients.length === 0 || nameClient === ""} color="primary"
          onClick={() => {
            setMessage("Deseja realmente excluir o cliente \""
              + props.selectedClient.name + "\"?");
          }} inverted>
          <FaIcon color="primary" size="small" className="minus" />
        </Button>
      </Button.Group>
      ) :
      (
        <Button.Group style={{ marginLeft: "5px" }}>
          <Button renderAs='span' color="primary" onClick={() => { setNewClient(undefined); }} inverted>
            <FaIcon color="primary" size="small" className="times" />
          </Button>
          <Button renderAs='span' color="primary" onClick={() => { AddClient(); }} inverted>
            <FaIcon color="primary" size="small" className="check" />
          </Button>
        </Button.Group>
      )
    }

  </Form.Field>);
};