import React, { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import classes from "./TableSkeleton.module.css";
import { BiLogoGraphql } from "react-icons/bi";
import { useTable } from "react-table";
import DropDown from "../DropDown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth/authSlice";
import { PUT } from "../../axios/axiosFunctions";
import { baseURL } from "../../Config/apiUrl";
import { toast } from "react-toastify";

const TableSkeleton = ({
  data: propsData,
  columns: propsColumns,
  showDropDown,
  showTopology = false,
  showView = false,
  dropDownColIndex = 2,
  viewColIndex = 1,
  topologyColIndex = 3,
  portTopology = false,
  alarmsView = false,
  edit = false,
}) => {
  const [dropDownVal, setDropdownInput] = useState(null);
  const { user } = useSelector((state) => state?.authReducer);
  const navigate = useNavigate();
  const data = useMemo(() => propsData, [propsData]);
  const columns = useMemo(() => propsColumns, [propsColumns]);
  const dispatch = useDispatch();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns });

  const staticOperatingSystems = [
    "Windows 1.0",
    "Windows 2.0",
    "Windows 3.0",
    "Windows 3.1",
    "Windows NT 3.1",
    "Windows for Workgroups 3.1",
    "Windows NT 3.5",
    "Windows NT 3.51",
    "Windows 95",
    "Windows NT 4.0",
    "Windows 98",
    "Windows 2000",
    "Windows ME (Millennium Edition)",
    "Windows XP",
    "Windows Vista",
    "Windows 7",
    "Windows 8",
    "Windows 8.1",
    "Windows 10 (1507)",
    "Windows 10 (1511)",
    "Windows 10 (1607)",
    "Windows Server 2016",
    "Windows 10 (1703)",
    "Windows 10 (1709)",
    "Windows Server (1709)",
    "Windows 10 (1803)",
    "Windows Server (1803)",
    "Windows 10 (1809)",
    "Windows Server (1809)",
    "Windows Server 2019",
    "Windows 10 (1903)",
    "Windows Server (1903)",
    "Windows 10 (1909)",
    "Windows Server (1909)",
    "Windows 10 (2004)",
    "Windows Server (2004)",
    "Windows 10 20H2",
    "Windows 10 21H1",
    "Windows 10 21H2",
    "Windows 10 22H2",
    "Windows 11 21H2",
    "Windows 11 22H2",
    "Windows 11 23H2",
    "Windows Server 2022",
    "Macintosh System Software (1984)",
    "Macintosh System Software 2.0 (1985)",
    "System Software 3.0 (1986)",
    "System Software 4.0 (1987)",
    "System Software 6.0 (1988)",
    "Mac OS (1989)",
    "Mac OS System 7 (1991)",
    "Mac OS 8 (1997)",
    "Mac OS 9 (1999)",
    "Mac OS X (2001)",
    "Mac OS X Panther (10.3) (2003)",
    "Mac OS X Tiger (10.4) (2005)",
    "Mac OS X Leopard (10.5) (2007)",
    "Mac OS X Snow Leopard (10.6) (2009)",
    "OS X Lion (10.7) (2011)",
    "OS X Mountain Lion (10.8) (2012)",
    "OS X Mavericks (10.9) (2013)",
    "OS X Yosemite (10.10) (2014)",
    "OS X El Capitan (10.11) (2015)",
    "macOS Sierra (10.12) (2016)",
    "macOS High Sierra (10.13) (2017)",
    "macOS Mojave (10.14) (2018)",
    "macOS Catalina (10.15) (2019)",
    "macOS Big Sur (11.0) (2020)",
    "macOS Monterey (12.0) (2021)",
    "macOS Ventura (13.0) (2022)",
    "macOS Sonoma (14.0) (2023)",
    "Debian",
    "Ubuntu",
    "CentOS",
    "Fedora",
    "Red Hat Enterprise Linux (RHEL)",
    "openSUSE",
    "Arch Linux",
    "Linux Mint",
    "Gentoo Linux",
    "Slackware Linux",
    "Kali Linux",
    "Elementary OS",
    "Manjaro Linux",
    "Zorin OS",
    "Mageia",
    "CentOS Stream",
    "Tails",
    "Deepin",
    "MX Linux",
    "Antergos",
    "Clear Linux",
    "Solus",
    "Parrot Security OS",
    "Pop!_OS",
    "Puppy Linux",
  ];

  const saveData = async (cellVal, dropdownVal) => {
    const updatedData = {
      ...cellVal,
      os: {
        osmatch: [{ ...cellVal?.os?.osmatch?.[0], name: dropdownVal?.value }],
      },
    };
    console.log(updatedData, "Asc");
    dispatch(authActions.updateScanData(updatedData));
    const params = {
      updated_data: updatedData,
    };

    console.log(params, "params");

    const respone = await PUT(baseURL("scanner/update_data/"), params);
  };

  return (
    <div className={classes.tableContainer}>
      <table {...getTableProps()} className={classes.mainTable}>
        <thead className={classes.header}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup?.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column) => (
                <th {...column?.getHeaderProps()}>
                  {column?.render("header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={classes.tableBody}>
          {rows?.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row?.getRowProps()}>
                {row?.cells?.map((cell, cellIndex) => {
                  const cellValue = cell?.value || "-";
                  const options = [
                    ...new Set([...staticOperatingSystems, cellValue]),
                  ];
                  return (
                    <td className={classes.Data} {...cell?.getCellProps()}>
                      {cellIndex === columns.length - viewColIndex &&
                      rowIndex >= 0 &&
                      showView ? (
                        <span className={classes.icon}>
                          {showView && (
                            <FaEye
                              onClick={() =>
                                navigate(
                                  alarmsView
                                    ? `/alerts/${cellValue?.ip}`
                                    : `/assets/${cellValue?.addresses?.ipv4}`,
                                  { state: { data: cellValue } }
                                )
                              }
                              size={25}
                              cursor={"pointer"}
                            />
                          )}
                        </span>
                      ) : cellIndex === columns.length - dropDownColIndex &&
                        rowIndex >= 0 &&
                        showDropDown ? (
                        <>
                          {showDropDown && (
                            <DropDown
                              className={classes.dropdown}
                              options={options}
                              setter={(e) => {
                                setDropdownInput(e);
                                saveData(cell?.row?.values?.topology, e);
                              }}
                              defaultOption={cellValue}
                              // disabled={user?.role === "1" || user?.role === "3"}
                              disabled={!edit}
                            />
                          )}
                        </>
                      ) : cellIndex === columns.length - topologyColIndex &&
                        rowIndex >= 0 &&
                        showTopology ? (
                        showTopology && (
                          <span className={classes.icon}>
                            <BiLogoGraphql
                              onClick={() =>
                                navigate(
                                  `/topology/${
                                    portTopology
                                      ? cellValue?.name?.toLowerCase()
                                      : cellValue?.addresses?.ipv4
                                  }`,
                                  {
                                    state: {
                                      data: cellValue,
                                      isPortTopology: portTopology,
                                    },
                                  }
                                )
                              }
                              size={25}
                              cursor={"pointer"}
                            />
                          </span>
                        )
                      ) : (
                        cell?.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
