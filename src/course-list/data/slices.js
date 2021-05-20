/* eslint-disable no-param-reassign,import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../constants';

const courseIdsSlice = createSlice({
  name: 'courseIds',
  initialState: {
    status: LoadingStatus.LOADING,
    ids: [],
  },
  reducers: {
    fetchCourseIdsRequest: (state) => {
      state.status = LoadingStatus.LOADING;
    },
    fetchCourseIdsSuccess: (state, { payload }) => {
      const { results } = payload;
      state.status = LoadingStatus.LOADED;
      state.ids = results;
    },
    fetchCourseIdsFailed: (state) => {
      state.status = LoadingStatus.FAILED;
    },
    fetchCourseIdsDenied: (state) => {
      state.status = LoadingStatus.DENIED;
    },

  },
});

export const {
  fetchCourseIdsDenied,
  fetchCourseIdsFailed,
  fetchCourseIdsRequest,
  fetchCourseIdsSuccess,
} = courseIdsSlice.actions;

export const { reducer } = courseIdsSlice;
