import { useState, useEffect } from "react";
import { Button, Input, Img, Table, H1, Main, Flex } from "./styles";
import { ToastContainer, toast } from 'react-toastify';
import { getValue, getAllValue, putValue, deleteValue, clearDB } from "./indexDB";

const DATABASE = "electronics-store";
const TABLE = "store";

const TableHeading = ["ID","Product Name", "Seller","Price", "Edit", "Delete"];

const DEFAULT_FORM_STATE = {
  ID: "",
  NAME: "",
  SELLER: "",
  PRICE: ""
}

const App = () => {

  const [ formState, setFormState ] = useState(DEFAULT_FORM_STATE);
  const [ indexDBData, setIndexDBData ] = useState([]);

  const createHandler = async () => {
    if(!formState.NAME || !formState.SELLER || !formState.PRICE) return;
    const payload =  { ...formState, ID: indexDBData.length + 1 };
    await putValue(DATABASE, TABLE, payload)
    setIndexDBData([...indexDBData, payload])
    setFormState({ ...DEFAULT_FORM_STATE, ID: payload.ID })
    toast.success("Data Inserted Successfully!")
  }

  const readHandler = async () => {
    setIndexDBData(await getAllValue(DATABASE, TABLE))
    toast.success("Data Fetched Successfully!")
  }

  const updateHandler = async () => {
    await putValue(DATABASE, TABLE, formState)
    setFormState(DEFAULT_FORM_STATE)
    setIndexDBData(await getAllValue(DATABASE, TABLE))
    toast.warn("Data Updated Successfully!")
  }

  const deleteAllHandler = async () => {
    await clearDB(DATABASE, TABLE)
    setIndexDBData([])
    toast.error("Database Cleared Successfully!")
  }

  const editHandler = async (id)  => setFormState(await getValue(DATABASE, TABLE, id))

  const deleteHandler = async (id) => {
    await deleteValue(DATABASE, TABLE, id)
    setIndexDBData(indexDBData.filter(item => item.ID !== id))
    toast.error("Data Deleted Successfully!")
  } 

  const inputChangeHandler = (e) => setFormState({...formState, [e.target.name]: e.target.value})

  useEffect(() => readHandler(), [])

  return (
    <Main>
      <ToastContainer />
      <H1>
        <Img src="assets/plug.svg" alt="plug" />{" "}
        Electronic Store
      </H1>
        <Input type="number" 
               name="ID" 
               readOnly 
               placeholder="ID" 
               onChange={inputChangeHandler} 
               disabled
               value={indexDBData.length + 1}
        />
        <Input type="text" 
               name="NAME" 
               placeholder="Product Name"
               value={formState.NAME}
               onChange={inputChangeHandler}
        />
        <Flex justifyContent="space-between">
          <Input type="text" 
                 name="SELLER" 
                 placeholder="Seller" 
                 value={formState.SELLER}
                 onChange={inputChangeHandler}
          />
          <Input type="number" 
                 name="PRICE" 
                 placeholder="Price" 
                 value={formState.PRICE}
                 onChange={inputChangeHandler}
          />
        </Flex>

      <Flex>
        <Button bg="#198754" color="#fff" onClick={createHandler}>Create</Button>
        <Button bg="#0d6efd" color="#fff" onClick={readHandler}>Read</Button>
        <Button bg="#ffc107" color="#000" onClick={updateHandler}>Update</Button>
        <Button bg="#dc3545" color="#fff" onClick={deleteAllHandler}>Delete All</Button>
      </Flex>

      <Table>
        <thead>
          <tr>
            {TableHeading.map((item, index) => <th key={index}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {indexDBData.map((item, index) => 
            <tr key={index}>
              <th>{item.ID}</th>
              <th>{item.NAME}</th>
              <th>{item.SELLER}</th>
              <th>{item.PRICE}</th>
              <th>
                <img src="/assets/edit.svg" 
                     alt="edit" 
                     width="25px" 
                     onClick={() => editHandler(item.ID)}/>
              </th>
              <th>
                <img src="/assets/delete.svg" 
                     alt="delete" 
                     width="20px" 
                     onClick={() => deleteHandler(item.ID)}/>
              </th>
            </tr>
          )}
        </tbody>
      </Table>
    </Main>
  );
}

export default App;
