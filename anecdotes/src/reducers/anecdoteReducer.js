import anecdoteService from "../services/anecdotes";

export const setAnecdotes = (anecdotes) => {
  return {
    type: "anecdotes/setAnecdotes",
    data: anecdotes,
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    anecdotes.sort((a, b) => b.votes - a.votes);
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteTo = (anecdote) => {
  return {
    type: "anecdotes/vote",
    data: anecdote,
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const response = await anecdoteService.modify({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(voteTo(response));
  };
};

export const createNew = (anecdote) => {
  return {
    type: "anecdotes/new",
    data: anecdote,
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(createNew(anecdote));
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "anecdotes/vote": {
      return state
        .map((anc) => {
          if (anc.id === action.data.id) {
            return action.data;
          } else {
            return { ...anc };
          }
        })
        .sort((a, b) => {
          return b.votes - a.votes;
        });
    }
    case "anecdotes/new": {
      const newState = state.map((anc) => {
        return { ...anc };
      });
      newState.push(action.data);
      return newState;
    }

    case "anecdotes/setAnecdotes": {
      return action.data;
    }
    default:
      return state;
  }
};

export default reducer;
