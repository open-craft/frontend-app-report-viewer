import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { DataTable } from '@edx/paragon';
import { ArrowBack } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentLoader from '../components/ContentLoader';
import { getFullReportURL } from '../utils';
import { fetchReports, getReports, getReportsStatus } from './data';
import messages from './messages';

function ReportURLCell({ row }) {
  return (
    <a href={getFullReportURL(row.values.url)} target="_blank" rel="noopener noreferrer">
      <FormattedMessage id="report-browser.report-list.table-column-action.download" defaultMessage="Download" />
    </a>
  );
}

ReportURLCell.propTypes = {
  row: PropTypes.shape({
    values: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function getViewInBrowserActionCellForCourse(courseId) {
  function ViewInBrowserActionCell({ row }) {
    return (
      <Link to={`/instructor-reports/${courseId}/report/?reportName=${encodeURIComponent(row.values.name)}`}>
        <FormattedMessage id="report-browser.report-list.table-column-action.view" defaultMessage="View" />
      </Link>
    );
  }

  ViewInBrowserActionCell.propTypes = {
    row: PropTypes.shape({
      values: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };
  return ViewInBrowserActionCell;
}

function ReportBrowser({
  courseId,
  intl,
}) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchReports(courseId));
  }, [courseId]);
  const reports = useSelector(getReports);
  const status = useSelector(getReportsStatus);

  return (
    <main className="container my-4">
      <Link to="/">
        <ArrowBack />
        <FormattedMessage
          id="report-browser.report-browser.back-to-course-list"
          defaultMessage="Back to Course ID list"
        />
      </Link>
      <h3 className="mt-2">{intl.formatMessage(messages.heading)}</h3>
      <ContentLoader status={status} onReload={() => dispatch(fetchReports(courseId))}>
        <DataTable
          data={reports}
          itemCount={reports.length}
          columns={[
            {
              Header: intl.formatMessage(messages.column_report_name),
              accessor: 'name',
            },
            {
              Header: intl.formatMessage(messages.column_report_url),
              accessor: 'url',
              Cell: ReportURLCell,
            },
          ]}
          additionalColumns={[
            {
              id: 'action',
              Header: intl.formatMessage(messages.column_view_in_browser),
              Cell: getViewInBrowserActionCellForCourse(courseId),
            },
          ]}
          tableActions={[
            {
              buttonText: intl.formatMessage(messages.action_reload),
              handleClick() {
                dispatch(fetchReports(courseId));
              },
              variant: 'secondary',
            },
          ]}
        >
          <DataTable.TableControlBar />
          <DataTable.Table />
          <DataTable.EmptyTable content={intl.formatMessage(messages.no_reports)} />
          <DataTable.TableFooter />
        </DataTable>
      </ContentLoader>
    </main>
  );
}

ReportBrowser.propTypes = {
  intl: intlShape.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default injectIntl(ReportBrowser);
