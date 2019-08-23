import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import isLoadingReducer from './isLoading/isLoading';
import roomsReducer from './rooms/rooms';
import { roomsEpic } from '../actions/rooms/rooms';

const rootReducer = combineReducers({
  isLoadingReducer,
  roomsReducer,
});

const rootEpic = combineEpics(roomsEpic);

const epicMiddleware = createEpicMiddleware();

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    epicMiddleware,
    loggerMiddleware,
  ),
);

epicMiddleware.run(rootEpic);

export type storeTypes = ReturnType<typeof rootReducer>;

export default store;
