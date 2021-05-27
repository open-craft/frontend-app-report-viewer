import { FormattedMessage } from '@edx/frontend-platform/i18n';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentLoader from '../components/ContentLoader';
import { fetchCourseIds, getCourseIds, getCourseIdsStatus } from './data';

export default function CourseList() {
  const [refreshCourseIds, setRefreshCourseIds] = useState(true);
  const dispatch = useDispatch();
  const courseIds = useSelector(getCourseIds);
  const status = useSelector(getCourseIdsStatus);
  React.useEffect(async () => {
    if (refreshCourseIds) {
      dispatch(fetchCourseIds());
    }
    setRefreshCourseIds(false);
  }, [refreshCourseIds]);

  return (
    <main className="container my-4">
      <h4>
        <FormattedMessage
          id="report-browser.course-list.heading"
          defaultMessage="You have access to reports for the following courses:"
        />
      </h4>
      <ContentLoader status={status} onReload={() => dispatch(fetchCourseIds())}>
        <div className="list-group">
          {courseIds.map((courseId => (
            <Link
              className="list-group-item list-group-item-action"
              to={`/instructor-reports/${courseId}`}
              key={courseId}
            >
              {courseId}
            </Link>
          )))}
        </div>
      </ContentLoader>
    </main>
  );
}
