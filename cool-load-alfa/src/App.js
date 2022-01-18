import { useEffect, useState } from 'react';
import { Button, Container, Form, Icon, Modal } from 'react-bulma-components';
import './main.scss';
import { Add, getAll, Remove } from './service/crud';
import FaIcon from './util/component/FaIcon';
import ErroMessages from './util/component/ErroMessages';
import TableView from './util/component/TableView';
import { useDispatch } from 'react-redux';
import { increment } from './reducers/ErrorSlice';
import { show } from './reducers/MessageSlice';
import { buildContainer, BuildContainer, ContainersCategory, ContainersStatus, TypeContainers } from './util/builders';
import MessageBox from './util/component/MessageBox';
function App() {
  const [addEvent, setAddEvent] = useState(undefined);
  return (<>
    <Container alignContent='center'>
      <TableView title="Relatório" subtitle="de Containers" model="container" onAddClick={(e) => {
      }} />
      <AddModal />
    </Container>

  </>
  );
}

export default App;

const AddModal = () => {

  const [isInit, init] = useState(false);
  const [clients, setClients] = useState([]);
  const [container, setContainer] = useState({});
  const [newClient, setNewClient] = useState();
  const dispatch = useDispatch();
  const getAllClients = async () => {
    try {
      const data = await getAll("client");
      if (data.length > 0) {
        setContainer(
          buildContainer(data[0], TypeContainers[0],
            ContainersStatus[0], ContainersCategory[0]));
      }
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
    let idClient = container.client.id;
    Remove("client",idClient).then(() => {
      getAllClients();
    }).catch(e => dispatch(increment(e.toString())));
  };
  const nameClientSelected = (container.client) ? container.client.name : "";

  return (<>
    <MessageBox onYes={()=>{RemoveClient();}} />
    <Modal show={true}>
      <Modal.Content>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Adcionar Containers</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <ErroMessages />
            <form>
              <Form.Field kind="addons" >
                <Form.Label ><p style={{ paddingTop: "10px", paddingRight: "10px" }}>Cliente </p></Form.Label>
                <Form.Control>
                  {(newClient !== undefined) ?
                    (<Form.Input align="left"
                      placeholder="cliente"
                      color="primary"
                      type="text"
                      value={newClient}
                      onChange={(e) => { if(e.target.value.length <30)setNewClient(e.target.value) }}
                    />)
                    : (<Form.Select disabled={clients.length === 0} value={nameClientSelected} onChange={(e) => { setContainer({ ...container, client: e.target.value }) }}>
                      {(clients.length > 0) ? clients.map((client, index) => {
                        return (<option key={index} value={client.name}>
                          {client.name}
                        </option>);
                      }) : <></>}
                    </Form.Select>)}
                  <Icon align="left" >
                    <i className="fas fa-user-tie" />
                  </Icon>
                </Form.Control>
                {(newClient === undefined) ?
                  (<Button.Group>
                    <Button renderAs='span' color="primary" onClick={() => { setNewClient(""); }} inverted>
                      <FaIcon color="primary" size="small" className="plus" />
                    </Button>
                    <Button renderAs='span' disabled={clients.length == 0} color="primary"
                     onClick={() => {dispatch(show("Deseja realmente excluir o cliente \""
                      + container.client.name+"\"?"));
                    }} inverted>
                      <FaIcon color="primary" size="small" className="minus" />
                    </Button>
                  </Button.Group>
                  ) :
                  (
                    (<Button.Group style={{ marginLeft: "5px" }}>
                      <Button renderAs='span' color="primary" onClick={() => { setNewClient(undefined); }} inverted>
                        <FaIcon color="primary" size="small" className="times" />
                      </Button>
                      <Button renderAs='span' color="primary" onClick={() => { AddClient(); }} inverted>
                        <FaIcon color="primary" size="small" className="check" />
                      </Button>
                    </Button.Group>
                    )
                  )
                }

              </Form.Field>
            </form>
          </Modal.Card.Body>
          <Modal.Card.Footer>

          </Modal.Card.Footer>
        </Modal.Card>
      </Modal.Content>
    </Modal>
  </>);
};
