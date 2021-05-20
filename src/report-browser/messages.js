import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  download: {
    id: 'report-browser.csv-viewer.table-action.csv-download',
    defaultMessage: 'Download CSV',
  },
  csv_error: {
    id: 'report-browser.csv-viewer.table-empty.error',
    defaultMessage: 'There was an error loading the CSV file.',
  },
  csv_empty: {
    id: 'report-browser.csv-viewer.table-empty.empty-report',
    defaultMessage: 'The CSV file is empty.',
  },
  heading: {
    id: 'report-browser.report-list.heading',
    defaultMessage: 'The following reports are available for download:',
  },
  column_report_name: {
    id: 'report-browser.report-list.table-column.report-name',
    defaultMessage: 'Report Name',
  },
  column_report_url: {
    id: 'report-browser.report-list.table-column.report-url',
    defaultMessage: 'Report URL',
  },
  column_view_in_browser: {
    id: 'report-browser.report-list.table-column.view-in-browser',
    defaultMessage: 'View in Browser',
  },
  action_reload: {
    id: 'report-browser.report-list.table-action.reload',
    defaultMessage: 'Reload Report List',
  },
  no_reports: {
    id: 'report-browser.report-list.table-empty.message',
    defaultMessage: 'No reports found',
  },
});

export default messages;
