import BackLog from "./BackLog";
import Complete from "./Complete";
import Doing from "./Doing";
import Todos from "./Todos";

export default function Home() {
  
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4  gap-5 md:h-screen ">
       <BackLog/>
      <Todos/>
      <Doing/>
      <Complete/>
      
    </div>
  )
}
