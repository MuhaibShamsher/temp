import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AlertsPageHeader from "../../components/RisksPageHeader";
import NoData from "../../components/NoData";
import SearchLoader from "../../components/SearchLoader";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import classes from "./Risks.module.css";
import RiskCardContainer from "../../components/RiskCardContainer";
import Loader from "../../components/Loader";

const Risks = () => {
  const { alertsData } = useSelector((state) => state.authReducer);

  return (
    <>
      <Loader />
      {alertsData?.length > 0 ? (
        alertsData?.map((item, index) => (
          <RiskCardContainer data={item} key={index} />
        ))
      ) : (
        <NoData text="No Compliances Risk Found" />
      )}
    </>
  );
};

export default Risks;
