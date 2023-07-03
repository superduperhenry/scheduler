import React from "react";

import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

const Appointment = (props) => {
  console.log(props, `appointment props`);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name, //name of student
      interviewer, // id of interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW)); //passed from application level
    console.log(interview);
  };

  const deleteInterview = (id) => {
    const interview = null;
    props.cancelInterview(props.id, interview);
    transition(EMPTY);
  };

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => console.log("test")}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={[]} onCancel={() => back()} onSave={save} />
      )}

      {mode === SAVING && <Status message="SAVING..." />}
      {mode === DELETE && <Status message="DELETING..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}
    </article>
  );
};

export default Appointment;
