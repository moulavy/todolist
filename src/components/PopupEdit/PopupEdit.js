import React, { useState } from 'react';
import './PopupEdit.css';

function PopupEdit({ onClose, isPopupOpen }) {
   const currentDateTime = new Date().toISOString().split('T')[0];

   return (
      <section className={(isPopupOpen ? "popup popup_opened" : 'popup')}>
         <div className="popup__container">
            <button
               type="button"
               className='popup__button-close'
               onClick={onClose}
            ></button>
            <h2 className="popup__title">Редактирование задачи</h2>
            <form className="popup-form">
               <div className="form-group">
                  <label htmlFor="taskName" className="popup__label">
                     Название задачи
                  </label>
                  <input
                     type="text"
                     id="taskName"
                     className="popup__input"
                     placeholder="Введите название задачи"
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
                     min={currentDateTime} // Устанавливаем минимальную дату и время
                  />
               </div>
               <button className="popup__submit">Сохранить</button>
            </form>
         </div>
      </section>
   );
}

export default PopupEdit;