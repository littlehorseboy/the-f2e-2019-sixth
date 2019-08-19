import { roomsActionTypes, FETCH_ROOMS, FETCH_ROOMS_FULFILLED } from '../../actions/rooms/rooms';

export interface RoomsI {
  count: number;
}

const initState = {
  count: 0,
};

const reducer = (state = initState, action: roomsActionTypes): RoomsI => {
  switch (action.type) {
    case FETCH_ROOMS:
      return {
        count: state.count + 1,
      };
    case FETCH_ROOMS_FULFILLED:
      return {
        count: state.count + 2,
      };
    default:
      return state;
  }
};

export default reducer;
