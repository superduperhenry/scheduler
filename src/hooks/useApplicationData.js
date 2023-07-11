import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });
  const setDay = (day) => {
    setState({ ...state, day: day });
  };

  const updateNumOfOpenSpots = (days, id, incrementBy) => {
    //find the day that contains the appointment
    const dayContainingAppt = days.find((day) => day.appointments.includes(id));

    //create a new day object with the updated spots
    const newDay = {
      ...dayContainingAppt,
      spots: dayContainingAppt.spots + incrementBy,
    };

    //create a new days array with the updated day object
    const newDays = [...days];

    //replace the old day object with the new one
    newDays.splice(dayContainingAppt.id - 1, 1, newDay);

    //update the state with the new days array
    setState((prev) => ({
      ...prev,
      days: [...newDays],
    }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },

      // shape of interview object
      // const interview = {
      //   student: name, //name of student
      //   interviewer, // id of interviewer
      // };
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState((state) => {
          return {
            ...state,
            appointments: appointments,
          };
        });
        updateNumOfOpenSpots(state.days, id, -1);
      });
  };

  const editInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState((state) => {
          return {
            ...state,
            appointments: appointments,
          };
        });
        updateNumOfOpenSpots(state.days, id, 0);
      });
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        updateNumOfOpenSpots(state.days, id, 1);
      });
  };

  return { state, setDay, bookInterview, cancelInterview, editInterview };
};

export default useApplicationData;
