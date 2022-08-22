import { AnyAction } from 'redux';

interface ICallState {
  loading: boolean;
}

const SET_LOADING = 'user/SET_LOADING';

const initialState: ICallState = {
  loading: false,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value };

    default: {
      return state;
    }
  }
};

export const setLoading = (value: boolean) => {
  return {
    type: SET_LOADING,
    value,
  };
};

export default reducer;
