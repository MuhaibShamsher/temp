import { useState } from "react";
import Button from "../Button/Button";
import TableSkeleton from "../TableSkeleton/TableSkeleton";
import classes from "./AssetsPageHeader.module.css";
import Papa from "papaparse";
import Modal from "../Modal/Modal";
import CustomeFileInput from "../CustomFileInput";
import DropDown from "../DropDown";
import { useDispatch, useSelector } from "react-redux";
import { assetsActions } from "../../store/assetsData/assetsDataSlice";
import { POST } from "../../axios/axiosFunctions";
import { toast } from "react-toastify";
import { baseURL } from "../../Config/apiUrl";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { formatCSVData } from "../../Helper/CsvDataFormatter";
import { authActions } from "../../store/auth/authSlice";

const AssetsPageHeader = ({
  setDropDownOption,
  dropDownVal,
  scanHandler,
  loading,
  edit,
  setEdit,
}) => {
  const { user } = useSelector((state) => state.authReducer);
  const [showFileInputModal, setShowFileInputModal] = useState(false);
  const [dropdownInput, setDropdownInput] = useState();
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const [columnArray, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  // const dispatch = useDispatch();

  const handleFile = (event) => {
    setShowFileInputModal(false);
    // const fileName = event?.target?.files[0]?.name?.split(".")[0];
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        // console.log(result, "result");
        const formattedCsvData = formatCSVData(result?.data);
        formattedCsvData?.map((d) => {
          console.log(d, "d");
          dispatch(authActions.setScanData(d));
        });

        setData(result.data);
        setColumn(columnArray[0]);
        setValues(values);
        // dispatch(
        //   assetsActions.updateAssets({
        //     fileData: { data: result?.data, columnArray: columnArray[0] },
        //     fileName: fileName,
        //   })
        // );
      },
    });
    // dispatch(assetsActions.updateCSVFilesList(fileName));
  };

  const operatingSystems = [
    "Android",
    "IOS",
    "Windows",
    "Linux",
    "Chrome OS",
    "Mac OS",
    "Ubuntu",
  ];

  return (
    <>
      <div className={classes.tableContainer}>
        <div>
          {/* <DropDown
            options={csvFilesNameList}
            setter={setDropDownOption}
            defaultOption={dropDownVal}
          /> */}
        </div>
        <div className={classes.header}>
          <h4>Asset Identification</h4>
          <div>
            <Button onClick={scanHandler} disable={loading}>
              Scan Networks
            </Button>
            <Button
              onClick={() => {
                setShowFileInputModal(true);
              }}
            >
              Import From CSV
            </Button>

            {user?.role.toLowerCase() === "risk analyser" && (
              <Button
                onClick={() => {
                  setEdit((prev) => {
                    if (!prev === false) {
                      toast.success("Assets updated successfully");
                    }
                    return !prev;
                  });
                }}
              >
                {edit ? "Save" : "Edit"}
              </Button>
            )}
          </div>
        </div>

        {/* {data.length !== 0 && (
          <TableSkeleton
            showDropDown
            data={data}
            columns={columnArray.map((columnVal) =>
              columnVal === "0"
                ? {
                    header: columnVal,
                    accessor: (
                      <DropDown
                        options={operatingSystems}
                        setter={setDropdownInput}
                        defaultOption={columnVal}
                      />
                    ),
                  }
                : {
                    header: columnVal,
                    accessor: columnVal,
                  }
            )}
          />
        )} */}
        {showFileInputModal && (
          <ModalSkeleton
            show={showFileInputModal}
            setShow={() => setShowFileInputModal(false)}
          >
            <CustomeFileInput
              setter={handleFile}
              inputLabelText="Upload CSV File"
            />
          </ModalSkeleton>
        )}
      </div>
    </>
  );
};

export default AssetsPageHeader;
