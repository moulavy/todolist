import React, { useState } from 'react';
import './Sorting.css';

function Sorting({ onSortDeadline, onSortDate }) {
   const [isDate, setIsDate] = useState(true);
   function sortDate() {
      setIsDate(true);
      onSortDate();
   }
   function sortDeadline() {
      setIsDate(false);
      onSortDeadline();
   }
   return (
      <ul className="list-sort">
         <li onClick={sortDate} className={(isDate ? "list-sort__item list-sort__item-active list-sort__date-create" : "list-sort__item list-sort__date-create")}>По дате создания</li>
         <li onClick={sortDeadline} className={(isDate ? "list-sort__item  list-sort__period" : "list-sort__item list-sort__item-active  list-sort__period")} >По сроку выполнения</li>
      </ul>
   );
}

export default Sorting;