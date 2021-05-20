/* eslint-disable import/prefer-default-export */
import { ensureConfig, getConfig } from '@edx/frontend-platform';

ensureConfig([
  'LMS_BASE_URL',
], 'Utils');

export const getHttpErrorStatus = error => error && error.customAttributes && error.customAttributes.httpErrorStatus;

/**
 * Returns the full report URL.
 *
 * If the report URL is a relative URL, it prepends it with the LMS base path.
 *
 * @param reportURL
 * @returns {string}
 */
export function getFullReportURL(reportURL) {
  if (reportURL.startsWith('/')) {
    return getConfig().LMS_BASE_URL + reportURL;
  }
  return reportURL;
}
