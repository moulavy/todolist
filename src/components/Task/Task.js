import React from 'react';
import './Task.css';

function Task({task,onOpenEditPopup}) {
   const [isChecked, setIsChecked] = React.useState(false);

   const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
   };
   const handleEditButtonClick = () => {
      onOpenEditPopup(task);
   };
   return (
      <li className={`task ${isChecked ? 'checked' : ''}`}>
         <div className="task__buttons">
            <button className="task__button task__button-delete"><img src={require('../../images/delete-button.svg').default}
               className='task__button-img task__button-delete-img' /></button>
            <button onClick={handleEditButtonClick} className="task__button task__button-edit"><img src={require('../../images/edit-button.svg').default}
               className='task__button-img task__button-edit-img' /></button>
         </div>
         <div className="task__text">
            <h2 className="task__title">{task.nameTask}</h2>
            <p className="task__description">{ task.descriptionTask}</p>
         </div>
         <div className="task__date">
            <div className="task__date-create">
               <p className="task__date-title">Дата создания</p>
               <p className="task__date-value">{ task.dateCreated}</p>
            </div>
            <div className="task__period-date">
               <p className="task__period-title">Срок выполнения</p>
               <p className="task__period-value">{task.deadline.replace(/-/g, '.')}</p>
            </div>
         </div>
         <div className="task__complite">
            <input className='task__checkbox'
               type="checkbox"
               checked={isChecked}
               onChange={handleCheckboxChange}
            />

         </div>
      </li>
   );
}

export default Task;