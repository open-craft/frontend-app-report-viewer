/* eslint-disable import/prefer-default-export */
import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

ensureConfig([
  'LMS_BASE_URL',
], 'Instructor API service');

/**
 * Fetches instructor reports for the specified course.
 * @param {string} courseId Course ID for course to fetch reports of.
 * @returns {Promise<{}>}
 */
export async function getInstructorReports(courseId) {
  const url = new URL(`${getConfig().LMS_BASE_URL}/api/instructor/v1/reports/${courseId}`);
  const { data } = await getAuthenticatedHttpClient()
    .get(url);
  return data;
}
