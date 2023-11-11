import React from 'react';
import './Tasks.css';
import Task from '../Task/Task';

function Tasks({onOpenEditPopup}) {
   return (
      <ul class="tasks">
         <Task onOpenEditPopup={onOpenEditPopup}></Task>
        
      </ul>
   );
}

export default Tasks;