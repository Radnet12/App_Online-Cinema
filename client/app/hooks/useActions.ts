import { useMemo } from "react";

import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { AllActions } from "@/store/reducers/AllActions";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(AllActions, dispatch), [dispatch]);
};
