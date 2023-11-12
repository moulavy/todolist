import React from 'react';
import './Tasks.css';
import Task from '../Task/Task';

function Tasks({onToggleComlete,tasks,onOpenEditPopup,onDeleteTask}) {
   return (
      <ul class="tasks">
         {tasks.map((task) => (
            <Task
               task={task}
               key={task.id}
               onOpenEditPopup={onOpenEditPopup}
               onDeleteTask={onDeleteTask}
               onToggleComlete={onToggleComlete}
            ></Task>
         )
         )}
         
        
      </ul>
   );
}

export default Tasks;