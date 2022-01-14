import { Block, Columns, Container, Heading, Image, Navbar } from "react-bulma-components";

function App() {
  return (
    <>
      <Container style={{ marginTop: "50px" }}>
        <Columns>
          <Columns.Column size={2} offset={3}>
            <Block>
              <Image style={{ width: "100px" }}
                src="logo.svg"
              />
            </Block>
          </Columns.Column>
          <Columns.Column >
            <Heading>
              Cool-load
            </Heading>
            <Heading subtitle>
              Gerenciador de Containers
            </Heading>
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column >
            <Navbar style={{ borderRadius: "10px" }}>
              <Navbar.Menu>
                <Navbar.Container >
                  <Navbar.Item hoverable arrowless>
                    <Navbar.Link>Containers</Navbar.Link>
                    <Navbar.Dropdown right>
                      <Navbar.Item href="#">Lista</Navbar.Item>
                      <Navbar.Divider />
                      <Navbar.Item href="#">Novo</Navbar.Item>
                      <Navbar.Item href="#">Editar</Navbar.Item>
                      <Navbar.Item href="#">Remover</Navbar.Item>
                    </Navbar.Dropdown>
                  </Navbar.Item>
                  <Navbar.Item hoverable arrowless>
                    <Navbar.Link>Clientes</Navbar.Link>
                    <Navbar.Dropdown right>
                      <Navbar.Item href="#">Lista</Navbar.Item>
                      <Navbar.Divider />
                      <Navbar.Item href="#">Cadastrar</Navbar.Item>
                      <Navbar.Item href="#">Editar</Navbar.Item>
                      <Navbar.Item href="#">Remover</Navbar.Item>
                    </Navbar.Dropdown>
                  </Navbar.Item>
                </Navbar.Container>
                <Navbar.Container align="right">
                  <Navbar.Item href="#">
                    Relatórios
                  </Navbar.Item>
                </Navbar.Container>
              </Navbar.Menu>
            </Navbar>
          </Columns.Column>
        </Columns>
      </Container>
    </>
  );
}

export default App;
