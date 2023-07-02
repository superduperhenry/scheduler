import React from "react";

import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = (props) => {
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {props.time ? <Show /> : <Empty />}
    </article>
  );
};

export default Appointment;
