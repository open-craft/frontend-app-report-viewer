/* eslint-disable no-param-reassign,import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../constants';

const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    status: LoadingStatus.LOADING,
    reports: [],
  },
  reducers: {
    fetchReportsRequest: (state) => {
      state.status = LoadingStatus.LOADING;
    },
    fetchReportsSuccess: (state, { payload }) => {
      const { downloads } = payload;
      state.status = LoadingStatus.LOADED;
      state.reports = downloads;
    },
    fetchReportsFailed: (state) => {
      state.status = LoadingStatus.FAILED;
    },
    fetchReportsDenied: (state) => {
      state.status = LoadingStatus.DENIED;
    },
  },
});

export const {
  fetchReportsDenied,
  fetchReportsFailed,
  fetchReportsRequest,
  fetchReportsSuccess,
} = reportsSlice.actions;

export const { reducer } = reportsSlice;
