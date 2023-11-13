import React, { FunctionComponent, MouseEventHandler } from "react";
import styles from "./Search.module.scss";
import Image from "next/image";

interface ISearchProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  searchInfo: string;
  setSearchInfo: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FunctionComponent<ISearchProps> = ({
  onClick,
  searchInfo,
  setSearchInfo,
}) => {
  return (
    <div className={styles.input}>
      <input
        type={"text"}
        placeholder={"Search..."}
        value={searchInfo}
        onChange={(event) => setSearchInfo(event.target.value)}
      />
      <div className={styles.searchIcon}>
        <Image
          width={100}
          height={100}
          layout={"responsive"}
          onClick={onClick}
          src={"/resources/images/search.png"}
          alt={""}
        />
      </div>
    </div>
  );
};

export default Search;
