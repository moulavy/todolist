import React from 'react';
import './Tasks.css';
import Task from '../Task/Task';

function Tasks({tasks,onOpenEditPopup,onDeleteTask}) {
   return (
      <ul class="tasks">
         {tasks.map((task) => (
            <Task
               task={task}
               key={task.id}
               onOpenEditPopup={onOpenEditPopup}
               onDeleteTask={onDeleteTask}
            ></Task>
         )
         )}
         
        
      </ul>
   );
}

export default Tasks;