/* eslint-disable import/prefer-default-export */
import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';

ensureConfig([
  'LMS_BASE_URL',
], 'Instructor API service');

/**
 * Fetches all the course Ids for which the user has instructor privileges.
 * @returns {Promise<{}>}
 */
export async function getUserCourseIds() {
  const user = await getAuthenticatedUser();
  const url = new URL(`${getConfig().LMS_BASE_URL}/api/courses/v1/course_ids/?role=staff&username=${user.username}`);
  const { data } = await getAuthenticatedHttpClient()
    .get(url);
  return data;
}
