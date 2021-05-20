import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ArrowBack } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ContentLoader from '../components/ContentLoader';
import { getFullReportURL } from '../utils';
import CSVViewer from './CSVViewer';
import { fetchReports, getReport, getReportsStatus } from './data';

export default function ReportViewer({
  courseId,
}) {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(useLocation().search);
  const reportName = queryParams.get('reportName');
  const csvURL = queryParams.get('url');
  const report = useSelector(getReport(reportName));
  const status = useSelector(getReportsStatus);
  const BackButton = () => (
    <Link to={`/instructor-reports/${courseId}`}>
      <ArrowBack />
      <FormattedMessage
        id="report-browser.report-viewer.back-to-list"
        defaultMessage="Back to report list"
      />
    </Link>
  );

  React.useEffect(() => {
    if (!report) {
      dispatch(fetchReports(courseId));
    }
  }, [courseId]);

  if (reportName) {
    return (
      <ContentLoader status={status} onReload={() => dispatch(fetchReports(courseId))}>{
        report ? (
          <main className="container my-4">
            <BackButton />
            <CSVViewer url={getFullReportURL(report.url)} />
          </main>
        ) : (
          // A report name was passed, but it isn't isn't in the list of reports
          <main className="container my-4">
            <BackButton />
            <FormattedMessage
              id="report-browser.report-viewer.missing-report"
              defaultMessage="Could not find the report. It may no longer be available."
            />
          </main>
        )
      }
      </ContentLoader>
    );
  }
  if (csvURL) {
    return (
      <main className="container my-4">
        <CSVViewer url={csvURL} />
      </main>
    );
  }
  return (
    <main className="container my-4">
      <BackButton />
      <FormattedMessage
        id="report-browser.report-viewer.missing-report"
        defaultMessage="Could not find the report. It may no longer be available."
      />
    </main>
  );
}

ReportViewer.propTypes = {
  courseId: PropTypes.string.isRequired,
};
