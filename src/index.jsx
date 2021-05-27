import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
import Header, { messages as headerMessages } from '@edx/frontend-component-header';

import {
  APP_INIT_ERROR, APP_READY, initialize, subscribe,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Switch } from 'react-router';
import CourseList from './course-list/CourseList';
import appMessages from './i18n';

import './index.scss';
import ReportBrowser from './report-browser/ReportBrowser';
import ReportViewer from './report-browser/ReportViewer';
import initializeStore from './store';

subscribe(APP_READY, () => {
  const store = initializeStore();

  ReactDOM.render(
    <AppProvider store={store}>
      <Header />
      <Switch>
        <Route exact path="/">
          <CourseList />
        </Route>
        <Route
          exact
          path="/instructor-reports/:courseId"
          render={({ match }) => {
            const { params: { courseId } } = match;
            return (<ReportBrowser courseId={courseId} />);
          }}
        />
        <Route
          exact
          path="/instructor-reports/:courseId/report"
          render={({ match }) => {
            const { params: { courseId } } = match;

            return (<ReportViewer courseId={courseId} />);
          }}
        />
      </Switch>
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  requireAuthenticatedUser: true,
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
});
