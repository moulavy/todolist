import React,{useEffect,useState,useRef} from 'react';
import './Task.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Task({ task, onOpenEditPopup, onDeleteTask, onToggleComlete }) {
   const notificationShownRef = useRef(false);
   const handleCheckboxChange = () => {
      onToggleComlete(task.isComplete,task)
   };
   const handleEditButtonClick = () => {
      onOpenEditPopup(task);
   };
   const handleDeleteButtonClick = () => {
      onDeleteTask(task);
   }
   useEffect(() => {
      const deadlineTime = new Date(task.deadline).getTime();
      const currentTime = new Date().getTime();
      const timeDiff = deadlineTime - currentTime;
      if (!notificationShownRef.current && timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000) {
         toast.warning(`Дедлайн задачи "${task.nameTask}" менее, чем через 24 часа.`);
         notificationShownRef.current = true;
      }
   }, [task]);
   
   return (
      <li className={`task ${task.isComplete ? 'checked' : ''}`}>
         <div className="task__buttons">
            <button onClick={handleDeleteButtonClick} className="task__button task__button-delete"><img src={require('../../images/delete-button.svg').default}
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
               <p className="task__date-value">{ task.formattedDateTime}</p>
            </div>
            <div className="task__period-date">
               <p className="task__period-title">Срок выполнения</p>
               <p className="task__period-value">{task.deadline.replace(/-/g, '.')}</p>
            </div>
         </div>
         <div className="task__complite">
            <input className='task__checkbox'
               type="checkbox"
               checked={task.isComplete}
               onChange={handleCheckboxChange}
            />

         </div>
      </li>
   );
}

export default Task;