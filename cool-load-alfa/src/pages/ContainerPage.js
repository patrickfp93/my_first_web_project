import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditorContainers from "../Forms/EditorContainers";
import { Delete, Update } from "../service/Middleware/ContainersMiddleware";
import { ContainersCategory } from "../util/builders";
import MessageBox from "../util/component/MessageBox";
import TableView from "../util/component/TableView";

function ContainerPage() {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    useEffect(() => {
      if (!init) {
        setInit(true);
        Update(dispatch);
      }
    }, [dispatch,init,setInit]);
    const [showEditor, setShowEditor] = useState(false);
    let containers = useSelector((state) => state.container.value);
    let [seletedContainer, setSelectedContainer] = useState();
    if (seletedContainer && !showEditor) {
      setShowEditor(true);
    }
    const [selectionContainers,setSelectionContainers] = useState([]);
    return (<>
      <MessageBox show={selectionContainers.length > 0} onClose={(result) => {
        if (result === "Sim") {
          Delete(dispatch, selectionContainers.map((v) => {
            return containers[v].id
          }))
        }
        setSelectionContainers([]);
      }}>
        Tem certeza que deseja deletar {selectionContainers.length} item(s). 
      </MessageBox>
        <TableView title="Lista" items={containers}
          filterLine={(row) => {
            return {
              id: row.id,
              client: row.client.name,
              type_container: (row.type_container === "T20") ? "20" : "40",
              status: (row.status === "Full") ? "Cheio" : "Vazio",
              category: (row.category === ContainersCategory[0]) ? "Importação" : "Exportação"
            }
          }}
          hasFilter
          headers={["ID", "Cliente", "Tipo", "Status", "Categoria"]}
          subtitle="de Containers"
          onMinusClick={(elms)=>{setSelectionContainers(elms)}}
          onEditClick={(id) => {
            setSelectedContainer(containers[id]);
          }}
          //onUpdateClick={(e) => Update(dispatch)}
          onAddClick={(e) => {
            setShowEditor(true);
          }
          } />
        <EditorContainers show={showEditor} container={seletedContainer}
          onClose={() => { setShowEditor(false); setSelectedContainer(); }} />  
    </>
    );
  }
  
  export default ContainerPage;