import React, { useState,useEffect } from 'react';
import './PopupEdit.css';

function PopupEdit({ onClose, isPopupOpen,editingTask, onEditTask }) {
   const currentDateTime = new Date().toISOString(); 
   
   const [nameTask, setNameTask] = useState('');
   const [descriptionTask, setDescriptionTask] = useState('');
   const [deadline, setDeadline] = useState('');

   useEffect(() => {
      if (isPopupOpen && editingTask) {
         setNameTask(editingTask.nameTask || '');
         setDescriptionTask(editingTask.descriptionTask || '');
         setDeadline(editingTask.deadline || '');
      }
   }, [isPopupOpen,editingTask]);
   function handleChangeNameTask(e) {
      setNameTask(e.target.value);
   }
   function handleChangeDescription(e) {
      setDescriptionTask(e.target.value);
   }
   function handleChangeDeadline(e) {
      setDeadline(e.target.value.replace('T', ' '))
   }
   function handleSubmit(e) {
      e.preventDefault();
      onEditTask({
         nameTask,
         descriptionTask,
         deadline
      })
   }
   return (
      <section className={(isPopupOpen ? "popup popup_opened" : 'popup')}>
         <div className="popup__container">
            <button
               type="button"
               className='popup__button-close'
               onClick={onClose}
            ></button>
            <h2 className="popup__title">Редактирование задачи</h2>
            <form onSubmit={handleSubmit}  className="popup-form">
               <div className="form-group">
                  <label htmlFor="taskName" className="popup__label">
                     Название задачи
                  </label>
                  <input
                     type="text"
                     id="taskName"
                     className="popup__input"
                     placeholder="Введите название задачи"
                     value={nameTask}
                     onChange={handleChangeNameTask}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="taskDescription" className="popup__label">
                     Описание задачи
                  </label>
                  <textarea
                     id="taskDescription"
                     className="popup__textarea"
                     placeholder="Введите описание задачи"
                     value={descriptionTask}
                     onChange={handleChangeDescription}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="taskDate" className="popup__label">
                     Срок выполнения
                  </label>
                  <input
                     type="datetime-local"
                     id="taskDateTime"
                     className="popup__input"
                     min={currentDateTime} 
                     value={deadline}
                     onChange={handleChangeDeadline}
                  />
               </div>
               <button className="popup__submit">Сохранить</button>
            </form>
         </div>
      </section>
   );
}

export default PopupEdit;