import Axios from 'axios';
import { from, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { RoomsItemI } from '../../reducers/rooms/rooms';

export const FETCH_ROOMS = 'FETCH_ROOMS';
export const FETCH_ROOMS_FULFILLED = 'FETCH_ROOMS_FULFILLED';

interface FetchRoomsI {
  type: typeof FETCH_ROOMS;
}

export const fetchRooms = (): FetchRoomsI => ({
  type: FETCH_ROOMS,
});

interface FetchRoomsFulfilledI {
  type: typeof FETCH_ROOMS_FULFILLED;
  payload: {
    rooms: RoomsItemI[];
    loading: boolean;
  };
}

export const fetchRoomsFulfilled = (
  payload: { rooms: RoomsItemI[]; loading: boolean },
): FetchRoomsFulfilledI => ({
  type: FETCH_ROOMS_FULFILLED,
  payload,
});

export const roomsEpic: Epic<roomsActionTypes> = (action$): any => action$.pipe(
  ofType(FETCH_ROOMS),
  mergeMap(
    (): any => from(Axios({
      method: 'get',
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
      headers: {
        Authorization: 'Bearer pj6Zo71utSu7169UgLSqS0qLr3sippW2rkISAy9B9DQ8Sd3nTIkNaBVQ9nNJ',
        Accept: 'application/json',
      },
    }))
      .pipe(
        map((response): FetchRoomsFulfilledI => fetchRoomsFulfilled(
          response.data.success
            ? { rooms: response.data.items, loading: false }
            : { rooms: [], loading: true },
        )),
        catchError((error): Observable<never> => Observable.throw(error)),
      ),
  ),
);

export type roomsActionTypes = FetchRoomsI | FetchRoomsFulfilledI;
