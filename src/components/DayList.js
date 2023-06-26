import React from "react";

import DayListItem from "./DayListItem";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const DayList = (props) => {
  return (
    <ul>
      {days.map((day) => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.value}
            setDay={props.onChange}
          />
        );
      })}
    </ul>
  );
};

export default DayList;
