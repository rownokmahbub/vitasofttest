import { useEffect, useState } from "react"
import CreateTodo from "./CreateTodo"

export default function Todos() {
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
    <div className="container mx-auto flex flex-col gap-5 mt-5">
    <div className="flex justify-between items-center bg-white rounded-lg border-l-4 border-cyan-500 px-4 py-2.5">
    <div className="flex items-center gap-2">
    <h3 className="text-base font-semibold">Todos</h3>
    <p className="text-sm text-slate-400">4</p>
    
    </div>
       
   <CreateTodo/>
    </div>
    <div className="flex flex-col gap-3">
        {users && users.map((user)=>(
            <div key={user.id} className="flex flex-col bg-white rounded-lg  px-4 py-2.5">
    <div className="flex justify-between items-start gap-3 mb-3">
    <h3 className="text-base font-semibold text-start">{user.task}</h3>
    <p className="text-sm text-slate-400 ">{user.priority}</p>
    
    </div>
       
    <div className="flex justify-between items-start gap-2">
    <h3 className="text-xs text-start">assigned to</h3>
    <p className="text-sm text-slate-400 line-clamp-1">{user.assigned_to}</p>
    
    </div>
    <div className="flex justify-between items-start gap-2">
    <h3 className="text-xs text-start">assignee</h3>
    <p className="text-sm text-slate-400 line-clamp-1">{user.assignee}</p>
    
    </div>
    </div>
        ))}
    </div>
    
    </div>
 
  )
}
