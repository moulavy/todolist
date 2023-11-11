import React, { useState, useEffect } from 'react';
import './NewTask.css';

function NewTask({onOpenAddPopup}) {
   return (
      <div class="new-task">
         <button onClick={onOpenAddPopup} className="new-task__button">Добавить новую задачу</button>
      </div>
   );
}

export default NewTask;