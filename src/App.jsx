import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(loadFromLocalStorage())

  const [inputValue, setInputValue] = useState("")
  const [editingIndex, setEditingIndex] = useState(null)
  const [editValue, setEditValue] = useState("")

  useEffect(() => {
    saveToLocalStorage(tasks)
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (inputValue) {
      setTasks([...tasks, { task: inputValue.trim(), completed: false }])
      setInputValue("")
    }
  }
  const handleDefault = () => {
    setTasks([
      { task: "Leetcode 1 hour", completed: false },
      { task: "Gym", completed: false },
      { task: "Personal Projects", completed: false }
    ])
  }


  const handleClear = () => {
    setTasks([])
  }

  const handleDelete = (indexToDelete) => {
    setTasks(tasks.filter((task, index) => index !== indexToDelete))
  }

  const handleEdit = (indexToEdit) => {
    setEditingIndex(indexToEdit)
    setEditValue(tasks[indexToEdit].task)
  }

  const saveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { task: editValue } : task
    )
    setTasks(updatedTasks)
    setEditingIndex(null)
  }

  const toggleCompleted = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) =>
      index === indexToToggle ?
        { ...task, completed: !task.completed }
        : task
    )
    setTasks(updatedTasks)
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h1>Tasks To Complete: {tasks.filter(task => !task.completed).length}</h1>
      <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Add Task</button>
      </form>


      {tasks.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd" }}>
          {editingIndex === index ? (
            <>
              <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
              <button onClick={() => saveEdit(index)}>Save</button>
              <button onClick={() => setEditingIndex(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{
                textDecoration: item.completed ? "line-through" : "none",
                color: item.completed ? "gray" : "black"
              }}>{item.task}</span>

              <button onClick={() => handleEdit(index)} style={{ margin: "0 5px" }}>Edit</button>
              <button style={{ backgroundColor: "red", color: "white", margin: "0 5px" }} onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => toggleCompleted(index)} style={{ margin: "0 5px" }}>{item.completed ? "Undo" : "Done"}</button>
            </>

          )}

        </div>

      ))}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleClear} style={{ marginRight: "10px", padding: "8px 16px" }}>Clear</button>
        <button onClick={handleDefault} style={{ padding: "8px 16px" }}>Set Default</button>
      </div>
    </div>
  )
}

export default App

function loadFromLocalStorage() {
  const saved = localStorage.getItem('todoTasks')
  return saved ? JSON.parse(saved) : [
    { task: "Leetcode 1 hour", completed: false },
    { task: "Gym", completed: false },
    { task: "Personal Projects", completed: false }
  ]
}

function saveToLocalStorage(tasks) {
  localStorage.setItem('todoTasks', JSON.stringify(tasks))
}
