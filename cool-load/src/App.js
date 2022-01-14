import { Block, Columns, Container, Heading, Image, Navbar } from "react-bulma-components";
import { Link, Route, Routes } from "react-router-dom";
import CargoContainer from "./pages/CargoContainer";
import Client from "./pages/Client";
import Home from "./pages/home";

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
                      <Navbar.Link><Link to="/">Containers</Link></Navbar.Link>
                      <Navbar.Dropdown right>
                        <Navbar.Item>Lista</Navbar.Item>
                        <Navbar.Divider />
                        <Navbar.Item>Novo</Navbar.Item>
                        <Navbar.Item>Editar</Navbar.Item>
                        <Navbar.Item>Remover</Navbar.Item>
                      </Navbar.Dropdown>
                    </Navbar.Item>
                    <Navbar.Item hoverable arrowless>
                      <Navbar.Link><Link to="client">Clientes</Link></Navbar.Link>
                      <Navbar.Dropdown right>
                        <Navbar.Item>Lista</Navbar.Item>
                        <Navbar.Divider />
                        <Navbar.Item><Link to="client/new">Cadastrar</Link></Navbar.Item>
                        <Navbar.Item>Editar</Navbar.Item>
                        <Navbar.Item>Remover</Navbar.Item>
                      </Navbar.Dropdown>
                    </Navbar.Item>
                  </Navbar.Container>
                  <Navbar.Container align="right">
                    <Navbar.Item>
                      Relatórios
                    </Navbar.Item>
                  </Navbar.Container>
              </Navbar.Menu>
            </Navbar>
          </Columns.Column>
        </Columns>
      </Container>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/container" element={<CargoContainer/>} />
          <Route path="client" element={<Client/>} />          
          <Route path="client/new" element={<Client.Subscribe/>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
