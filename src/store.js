import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as courseIdsReducer } from './course-list/data';
import { reducer as reportsReducer } from './report-browser/data';

export default function initializeStore() {
  return configureStore({
    reducer:
      combineReducers({
        reports: reportsReducer,
        courseIds: courseIdsReducer,
      }),
  });
}
