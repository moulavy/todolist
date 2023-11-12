import React, { useState } from 'react';
import './Sorting.css';

function Sorting({isSortDate, onSortDeadline, onSortDate }) {
   
   function sortDate() {      
      onSortDate();
   }
   function sortDeadline() {      
      onSortDeadline();
   }
   return (
      <ul className="list-sort">
         <li onClick={sortDate} className={(isSortDate ? "list-sort__item list-sort__item-active list-sort__date-create" : "list-sort__item list-sort__date-create")}>По дате создания</li>
         <li onClick={sortDeadline} className={(isSortDate ? "list-sort__item  list-sort__period" : "list-sort__item list-sort__item-active  list-sort__period")} >По сроку выполнения</li>
      </ul>
   );
}

export default Sorting;