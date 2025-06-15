import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AlertsPageHeader from "../../components/RisksPageHeader";
import NoData from "../../components/NoData";
import SearchLoader from "../../components/SearchLoader";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import classes from "./Alerts.module.css";
import AlertCardContainer from "../../components/AlertsCardContainer";
import Loader from "../../components/Loader";

const Alerts = () => {
  const { alertsData } = useSelector((state) => state.authReducer);

  return (
    <>
      <Loader />

      {alertsData?.length > 0 ? (
        alertsData?.map((item, index) => (
          <AlertCardContainer data={item} key={index} />
        ))
      ) : (
        <NoData text="No Alerts Found" />
      )}
    </>
  );
};

export default Alerts;
