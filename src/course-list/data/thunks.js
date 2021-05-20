/* eslint-disable import/prefer-default-export */
import { logError } from '@edx/frontend-platform/logging';
import { getHttpErrorStatus } from '../../utils';
import { getUserCourseIds } from './api';
import {
  fetchCourseIdsDenied, fetchCourseIdsFailed, fetchCourseIdsRequest, fetchCourseIdsSuccess,
} from './slices';

export function fetchCourseIds() {
  return async (dispatch) => {
    try {
      dispatch(fetchCourseIdsRequest());
      const data = await getUserCourseIds();
      dispatch(fetchCourseIdsSuccess(data));
    } catch (error) {
      if (getHttpErrorStatus(error) === 403) {
        dispatch(fetchCourseIdsDenied());
      } else {
        dispatch(fetchCourseIdsFailed());
      }
      logError(error);
    }
  };
}
