export const SET_APPOINTMENTS = 'SET_APPOINTMENTS';

export default
(
  state = {
    asTutor: [],
    asLearner: [],
  },
  {
    appointment:
      {
        asTutor,
        asLearner,
      },
    type,
  }
) => {
  switch (type) {
    case SET_APPOINTMENTS:
      return { ...state, asTutor: [...asTutor], asLearner: [...asLearner] };

    default:
      return state;
  }
};
