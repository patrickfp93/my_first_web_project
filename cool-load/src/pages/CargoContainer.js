import { mdiPencil  ,mdiDelete ,mdiPencilPlus   } from "@mdi/js";
import { Icon as MDI } from "@mdi/react";
import { Box, Button, Heading, Icon, Notification, Table, Form } from "react-bulma-components";
import Client from "../model/client";
import Container, { ContainerCategory, ContainerStatus, TypeContainer } from "../model/Container";
import { generate_id_container } from "../services/util";

let importsLTDA = new Client(0, "ImportsLTDA");



const CargoContainer = () => {
    let containers = [
        new Container(importsLTDA, generate_id_container(), TypeContainer.T20, ContainerStatus.Full, ContainerCategory.Importation),
        new Container(importsLTDA, generate_id_container(), TypeContainer.T40, ContainerStatus.Empty, ContainerCategory.Importation),
    ];
    console.log(containers);
    return (
        <Box>
            <Notification>
                <Heading>
                    Containers
                </Heading>
                <Heading subtitle>
                    Lista de Containers
                </Heading>
            </Notification>
            <Table size="fullwidth">
                <thead>
                    <tr>
                        <th>
                            <abbr title="Identificação">
                                ID
                            </abbr>
                        </th>
                        <th>
                            Cliente
                        </th>
                        <th>
                            Tipo
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Categoria
                        </th>
                        <th>
                            Ação
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        containers.map((c, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {c.id}
                                    </td>
                                    <td>
                                        {c.client.name}
                                    </td>
                                    <td>
                                        {c.type.name}
                                    </td>
                                    <td>
                                        {c.status.name}
                                    </td>
                                    <td>
                                        {c.category.name}
                                    </td>
                                    <td>                                     
                                        <Form.Field kind="addons">
                                            <Form.Control>
                                                <Button size="normal" color="primary"  ><Icon><MDI path={mdiPencilPlus } /></Icon></Button>
                                            </Form.Control>
                                            <Form.Control>
                                                <Button size="normal" color="primary"  ><Icon><MDI path={mdiPencil } /></Icon></Button>
                                            </Form.Control>
                                            <Form.Control>
                                                <Button size="normal" color="primary"  ><Icon><MDI path={mdiDelete  } /></Icon></Button>
                                            </Form.Control>
                                        </Form.Field>

                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </Table>
        </Box>
    );
};
export default CargoContainer;


