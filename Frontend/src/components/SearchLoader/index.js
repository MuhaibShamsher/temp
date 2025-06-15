import { MagnifyingGlass } from "react-loader-spinner";
import classes from "./SearchLoader.module.css";

const SearchLoader = ({ text }) => {
  return (
    <div className={classes.container}>
      <MagnifyingGlass
        visible={true}
        height="120"
        width="120"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="var(--main-color)"
      />
      <p>{text}</p>
    </div>
  );
};

export default SearchLoader;
