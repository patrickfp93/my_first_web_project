import { Form } from "react-bulma-components";

const labelStyleDefault = {
    minWidth: "75px",
    marginTop: "10px"
};

const Field = ({space, label, textColor, children}) => {
    let style = {};
    if(space){
        style.minWidth = space+"px";
    }else{
        style.minWidth = labelStyleDefault.minWidth;
    }
    style.marginTop = labelStyleDefault.marginTop;
    return (<>
        <Form.Field kind="addons">
            <Form.Label textColor={textColor} style={style}>
                {label}
            </Form.Label>
            <Form.Control >
                {children}
            </Form.Control>
        </Form.Field>
    </>);
}

Field.DefaultLableStyle = labelStyleDefault;

export default Field;
