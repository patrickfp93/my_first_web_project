import { useState } from "react";
import { Button, Modal } from "react-bulma-components";
import TableView from "../components/TableView";
//import { generate_id_container } from "../services/util";

const CargoContainer = () => {
    const [currentContainer, updateCurrentContainer] = useState({});
    const [modal, showModal] = useState(false);
    const [sender, setSender] = useState();
    return (<>
        <TableView title="Containers" requestNewItem={(sender) => {
            console.log("sender",sender);
            showModal(true);
            setSender(sender);
        }} model="container" />
        <Modal show={modal} onClose={() => { showModal(false); setSender(); }}>
            <Modal.Card>
                <Modal.Card>
                    <Modal.Card.Header showClose>
                        <Modal.Card.Title>Editor de containers</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right" hasAddons>
                        <Button color="success">Criar</Button>
                        <Button color="warning" onClick={() => { showModal(false); setSender(); }}>cancelar</Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal.Card>
        </Modal>
    </>);
};
export default CargoContainer;


