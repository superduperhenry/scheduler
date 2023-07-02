import React from "react";

import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = (props) => {
  const { student, interview } = props;
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {props.interview ? (
        <Show student={student} interview={interview} />
      ) : (
        <Empty />
      )}
    </article>
  );
};

export default Appointment;
