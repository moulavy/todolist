import React from 'react';
import './Sorting.css';

function Sorting() {
   return (
      <ul className="list-sort">
         <li className="list-sort__item list-sort__item-active list-sort__date-create">По дате создания</li>
         <li className="list-sort__item  list-sort__period">По сроку выполнения</li>
      </ul>
   );
}

export default Sorting;