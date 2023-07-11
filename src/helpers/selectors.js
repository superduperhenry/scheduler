export function selectUserByName(state, name) {
  const filteredNames = state.users.filter((user) => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;

  //check if day is found in state
  const filteredDay = days.filter((d) => d.name === day);

  //check to see if such a day exist, if not return empty array
  if (filteredDay.length === 0) {
    return [];
  }
  //if day exist, return appointments for that day
  const appointmentsForTheDay = filteredDay[0].appointments.map(
    (appointmentID) => appointments[appointmentID]
  );
  return appointmentsForTheDay;
}

export function getInterview(state, interview) {
  const { interviewers } = state;
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer;
  const interviewer = interviewers[interviewerID];
  const newInterview = { ...interview, interviewer };
  return newInterview;
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  //check if day is found in state
  const filteredDay = days.filter((d) => d.name === day);
  //check to see if such a day exist, if not return empty array
  if (filteredDay.length === 0) {
    return [];
  }
  //if day exist, return interviewers for that day
  const interviewersForTheDay = filteredDay[0].interviewers.map(
    (interviewerID) => {
      return interviewers[interviewerID];
    }
  );
  return interviewersForTheDay;
}
