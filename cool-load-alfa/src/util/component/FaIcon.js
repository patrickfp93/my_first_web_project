import { Icon } from "react-bulma-components";

const FaIcon = ({className,...args}) => {
    return (<Icon {...args}>
        <i className={(className)?"fas fa-"+className:"fas fa-exclamation-circle"}/>
        </Icon>);
}

export default FaIcon;