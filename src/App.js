import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer'
import About from './components/About';


function App() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() =>{
    const getTask = async() => {
      const taskfromServer =  await fetchTasks()
      console.log(taskfromServer)
      setTasks(taskfromServer)
    }
    getTask()
  },[])


  const fetchTasks = async()=>{
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()
    return data
  }
  
  const fetchTask = async(id)=>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    // console.log(data)
    return data
  }
  
  
  const addTask = async (task) =>{
  const res = await fetch("http://localhost:5000/tasks",
    {method:'POST',
    headers:{
      'Content-type' : 'application/json'
    },
    body:JSON.stringify(task)
    }  )

    const data = await res.json();
    setTasks([...tasks, data])

  
  // const id = Math.floor(Math.random()*1000)+1;
  // const newTask = {id, ...task};
  // console.log(newTask)
  // setTasks([newTask, ...tasks]);
  // console.log(tasks)

}
const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE'})
  setTasks(tasks.filter((tasks) => tasks.id !== id));
}

const toggleReminder = async (id) =>{
  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder};

  const res = await fetch(`http://localhost:5000/tasks/${id}`,
                           {method:'PUT',
                          headers:{
                            'Content-type':'application/json'
                          },
                          body: JSON.stringify(updateTask)})

        const data = await res.json();
  setTasks(tasks.map((task) => task.id ===id
  ? {...task, reminder:data.reminder}:
  task))
}

  return (
    <Router>
      <div className="App">
          <Header tit="Amit" onAdd={()=> setShow(!show)} show={show}/>
         
          <Route path='/' exact render={()=>
          (
            <>
               { show && <AddTask onAdd = {addTask}/>}
               <Tasks  tasks= {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>
            </>
          )}/>
          <Route path='/About' component={About} />
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
