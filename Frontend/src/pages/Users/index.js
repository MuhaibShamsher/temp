import React from "react";
import { fakeData } from "../../constants/dummy_data";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import classes from "./Users.module.css";

const Users = () => {
  return (
    <>
      {" "}
      <h1 className={`mt-2 ${classes.heading}`}>Users Details</h1>
      <TableSkeleton
        data={fakeData}
        columns={[
          {
            header: "ID",
            accessor: "id",
          },
          {
            header: "First Name",
            accessor: "first_name",
          },
          {
            header: "Last Name",
            accessor: "last_name",
          },
          {
            header: "Email",
            accessor: "email",
          },
          {
            header: "Gender",
            accessor: "gender",
          },
          {
            header: "University",
            accessor: "university",
          },
        ]}
      />
    </>
  );
};

export default Users;
