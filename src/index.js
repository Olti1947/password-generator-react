import $ from "jquery"
import React from 'react'
import ReactDOM  from 'react-dom'
import "./style.css"
import refresh from "./refresh.png"
import logo from "./logo.gif"
import {createRoot} from 'react-dom/client';
const root = createRoot(document.getElementById("root"))



function App(){
  let [copyValue, setCopyValue] = React.useState("Copy")  

  let [rangeValue, setRangeValue] = React.useState(10)
    const handleChange = event => {
     setRangeValue(event.target.value);
   
   };

let [checkboxValue1, setCheckBox1] = React.useState(false)
let [checkboxValue2, setCheckBox2] = React.useState(false)
let [checkboxValue3, setCheckBox3] = React.useState(false)
let [checkboxValue4, setCheckBox4] = React.useState(false)
  let passwordLength = rangeValue;
  let alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'];
  let alphabetLower = [];
  for (let i = 0; i < alphabetUpper.length; i++) {
    alphabetLower.push(alphabetUpper[i].toLowerCase());
  }
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+"];
  let [values, setCheckValues] = React.useState([ {
    1: false,
    key: alphabetUpper
  },
  {
    2: false,
    key: alphabetLower
  },
  {
    3:false,
    key: numbers
  },
  {
    4:false,
    key: specialChars
  }])
  function checkedChange(event){
    setCheckBox1(event.target.checked)
    setCheckValues(prev=>{ return [...prev, prev[0][1] = event.target.checked]})
}
function checkedChange2(event){
    setCheckBox2(event.target.checked)
    setCheckValues(prev=>{ return [...prev, prev[1][2] = event.target.checked]})
}
function checkedChange3(event){
    setCheckBox3(event.target.checked)
    setCheckValues(prev=>{ return [...prev, prev[2][3] = event.target.checked]})
  }
function checkedChange4(event){
    setCheckBox4(event.target.checked)
    setCheckValues(prev=>{ return [...prev, prev[3][4] = event.target.checked]})
}



    let dec = [];
  for (let i = 0; i < values.length; i++) {
    values[i][i + 1] === true ? dec.push(values[i].key) : dec.push();
  }
  let finalArray = dec.flat()


  if(dec.length == 0){
  setCheckValues(prev => {return [...prev, prev[1][2] = true]})
  $("#lower").prop( "checked", true );
  }
  // if(dec.length == 0){
   
  // }

    let passwordArray = [];
  for (let i = 0; passwordArray.length < passwordLength; i++) {
    let choice = Math.floor(Math.random() * finalArray.length + 1);
    let j = finalArray[choice];
      passwordArray.push(j);
    }
    let password = passwordArray.join("")
    let [inputValue, setValue] = React.useState()
    function inputChange(){
      setValue(password)
    }
    function typing(event){
      setValue(event.target.value)
    }
    let [strength, setStrength] = React.useState("")
   let strongRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    React.useEffect(()=>{
      if(password.length < 8){
        setStrength("Too short")
       $("#determinator").addClass("short")
      }
      else if(dec.length == 1 || dec.length == 2 && password != ""){
        setStrength("Weak")
         $("#determinator").addClass("weak")
       }
    
      else if(dec.length == 3){
 setStrength("Medium")
  $("#determinator").addClass("medium")
}

 else if(strongRegex.test(password)){
  setStrength("Strong")
 $("#determinator").addClass("strong")
 }
 else if(dec.length == 0 ){
  setStrength("")
 }
    },[inputValue])

    function copyFunction() {
      // Get the text field
      let copyText = document.getElementById("password");
      navigator.clipboard.writeText(copyText.value);
      setCopyValue("Copied")
      setTimeout(() => {
        setCopyValue("Copy");
      }, 1000);

  
    }

   
   
    return(
        <div className='container'>

<img src={logo} className="logo"></img>
    <h1 className='title'>PASSWORD GENERATOR</h1>
    <p className='desc'>Create strong and secure passwords to keep your account safe online.</p>
    <div className='input-field'>

        <div className='pass-show'><div><input onChange={typing} id="password" className='the-pass' type='text' value={inputValue} defaultValue={password} name='pass-holder'></input><img onClick={inputChange} className='refresh-icon' src={refresh}></img></div><button type='button' onClick = {copyFunction}>{copyValue}</button>
            <label id="determinator" className='strength' htmlFor="pass-holder">{strength}</label>
            </div>
        <div className='slidecontainer'>
    <input onChange={handleChange} className='slider' type='range' min="5" max="30" name="range" defaultValue= {10}></input>
    </div>
    <p className='length'>Password Length : {rangeValue}</p>
       <div className='checkboxes'>
        {/* <span>Uppercase</span>  */}
        <div className='checkbox checkbox-1'><label htmlFor = "uppercase">Uppercase</label>
        <input name='uppercase' type='checkbox' onChange={checkedChange}></input>
        </div>
        <div className='checkbox checkbox-2'><label htmlFor = "lowercase">Lowercase</label>
        <input name='lowercase' type='checkbox' onChange={checkedChange2} id='lower' defaultChecked={true} value= {true}></input>
        </div>
        <div className='checkbox checkbox-3'><label htmlFor = "numbers">Numbers</label>
        <input name='numbers' type='checkbox' onChange={checkedChange3}></input>
        </div>
        <div className='checkbox checkbox-4'><label htmlFor = "special-chars">Special Characters</label>
        <input name='special-chars' type='checkbox' onChange={checkedChange4}></input>
        </div>
       </div>
     </div>
        </div>
    )
}



root.render(<App />)