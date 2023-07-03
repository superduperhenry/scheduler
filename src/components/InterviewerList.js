import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      {props.interviewers && (
        <ul className="interviewers__list">
          {props.interviewers.map((interviewer) => {
            return (
              <InterviewerListItem
                key={interviewer.id}
                name={interviewer.name}
                avatar={interviewer.avatar}
                selected={interviewer.id === props.value}
                setInterviewer={() => props.onChange(interviewer.id)}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default InterviewerList;
