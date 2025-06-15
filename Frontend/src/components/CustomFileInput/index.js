import { useState } from "react";
import styles from "./CustomeFileInput.module.css";
import Button from "../Button/Button";

const CustomeFileInput = ({ setter, inputLabelText }) => {
  const [data, setData] = useState(null);
  return (
    <div className={styles.fileInputForm}>
      <input
        id="file"
        className={styles["file-input"]}
        type="file"
        accept=".csv"
        onChange={setData}
      />
      <label htmlFor="file">
        {data ? data?.target?.files[0]?.name : inputLabelText}
      </label>

      <Button
        customStyle={{ width: "50%" }}
        disable={data === null}
        onClick={() => setter(data)}
      >
        Upload
      </Button>
    </div>
  );
};

export default CustomeFileInput;
