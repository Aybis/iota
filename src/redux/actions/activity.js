import swal from 'sweetalert';
import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import ToastHandler from '../../helpers/toast';
import * as type from '../types/activity';

export const setLoadingAct = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setRegionalAct = (data) => ({
  type: type.SELECT_REGIONAL,
  payload: data,
});

export const setMessageAct = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const setMonthAct = (data) => ({
  type: type.MONTH,
  payload: data,
});

export const setYearAct = (data) => ({
  type: type.YEAR,
  payload: data,
});

export const setErrorAct = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setDataAct = (data) => ({
  type: type.ACTIVITIES,
  payload: data,
});

export const setDataSelectedAct = (data) => ({
  type: type.SELECTED_ACTIVITIES,
  payload: data,
});

export const setActivityEmployee = (data) => ({
  type: type.DASHBOARD_ACTIVITIES_EMPLOYEE,
  payload: data,
});

export const setTempAct = (data) => ({
  type: type.TEMP_ACTIVITIES,
  payload: data,
});

export const setHistoryAct = (data) => ({
  type: type.HISTORY_ACTIVITIES,
  payload: data,
});

export const setAcitvityUserByProgress = (data) => ({
  type: type.ACTIVITIES_BY_USER_PROGRESS,
  payload: data,
});

export const setAcitvityUserByDone = (data) => ({
  type: type.ACTIVITIES_BY_USER_DONE,
  payload: data,
});

export const setAcitvityUserByPending = (data) => ({
  type: type.ACTIVITIES_BY_USER_PENDING,
  payload: data,
});

export const setAcitvityDashboardByProgress = (data) => ({
  type: type.DASHBOARD_ACTIVITIES_PROGRESS,
  payload: data,
});

export const setAcitvityDashboardByDone = (data) => ({
  type: type.DASHBOARD_ACTIVITIES_DONE,
  payload: data,
});

export const setAcitvityDashboardByPending = (data) => ({
  type: type.DASHBOARD_ACTIVITIES_PENDING,
  payload: data,
});

// FUNCTION ENDPOINT TEKNISI
export const fetchActivityProgressByUserDaily = (data) => async (dispatch) => {
  setHeader();
  dispatch(setLoadingAct(true));

  return iota
    .activityProgress({
      params: {
        user_id: data.user_id ?? null,
        regional_id: data.regional_id ?? null,
        date: data.date ?? null,
      },
    })
    .then((res) => {
      dispatch(setLoadingAct(false));
    })
    .catch((err) => {
      dispatch(setLoadingAct(false));
    });
};

export const fetchActivityProgressByUser = (data) => async (dispatch) => {
  dispatch(setAcitvityUserByProgress());

  dispatch(setLoadingAct(true));
  setHeader();

  return iota
    .activityProgress({
      params: {
        user_id: data.user_id ?? null,
        date: data.date ?? null,
      },
    })
    .then((res) => {
      res?.data?.map((item) => {
        dispatch(setAcitvityUserByProgress(item.activity));
        dispatch(setLoadingAct(false));

        return item;
      });
    })
    .catch((err) => {
      ToastHandler('warning', err?.response ?? 'Something Happened!');
      dispatch(setLoadingAct(false));

      return err.response;
    });
};

export const fetchActivityPendingByUser = (data) => async (dispatch) => {
  dispatch(setLoadingAct(true));

  setHeader();

  return iota
    .activityProgress({
      params: {
        user_id: data.user_id ?? null,
      },
    })
    .then((res) => {
      res?.data?.map((item) => {
        dispatch(setAcitvityUserByPending(item.activity));
        dispatch(setLoadingAct(false));

        return item.activity;
      });
    })
    .catch((err) => {
      ToastHandler('warning', err?.response ?? 'Something Happened!');
      dispatch(setLoadingAct(false));

      return err.response;
    });
};

export const fetchActivityDoneByUser = (data) => async (dispatch) => {
  dispatch(setLoadingAct(true));

  setHeader();

  return iota
    .activityDone({
      params: {
        user_id: data.user_id ?? null,
        date: data.date ?? null,
      },
    })
    .then((res) => {
      res?.data?.map((item) => {
        dispatch(setAcitvityUserByDone(item.activity));
        dispatch(setLoadingAct(false));

        return item.activity;
      });
    })
    .catch((err) => {
      ToastHandler('warning', err?.response ?? 'Something Happened!');
      dispatch(setLoadingAct(false));

      return err.response;
    });
};

