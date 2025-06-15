import Papa from "papaparse";
import { useState } from "react";
import Button from "../Button/Button";
import CustomeFileInput from "../CustomFileInput";
import DropDown from "../DropDown";
import Modal from "../Modal/Modal";
import TableSkeleton from "../TableSkeleton/TableSkeleton";
import classes from "./RisksPageHeader.module.css";

const AlertsPageHeader = ({
  setDropDownOption,
  dropDownVal,
  scanHandler,
  loading,
}) => {
  // const { csvFilesNameList } = useSelector((state) => state.assets);
  const [showFileInputModal, setShowFileInputModal] = useState(false);
  const [dropdownInput, setDropdownInput] = useState();
  const [data, setData] = useState([]);
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
          <h4>Alarms Set</h4>
          <div>
            <Button onClick={scanHandler} disable={loading}>
              Scan Alarms
            </Button>
          </div>
        </div>

        {data.length !== 0 && (
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
        )}
        {showFileInputModal && (
          <Modal onClose={() => setShowFileInputModal(false)}>
            <CustomeFileInput
              setter={handleFile}
              inputLabelText="Upload CSV File"
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default AlertsPageHeader;
