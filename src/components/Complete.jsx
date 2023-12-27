import { useEffect, useState } from "react"

import CreateTodo from './CreateTodo'

import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";
export default function Complete() {
    const [users,setUsers]= useState([])
    useEffect(() => {
        const fetchData = async()=>{
      try {
        
            const res= await fetch('https://tasks.vitasoftsolutions.com/tasks')
            if(!res.ok){
                throw new Error('network problem found')
            }
            const user=await res.json()
            setUsers(user.tasks)
          
        
      } catch (error) {
        console.log('no data found');
      }
    }
      fetchData()
    }, [])
   
  return (
    <div className="container mx-auto flex flex-col gap-5 mt-5 bg-slate-100 px-4 py-4 rounded-xl border">
   <div className="flex justify-between items-center bg-white border rounded-lg border-l-4 border-green-500 px-4 py-2.5">
    <div className="flex items-center gap-2">
    <h3 className="text-base font-semibold">Complete</h3>
    <p className="text-sm text-slate-400">4</p>
    
    </div>
       
     <CreateTodo/>
      

    </div>
   <div className="flex flex-col gap-3">
        {users && users.map((user)=>(
            <div key={user.id} className="flex flex-col bg-white border rounded-lg  px-4 py-2.5">
         
    <div className="flex justify-between items-start gap-3 mb-2">
    <h3 className="text-base font-semibold text-start">{user.task}</h3>
  
    
    </div>

    <div className="flex justify-between items-start gap-2">
    <h3 className="text-xs text-start">assigned to</h3>
    <p className="text-sm text-slate-400 line-clamp-1">{user.assigned_to}</p>
    
    </div>
 
   
    <div className="flex justify-between items-start gap-2">
    <h3 className="text-xs text-start">assignee</h3>
    <p className="text-sm text-slate-400 line-clamp-1">{user.assignee}</p>
    
    </div>
    <div className="flex justify-between items-center gap-2 border-t mt-4 pt-1">
    <p className="text-xs bg-cyan-600 rounded-full text-white px-2 py-1">{user.priority}</p>
   
    <div className="flex  items-center">
<EditTodo/>
   
<DeleteTodo/>
    </div>
    </div>
    </div>
        ))}
    </div>
    
    </div>
 
  )
}
