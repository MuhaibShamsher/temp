// AssetDetails.js
import React from "react";
import classes from "./AssetDetails.module.css";
import { useLocation } from "react-router-dom";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import Loader from "../../components/Loader";

const AssetDetails = () => {
  const { data } = useLocation().state;
  const portsArray = Object.keys(data?.ports).map((portId) => {
    const port = data?.ports[portId];
    
    return {
      portId,
      state: port.state,
      reason: port.reason,
      name: port.name,
      product: port.product,
      version: port.version,
      extrainfo: port.extrainfo,
      conf: port.conf,
      cpe: port.cpe,
      scripts: port.scripts,
    };
  });

  return (
    <>
      <Loader />

      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.headerContent}>
            <div className={classes.greenDot}></div>
            <span>{data?.severity}</span>
          </div>
        </div>
        <div className={classes.gridContainer}>
          <div className={classes.gridItem}>
            <div className={classes.twoColumnGrid}>
              <div>
                <span className={classes.fontMedium}>Hostname:</span>
                <p>{data?.hostnames}</p>
              </div>
              <div>
                <span className={classes.fontMedium}>IPv4 Address:</span>
                <p>
                  {data?.addresses?.ipv4} ({data?.severity})
                </p>
              </div>
            </div>
            <div className={classes.twoColumnGrid}>
              <div>
                <span className={classes.fontMedium}>MAC Address:</span>
                <p>{data?.addresses?.mac}</p>
              </div>
              <div>
                <span className={classes.fontMedium}>Operating System:</span>
                <p>{data?.os?.osmatch?.[0]?.name}</p>
              </div>
            </div>
          </div>
        </div>
        <TableSkeleton
          showTopology
          topologyColIndex={1}
          portTopology
          data={portsArray?.map((item) => ({
            port: item?.name?.toUpperCase() || "-",
            portId: item?.portId || "-",
            state: item?.state || "-",
            // reason: item?.reason || "-",
            // product: item?.product || "-",
            // version: item?.version || "-",
            // confidenceLevel: item?.conf || "-",
            cpe: item?.cpe || "-",
            topology: item,
          }))}
          columns={[
            {
              header: "ID",
              accessor: "portId",
            },
            {
              header: "Port",
              accessor: "port",
            },

            {
              header: "State",
              accessor: "state",
            },
            // {
            //   header: "Reason",
            //   accessor: "reason",
            // },
            // {
            //   header: "Product",
            //   accessor: "product",
            // },
            // {
            //   header: "Version",
            //   accessor: "version",
            // },
            // {
            //   header: "Confidence Level",
            //   accessor: "confidenceLevel",
            // },
            {
              header: "CPE",
              accessor: "cpe",
            },
            {
              header: "Topology",
              accessor: "topology",
            },
          ]}
        />
      </div>
    </>
  );
};

export default AssetDetails;
