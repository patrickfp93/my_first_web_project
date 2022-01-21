import { Button, Message, Notification } from "react-bulma-components";
import { useSelector } from 'react-redux';
import { decrementById } from '../../reducers/ErrorSlice';
import { useDispatch } from 'react-redux';

const ErrorMessages = () => {
    const messages = useSelector((state) => state.erros.value);
    let dpt = useDispatch();
    return (<>{messages.map((m, i) => {
        return <Message key={"message" + i} color="danger" style={{margin:"0px"}}>
            <Message.Body key={"message.Body" + i} style={{padding:"0px"}}>
                <Notification style={{padding:"10px", background: "rgba(0, 0, 0, 0.0)"}} >
                    <p>
                {m.value + ((m.count > 1) ? " (" + m.count + ")" : "")}</p>
                    <Button remove sytle={{ padding: "0px" ,margin:"0px"}} onClick={() => { dpt(decrementById(i)) }} />
                </Notification>
            </Message.Body>
        </Message>
    })}</>);
}
export default ErrorMessages;