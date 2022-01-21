import { Button, Heading, Modal, Notification } from "react-bulma-components";


const MessageBox = ({ title, children, show, onClose, options, alignButtons,alignTitle, color ,...args }) => {
    let currentTitle = (title) ? title : "Confirma?";
    let buttons = [{ value: "Sim", color: "success" }, { value: "Não", color: "warning" }];
    if (options instanceof Array) {
        buttons = options;
    }
    return (<>
        <Modal show={show} onClose={() => {
            if(onClose instanceof Function)onClose(undefined);
        }}>
            <Modal.Content>
                <Modal.Card >
                    <Modal.Card.Header {...args} color={(color)?color:"primary"} renderAs={Notification} style={{ borderRadius: "10px 10px 0px 0px", margin: "0px" }}>
                        <Modal.Card.Title renderAs={Heading} align={(alignTitle)?alignTitle:"center"} >{currentTitle}</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        {children}
                    </Modal.Card.Body>
                    <Modal.Card.Footer {...args} color={(color)?color:"primary"} renderAs={Notification} style={{ borderRadius: "0px 0px 10px 10px", margin: "0px" }}>
                        <Button.Group style={{width:"100%"}} align={(alignButtons) ? alignButtons : "right"}>
                            {buttons.map((v, i) => {
                                let value = (v.value) ? v.value : v;
                                return (<Button key={i} disabled={v.disabled} color={(v.color) ? v.color : "white"} onClick={() => {
                                    if (onClose instanceof Function) onClose(value);
                                }}> <p>{value}</p>
                                </Button>);
                            })}
                        </Button.Group>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal.Content>
        </Modal>
    </>);
};

export default MessageBox;