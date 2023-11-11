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
  const [tasks, setTasks] = useState([]);
  function handleAddTaskClick() {
    setIsAddPopupOpen(true);
  }
  function handleEditTaskClick() {
    setIsEditPopupOpen(true);
  }
  function closePopups() {
    setIsAddPopupOpen(false);
    setIsEditPopupOpen(false);
  }
  function handleAddTaskSubmit(data) {
    setTasks([data, ...tasks]);
    closePopups();
    console.log(tasks);
  }
  return (
    <div className="app">
      <Header></Header>
      <NewTask onOpenAddPopup={handleAddTaskClick}></NewTask>
      <Sorting></Sorting>
      <Tasks onOpenEditPopup={handleEditTaskClick} ></Tasks>
      <PopupAdd onAddTask={handleAddTaskSubmit} onClose={closePopups} isPopupOpen={isAddPopupOpen}></PopupAdd>
      <PopupEdit onClose={closePopups} isPopupOpen={isEditPopupOpen}></PopupEdit>
    </div>
  );
}

export default App;
