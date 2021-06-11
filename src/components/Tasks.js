
import Task from './Task'

const Tasks = (props) => {
       return (
              <>
                     {props.tasks.length ==0? "No Task Assigned": props.tasks.map((item,index) =>
                            <div>
                                 <Task key={index} 
                                   task = {item} 
                                   onDelete={props.onDelete}
                                   onToggle={props.onToggle} />
                            </div>
                     )}
              </>
       )
}

export default Tasks
