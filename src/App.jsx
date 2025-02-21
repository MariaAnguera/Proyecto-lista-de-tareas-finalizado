import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(true); 
 

  const cambioInput = (event) => {
    setNewTask(event.target.value);
  };

  const nuevaTarea = () => {
    const tareaExistente = tasks.find(task => task.text === newTask.trim());
  
    if (tareaExistente) {
      alert('¡La tarea ya existe en la lista!');
    }
  
    if (newTask.trim() !== '') { 
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false, count: 1 }]);
      setNewTask('');
    }
  };
  

  const tareaCompletada = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  

  const visualizarTareaCompletada = () => {
    setShowCompleted(!showCompleted);
  };
  const sumarCantidades = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, count: task.count + 1 } : task
      )
    );
  };

  
  const restarCantidades = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedCount = task.count - 1;
          if (updatedCount <= 0) {
            return null; 
          } else {
            return { ...task, count: updatedCount };
          }
        } else {
          return task;
        }
      }).filter(task => task !== null) // Filtrar las tareas nulas (eliminadas)
    );
  };


  

  return (
    <div className="container mt-5"> 
      <h1 className="mb-4">¿Qué necesitamos hoy?</h1> 
      <div className="tasks-container">
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control me-2" 
            placeholder="Añadir a la lista de la compra"
            value={newTask}
            onChange={cambioInput}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                nuevaTarea();
              }
            }}
          />
          <button className="btn btn-primary" onClick={nuevaTarea}>Añadir</button>
        </div>
  
        <ul className="list-group">
          {tasks.map((task) => (
            (showCompleted || !task.completed) && // Mostrar solo si showCompleted es verdadero o la tarea no está completada
            <li key={task.id} className={`list-group-item d-flex align-items-center ${task.completed ? 'list-group-item-success' : ''}`}>
              <span style={{ cursor: 'pointer' }} onClick={() => tareaCompletada(task.id)}>{task.text}</span>
              <div className="ms-auto">
                <button className="btn btn-secondary btn-sm me-2" onClick={() => restarCantidades(task.id)}>-</button>
                <span>{task.count}</span>
                <button className="btn btn-secondary btn-sm ms-2" onClick={() => sumarCantidades(task.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
  
        {tasks.length > 0 && (
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary " style={{background: '#0B5ED7', border:'none' }} onClick={visualizarTareaCompletada}>
              {showCompleted ? 'Sin comprar' : 'Todo'}
            </button>
            <div>
              <button className="btn btn-danger " onClick={() => setTasks([])}>Borrar lista</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  


export default App;
