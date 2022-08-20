import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  const [inputVal, setInputVal] = useState("");
  const [Value, setValue] = useState([]);

  const addData = () => {

    if (!inputVal) {
      alert("please enter some value")
    }
    else {
      setValue([...Value, inputVal]);
      setInputVal("")
    }
  }
  const deleteData = (id) =>{
    const filtered = Value.filter((ele,ind) => {
      return ind !== id;

    });
    setValue(filtered)
  }
  return (
    <>
      <div className="App">
        <h1>Todo App</h1>
        <input
          type="text"
          name="todo"
          value={inputVal}
          onChange={(e) => { setInputVal(e.target.value) }}

        />
        <button onClick={addData}>Submit</button>
      </div>
      <div className='showData'>
        <ul>
          {
            Value.map((val, ind) => {
              return (
                <>
                  <li key={ind}>{val}   <button style={{marginLeft:"40px"}} onClick={()=>deleteData(ind)}>Delete</button></li>
                
                </>)
            })
          }
        </ul>
      </div>
    </>
  );
}

export default App;
