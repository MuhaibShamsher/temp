import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssetsPageHeader from "../../components/AssetsPageHeader";
import NoData from "../../components/NoData";
import SearchLoader from "../../components/SearchLoader";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import classes from "./Assets.module.css";
import { scanDataApi } from "../../Helper/helper";
import Loader from "../../components/Loader";
import ProgressLoader from "../../components/ProgressLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Assets = () => {
  const [submitting, setSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const {
    scanRange,
    scanData,
    isScanning,
    isScanSocketConnected,
    isAlertSocketConnected,
  } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const scanHandler = async () => {
    setSubmitting(true);
    if (!isScanSocketConnected && !isAlertSocketConnected) {
      return toast.error("Sockets not connected, please refresh page again");
    }
    const response = await scanDataApi(scanRange, dispatch);
    if (response !== undefined) {
      navigate("/");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Loader />
      <div className={classes.tableContainer}>
        <AssetsPageHeader
          loading={submitting}
          scanHandler={scanHandler}
          edit={edit}
          setEdit={setEdit}
        />
        {
          // isScanning ? (
          //   <ProgressLoader
          //     isLoading={isScanning}
          //     label="Scanning..."
          //   />
          // ) :
          scanData?.length > 0 ? (
            <TableSkeleton
              dropDownColIndex={2}
              viewColIndex={1}
              topologyColIndex={3}
              data={scanData.map((item) => ({
                ipAddress: item?.addresses?.ipv4 || "-",
                macAddress: item?.addresses?.mac || "-",
                hostname: item?.hostnames || "-",
                topology: item,
                operatingSystem: item?.os?.osmatch?.[0]?.name || "-",
                view: item,
              }))}
              edit={edit}
              showDropDown
              showTopology
              showView
              columns={[
                {
                  header: "Hostname",
                  accessor: "hostname",
                },
                {
                  header: "IP Address",
                  accessor: "ipAddress",
                },
                {
                  header: "Mac Address",
                  accessor: "macAddress",
                },
                {
                  header: "Topology",
                  accessor: "topology",
                },
                {
                  header: "OS",
                  accessor: "operatingSystem",
                },
                {
                  header: "View",
                  accessor: "view",
                },
              ]}
            />
          ) : (
            <NoData text="No Data Found" />
          )
        }
      </div>
    </>
  );
};

export default Assets;
