import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditorMoviment from "../Forms/EditorMoviment";
import { Delete, Update } from "../service/Middleware/MovimentsMiddleware";
import MessageBox from "../util/component/MessageBox";
import TableView from "../util/component/TableView";
import { timeConverter, translateTypeMovimentation } from "../util/utilities";

function MovimentPage() {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    useEffect(() => {
      if (!init) {
        setInit(true);
        Update(dispatch);
      }
    }, [dispatch,init,setInit]);
    const [showEditor, setShowEditor] = useState(false);
    let moviments = useSelector((state) => state.moviment.value);
    let [seletedMoviment, setSelectedMoviment] = useState();
    if (seletedMoviment && !showEditor) {
      setShowEditor(true);
    }
    const [selectionContainers,setSelectionContainers] = useState([]);
    
    
    return (<>
      <MessageBox show={selectionContainers.length > 0} onClose={(result) => {
        if (result === "Yes") {
          Delete(dispatch, selectionContainers.map((v) => {
            return moviments[v].id
          }))
        }
        setSelectionContainers([]);
      }}>
        Tem certeza que deseja deletar {selectionContainers.length} item(s). 
      </MessageBox>
        <TableView title="Lista" items={moviments} hasSort
          filterLine={(row) => {
            return {
              id: row.id,
              container: row.container.id,
              type_movimentation: translateTypeMovimentation(row.type_movimentation),
              start_time: timeConverter(row.start_time),
              end_time: timeConverter(row.end_time),
            }
          }}
          hasFilter
          headers={["ID", "Container", "Tipo", "Inicio", "Fim"]}
          subtitle="de movimentações"
          onMinusClick={(elms)=>{setSelectionContainers(elms)}}
          onEditClick={(id) => {
            console.log("moviments[id]",moviments[id])
            setSelectedMoviment(moviments[id]);
          }}
          //onUpdateClick={(e) => Update(dispatch)}
          onAddClick={(e) => {
            setShowEditor(true);
          }
          } />
        <EditorMoviment show={showEditor} moviment={seletedMoviment}
          onClose={() => { setShowEditor(false); setSelectedMoviment(); }} />  
    </>
    );
  }
  
  export default MovimentPage;