export function selectUserByName(state, name) {
  const filteredNames = state.users.filter((user) => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;

  //check if day is found in state
  const filteredDay = days.filter((d) => d.name === day);
  console.log(filteredDay);
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
