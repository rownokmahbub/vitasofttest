import { Link } from "react-router-dom"
import { BsMenuButtonWideFill } from "react-icons/bs";
import { useState } from "react";

export default function Navbar() {
    const [toggle,setToggle]= useState(false)
    const handleToggle=()=>{
        setToggle(!toggle)
    }
    const navbar=[
        {
            label:'Todo App',
            to:'/'
        },
       

    ]
  return (
    <div className="relative flex justify-between items-center container mx-auto">
       <Link to='/'>
        <img className="h-14" src="https://vitasoftserver.vitasoftsolutions.com/upload/upload/Vitasoft_Logo_Draft_1.0-02.png" alt="logo" />
       </Link>
        <div className="flex items-center gap-5">
            {navbar.map((nav)=>(
                <Link className="hidden md:block" to={nav.to} key={nav.label}>
                    {nav.label}
                </Link>
            ))}
            <BsMenuButtonWideFill onClick={handleToggle} className="text-xl block md:hidden"/>
            {toggle &&   <div className="flex bg-white w-full transition duration-500 py-5 absolute right-0 top-6 flex-col items-center gap-5 md:hidden">
            {navbar.map((nav)=>(
                <Link to={nav.to} key={nav.label}>
                    {nav.label}
                </Link>
            ))}                                   
            </div>}
          
        </div>
    </div>
  )
}