// FUNCTION ENDPOINT DASHBOARD HARIAN & MONTHLY
export const fetchActivityProgressDashboard = (data) => async (dispatch) => {
  let count = 0;
  dispatch(setLoadingAct(true));
  setHeader();

  return iota
    .activityProgress({
      params: {
        regional_id: data.regional_id ?? null,
        date: data.date,
      },
    })
    .then((res) => {
      res.data
        .filter((item) => item.role_id === '1')
        .map((item) => {
          count += item?.activity?.length ?? 0;
          return count;
        });
      dispatch(
        setAcitvityDashboardByProgress({
          name: 'todo',
          title: 'To Do',
          value: count,
        }),
      );
      dispatch(setLoadingAct(false));
    })
    .catch((err) => {
      dispatch(setLoadingAct(false));

      return err.response;
    });
};

export const fetchActivityDoneDashboard = (data) => async (dispatch) => {
  dispatch(setLoadingAct(true));

  setHeader();
  let count = 0;
  return iota
    .activityDone({
      params: {
        regional_id: data.regional_id,
        date: data.date,
      },
    })
    .then((res) => {
      res.data
        .filter((item) => item.role_id === '1')
        .map((item) => {
          count += item?.activity?.length;
          return count;
        });

      dispatch(
        setAcitvityDashboardByDone({
          name: 'completed',
          title: 'Completed',
          value: count,
        }),
      );
      dispatch(setLoadingAct(false));
      return res;
    })
    .catch((err) => {
      dispatch(setLoadingAct(false));
      return err.response;
    });
};

export const fetchActivityPendingDashboard = (data) => async (dispatch) => {
  setHeader();
  dispatch(setLoadingAct(true));
  let count = 0;

  return iota
    .activityProgress({
      params: {
        regional_id: data.regional_id,
        date: data.date,
      },
    })
    .then((res) => {
      res.data
        .filter((item) => item.role_id === '1')
        .map((item) => {
          count += item?.activity?.length;
          return count;
        });

      dispatch(
        setAcitvityDashboardByPending({
          name: 'pending',
          title: 'Pending',
          value: count,
        }),
      );
      dispatch(setLoadingAct(false));
      return res;
    })
    .catch((err) => {
      dispatch(setLoadingAct(false));
      return err.response;
    });
};

export const fetchAllActivity = (data) => async (dispatch) => {
  dispatch(setLoadingAct(true));
  setHeader();
  let dataActivty = [];
  return iota
    .activity({
      params: {
        regional_id: data.regional_id ?? null,
        date: data.date ?? null,
      },
    })
    .then((res) => {
      const result = res?.data?.map((user) => {
        dataActivty.push({
          name: user?.name,
          user_id: user?.id,
          posisi: user?.posisi,
          witel: user?.witel,
          todo: user?.activity?.filter((item) => item.progress === 0),
          progress: user?.activity?.filter(
            (item) => item.progress > 0 && item.progress < 100,
          ),
          done: user?.activity?.filter((item) => item.progress === 100),
        });
        return {
          name: user?.name,
          user_id: user?.id,
          posisi: user?.posisi,
          witel: user?.witel,
          todo: user?.activity?.filter((item) => item.progress === 0),
          progress: user?.activity?.filter(
            (item) => item.progress > 0 && item.progress < 100,
          ),
          done: user?.activity?.filter((item) => item.progress === 100),
        };
      });
      dispatch(setActivityEmployee(result));
      dispatch(setLoadingAct(false));

      return res;
    })
    .catch((err) => {
      dispatch(setLoadingAct(false));

      return err.response;
    });
};

// FUNCTION ACTIVITY GLOBAL
export const fetchHistoryProgress = (data) => async (dispatch) => {
  dispatch(setLoadingAct(true));
  setHeader();

  return iota
    .activityListProgress({
      params: {
        activity_id: data,
      },
    })
    .then((res) => {
      dispatch(setHistoryAct(res.data[0]));
      dispatch(setLoadingAct(false));
      return res;
    })
    .catch((err) => {
      dispatch(setLoadingAct(false));
      return err.response;
    });
};

export const insertActivity = (data) => async (dispatch) => {
  setHeader();

  return iota
    .insertActivity(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateActivity = (data) => async (dispatch) => {
  setHeader();

  return iota
    .updateActivity({
      params: {
        description: data.description,
        title: data.title,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const insertProgressActivity = (data) => async (dispatch) => {
  setHeader();

  return iota
    .addProgressActivity(data)
    .then((res) => {
      swal(
        'Yeay!',
        res?.data?.message ?? 'Progress berhasil ditambahkan!',
        'success',
      );

      dispatch(fetchHistoryProgress(data.activity_id));

      return res;
    })
    .catch((err) => {
      swal(
        'Oh no!',
        err?.response?.data?.message?.length > 1
          ? err?.response?.data?.message
          : err?.response?.data?.message?.join(', \n') ?? 'Something Happened!',
        'error',
      );
      return err.response.data;
    });
};
