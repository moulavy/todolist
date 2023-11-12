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
  const [selectedTask, setSelectedTask] = useState(null);
  let isTasksRelevant = true;
  function handleAddTaskClick() {
    setIsAddPopupOpen(true);
  }

  function handleEditTaskClick(task) {
    setIsEditPopupOpen(true);
    setSelectedTask(task);
  }

  function closePopups() {
    setIsAddPopupOpen(false);
    setIsEditPopupOpen(false);
    setSelectedTask(null);
  }

  function handleAddTaskSubmit(data) {
    const currentDateTime = new Date();

    // получаем компоненты времени
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');

    // собираем строку с датой и временем
    const formattedDateTime = `${year}.${month}.${day} ${hours}:${minutes}`;

    setTasks(prevTasks => {
      const newTask = {
        ...data,
        id: taskIdCounter,
        formattedDateTime: formattedDateTime,
      };
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
        if (task.id === selectedTask.id)
        {  // используем id из selectedTask для поиска
          return { ...task, ...updatedTask }; // обновляем задачу
        }
        return task;
      });
      return updatedTasks;
    });
    closePopups();
  }
 
  function handleDeleteTaskSubmit(deletedTask) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTask.id));
  }
  function handleSortDeadline() {
    setTasks(prevTasks => {
      const sortedTasks = [...prevTasks].sort((a, b) => {
        return new Date(a.deadline) - new Date(b.deadline);
      });
      return sortedTasks;
    });
  }

 
  function handleSortDate() {
    setTasks(prevTasks => {
      const sortedTasks = [...prevTasks].sort((a, b) => {
        return new Date(a.formattedDateTime) - new Date(b.formattedDateTime);
      });
      return sortedTasks;
    });
  }

  useEffect(() => {
    // загрузка задач из локального хранилища при монтировании компонента
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
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
      <Sorting onSortDeadline={handleSortDeadline} onSortDate={handleSortDate}></Sorting>
      <Tasks onDeleteTask={handleDeleteTaskSubmit} tasks={tasks} onOpenEditPopup={handleEditTaskClick} ></Tasks>
      <PopupAdd onAddTask={handleAddTaskSubmit} onClose={closePopups} isPopupOpen={isAddPopupOpen}></PopupAdd>
      <PopupEdit editingTask={selectedTask} onEditTask={handleEditTaskSubmit} onClose={closePopups} isPopupOpen={isEditPopupOpen}></PopupEdit>
    </div>
  );
}

export default App;
