import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { DataTable, TextFilter } from '@edx/paragon';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import React from 'react';
import messages from './messages';

function CSVViewer({
  url,
  intl,
}) {
  const [rowData, setRowData] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(async () => {
    Papa.parse(url, {
      download: true,
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
      trimHeaders: true,
      complete(data) {
        setRowData(data.data);
      },
      error() {
        setError(true);
      },
    });
  }, [url]);

  // Create column headers from the first row.
  const columns = rowData.length > 0 ? Object.keys(rowData[0])
    .map(
      (key) => ({
        Header: key,
        accessor: key,
      }),
    ) : [];

  return (
    <DataTable
      isSortable
      isPaginated
      isFilterable
      numBreakoutFilters={4}
      data={rowData}
      itemCount={rowData?.length}
      columns={columns}
      defaultColumnValues={{ Filter: TextFilter }}
      tableActions={[
        {
          buttonText: intl.formatMessage(messages.download),
          handleClick() {
            window.open(url);
          },
          variant: 'secondary',
        },
      ]}
    >
      <DataTable.TableControlBar />
      <DataTable.Table caption="report" />
      <DataTable.EmptyTable content={
        error ? intl.formatMessage(messages.csv_error) : intl.formatMessage(messages.csv_empty)
      }
      />
      <DataTable.TableFooter />
    </DataTable>
  );
}

CSVViewer.propTypes = {
  url: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CSVViewer);
