import { Button, Modal } from "react-bulma-components";
import { useDispatch, useSelector } from "react-redux";
import FaIcon from "./FaIcon";
import {close} from "./../../reducers/MessageSlice";


const MessageBox = ({ title,onYes, onNo }) => {
    const dispatch = useDispatch();
    let currentTitle= (title)?title:"Confirma?";
    const message = useSelector((state) => state.message.value);
    return (<>
        <Modal show={message !== "" && message} onClose={() => {
            dispatch(close());
        }}>
            <Modal.Content >
                <Modal.Card >
                    <Modal.Card.Header>
                        <Modal.Card.Title>{title}</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        {message}
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right" hasAddons>
                        <Button color="success" align="left" onClick={() => {
                            dispatch(close());
                            if (typeof onYes === 'function') onYes();
                        }} ><FaIcon className="check" /><p>YES</p></Button>
                        <Button color="warning" align="right" onClick={() => {                            
                            dispatch(close());
                            if (typeof onNo === 'function') onNo();
                        }}><FaIcon className="times" /><p>NO</p></Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal.Content>
        </Modal>
    </>);
};

export default MessageBox;