/* eslint-disable import/prefer-default-export */
import { logError } from '@edx/frontend-platform/logging';
import { getHttpErrorStatus } from '../../utils';
import { getInstructorReports } from './api';
import {
  fetchReportsDenied, fetchReportsFailed, fetchReportsRequest, fetchReportsSuccess,
} from './slices';

export function fetchReports(courseId) {
  return async (dispatch) => {
    try {
      dispatch(fetchReportsRequest());
      const data = await getInstructorReports(courseId);
      dispatch(fetchReportsSuccess(data));
    } catch (error) {
      if (getHttpErrorStatus(error) === 403) {
        dispatch(fetchReportsDenied());
      } else {
        dispatch(fetchReportsFailed());
      }
      logError(error);
    }
  };
}
