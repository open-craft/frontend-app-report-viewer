import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button, Spinner, TransitionReplace } from '@edx/paragon';
import { Error, Locked } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { LoadingStatus } from '../constants';

export default function ContentLoader({
  status,
  children,
  onReload,
}) {
  let content = null;
  switch (status) {
    case LoadingStatus.LOADING:
      content = (<Spinner animation="border" variant="primary" key="loading-spinner" />);
      break;
    case LoadingStatus.DENIED:
      content = (
        <div className="alert alert-danger d-flex align-items-center justify-content-start" key="loading-denied">
          <Locked />&nbsp;
          <FormattedMessage
            id="report-browser.content-loader.denied"
            defaultMessage="You don't have access to view this page."
          />
        </div>
      );
      break;
    case LoadingStatus.FAILED:
      content = (
        <div className="alert alert-danger d-flex align-items-center justify-content-between" key="loading-failed">
          <span className="d-flex align-items-center">
            <Error />&nbsp;
            <FormattedMessage
              id="report-browser.content-loader.error"
              defaultMessage="There was an error loading the data for this page."
            />
          </span>
          {onReload
          && (
            <Button size="sm" onClick={onReload}>
              <FormattedMessage
                id="report-browser.course-list.button.try-again"
                defaultMessage="Try again"
                description="Clicking this button will attempt loading the course list again."
              />
            </Button>
          )}
        </div>
      );
      break;
    case LoadingStatus.LOADED:
      content = <React.Fragment key="loading-success">{children}</React.Fragment>;
      break;
    default:
      content = null;
  }
  return <TransitionReplace>{content}</TransitionReplace>;
}

ContentLoader.propTypes = {
  status: PropTypes.oneOf(Object.values(LoadingStatus)).isRequired,
  children: PropTypes.element.isRequired,
  onReload: PropTypes.func,
};

ContentLoader.defaultProps = {
  onReload: null,
};
