import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";
function Cal() {
  const [date, setdate] = useState(new Date());
  return (
    <>
      <Calendar onChange={(e) => setdate(e)} value={date}/>
      <p>{date.toISOString()}</p>
    </>
  );
}
export default Cal;
