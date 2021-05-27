/* eslint-disable import/prefer-default-export */

export const getReports = (state) => state.reports.reports;

export const getReport = (reportName) => (state) => state.reports.reports?.find(report => report.name === reportName);

export const getReportsStatus = (state) => state.reports.status;
