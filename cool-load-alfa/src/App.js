import { Container, Heading, Navbar } from 'react-bulma-components';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './main.scss';
import ContainerPage from './pages/ContainerPage';
import ContainerReportPage from './pages/ContainerReportPage';
import MovimentReportPage from "./pages/MovimentReportPage";
import MovimentPage from './pages/MovimentPage';

function App() {
  return (<>
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to="/" >
          <img
            src="/logo512.png"
            alt="Cool Load"
            width="30"
            height="30"
          />
        </Navbar.Item>
        <Navbar.Item renderAs='p'>
          <Heading renderAs={Link} to="/" textColor='primary'>Cool Load</Heading>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item hoverable={true} active={false}>
            <Navbar.Link arrowless={false} >Containers</Navbar.Link>
            <Navbar.Dropdown boxed={false}>
              <Navbar.Item renderAs={Link} to="/tabela/container" >Tabela</Navbar.Item>
              <Navbar.Item renderAs={Link} to="/relatorio/container">Relatório</Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>
          <Navbar.Item hoverable={true} active={false}>
            <Navbar.Link arrowless={false} >Movimentações</Navbar.Link>
            <Navbar.Dropdown boxed={false}>
              <Navbar.Item renderAs={Link} to="/tabela/movimetacao" >Tabela</Navbar.Item>
              <Navbar.Item renderAs={Link} to="/relatorio/movimetacao">Relatório</Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
    <Container alignContent='center'>
      <Routes>
        <Route index element={<ContainerPage />} />
        <Route path="/tabela/container" element={<ContainerPage />} />
        <Route path="/relatorio/container" element={<ContainerReportPage />} />
        <Route path="/tabela/movimetacao" element={<MovimentPage />} />
        <Route path="/relatorio/movimetacao" element={<MovimentReportPage />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;


