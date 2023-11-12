import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import NewTask from '../NewTask/NewTask.js';
import Sorting from '../Sorting/Sorting.js';
import Tasks from '../Tasks/Tasks.js'
import PopupAdd from '../PopupAdd/PopupAdd';
import PopupEdit from '../PopupEdit/PopupEdit';

function App() {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [taskIdCounter, setTaskIdCounter] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  let isTasksRelevant = true;
  function handleAddTaskClick() {
    setIsAddPopupOpen(true);
  }

  function handleEditTaskClick(task) {
    setIsEditPopupOpen(true);
    setEditingTask(task);
  }

  function closePopups() {
    setIsAddPopupOpen(false);
    setIsEditPopupOpen(false);
    setEditingTask(null);
  }

  function handleAddTaskSubmit(data) {
    setTasks(prevTasks => {
      const newTask = { ...data, id: taskIdCounter };
      return [newTask, ...prevTasks];
    });
    setTaskIdCounter(prevCounter => prevCounter + 1);
    closePopups();
  }

  function handleEditTaskSubmit(updatedTask) {
    setTasks(prevTasks =>
    {
      const updatedTasks = prevTasks.map(task =>
      {
        if (task.id === editingTask.id)
        {  // используем id из editingTask для поиска
          return { ...task, ...updatedTask }; // обновляем задачу
        }
        return task;
      });
      return updatedTasks;
    });
    closePopups();
  }


  useEffect(() => {
    // загрузка задач из локального хранилища при монтировании компонента
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    // чтобы синхронизировать taskIdCounter с последним использованным идентификатором, найдем максимальный идентификатор в сохраненных задачах
    const maxId = storedTasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
    setTaskIdCounter(maxId + 1);
    isTasksRelevant = false;    
    setTasks(() => {
      isTasksRelevant = true;
      return storedTasks;
    });
  }, []);

  useEffect(() => {
    if (!isTasksRelevant) {
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <Header></Header>
      <NewTask onOpenAddPopup={handleAddTaskClick}></NewTask>
      <Sorting></Sorting>
      <Tasks onEditTask={handleEditTaskSubmit} tasks={tasks} onOpenEditPopup={handleEditTaskClick} ></Tasks>
      <PopupAdd onAddTask={handleAddTaskSubmit} onClose={closePopups} isPopupOpen={isAddPopupOpen}></PopupAdd>
      <PopupEdit editingTask={editingTask} onEditTask={handleEditTaskSubmit} onClose={closePopups} isPopupOpen={isEditPopupOpen}></PopupEdit>
    </div>
  );
}

export default App;
