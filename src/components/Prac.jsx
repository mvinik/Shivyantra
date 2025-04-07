import { useState } from "react"

function Prac(){
    const [open ,setOpen]=useState(false)
    const handleopen=()=>{
    setOpen(!open)
    }
    return(<>
    <h1 className="text-center">Button</h1>
    <button onClick={()=>{setOpen(!open)}}>{open?"close":"open"}</button>
   <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}>
   <div>
        <h1>Items</h1>
         <ul>
        <li>Apple</li>
         <li>Orange</li>
         <li>Mango</li>
         </ul>
      
    </div>
   </aside>
 {open && <div className="overlay-" onClick={handleopen}></div>}
    </>)
}
export default Prac