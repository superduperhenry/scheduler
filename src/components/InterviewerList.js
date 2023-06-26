import React, { useState } from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
];

const InterviewerList = (props) => {
  const [selected, setSelected] = useState(props.interviewer);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewer) => {
          const { id, name, avatar } = interviewer;
          return (
            <InterviewerListItem
              key={id}
              name={name}
              avatar={avatar}
              selected={interviewer.id === props.interviewer}
              setInterviewer={() => props.setInterviewer(interviewer.id)}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default InterviewerList;
