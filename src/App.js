import React, { useEffect, useState } from 'react'

const App = () => {
  // Data from local storage 
  const DataLocal = () => {
    const data = localStorage.getItem("list");
    
    if (data) {
      return JSON.parse(localStorage.getItem("list"));
    }
    else {
      return []
    }
  }
  const [inputVal, setInputVal] = useState('');
  const [inputArr, setInputArr] = useState(DataLocal());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);


  // For local Storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(inputArr));
  }, [inputArr])


  //  add  items  
  const addItems = () => {
    if (!inputVal) {
      alert("please give some Data");
    }
    else if(inputVal && !toggleBtn){
      setInputArr(
        inputArr.map((val)=>{
          if(val.id == isEditItem ){
            return {...val , name:inputVal}
          }
          return val;   
        })     
      )
      setToggleBtn(true)
      setInputVal("")
      setIsEditItem(null)
    }
    else {
      const allInputdata = { id: new Date().getTime().toString(), name: inputVal }
    
      setInputArr([...inputArr, allInputdata]);
      setInputVal("");

    }
  }
  //  delete Item 
  const DeleteItem = (id) => {
    const newArr = inputArr.filter((val) => {
      return id !== val.id
    });
    setInputArr(newArr)
  }
  //  deleteAll   
  const deleteAll = () => {
    return setInputArr([])
  }
  // EditItem
  const EditItem = (id) => {
    const newEditItem = inputArr.find((val) => {
      return val.id === id
    });
    setToggleBtn(false)
    setInputVal(newEditItem.name)
    setIsEditItem(id)

  }
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        Todo App <br />
        <input
          type="text"
          value={inputVal}
          onChange={(e) => { setInputVal(e.target.value) }}

        />
        {
          toggleBtn ? <button onClick={addItems}>Submit</button> : <button onClick={addItems}>Edit Now</button>
        }

      </div>
      <div>
        <ul>
          {
            inputArr.map((val) => {
             
              return (<>
                <li key={val.id}>{val.name} <button onClick={() => DeleteItem(val.id)}>Delete</button><button onClick={() => EditItem(val.id)}>Edit</button></li>
              </>)
            })
          }
          <button style={{ textAlign: "center", width: "50%", marginTop: "10px" }} onClick={deleteAll}>Delete all</button>

        </ul>
      </div>
    </div>
  )
}

export default App
