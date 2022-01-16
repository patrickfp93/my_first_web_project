import { Block, Columns, Container, Heading, Image, Navbar } from "react-bulma-components";
import { Link, Route, Routes } from "react-router-dom";
import CargoContainer from "./pages/CargoContainer";
import Home from "./pages/home";
import Moviment from "./pages/Moviment";

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
                  <Navbar.Item renderAs="span" ><Link to="/">Home</Link></Navbar.Item>
                  <Navbar.Item renderAs="span"hoverable arrowless>
                    <Link to="/containers">Containers</Link>
                  </Navbar.Item>
                  <Navbar.Item renderAs="span" hoverable arrowless>
                    <Link to="moviment">Movimentações</Link>
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
          <Route path="/" element={<Home />} />
          <Route path="/containers" element={<CargoContainer />} />
          <Route path="/moviment" element={<Moviment />} />
          <Route path="/moviment/new" element={<Moviment.Subscribe />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
