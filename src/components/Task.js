import { FaTimes } from 'react-icons/fa';



const Task = (props) => {

      return (
                     <div className={`task ${props.task.reminder ? 'reminder':''}`} 
                     onDoubleClick={()=> props.onToggle(props.task.id)}>
                     <h3 className="task-content">{props.task.text} {' '}
                            <FaTimes style={{ color:"red"}} onClick = {() =>(
                                   props.onDelete(props.task.id)
                            )}/>
                     </h3>  
                     
              </div> 
       ) 
} 
                             
export default Task 
