import React, { FunctionComponent, useState } from "react";
import { Coin, Sort } from "@/app/service/Types";
import styles from "./TableHeader.module.scss";

interface ITableHeaderProps {
  objects: Coin[];
  setObjects: React.Dispatch<React.SetStateAction<Coin[]>>;
}

const TableHeader: FunctionComponent<ITableHeaderProps> = ({
  objects,
  setObjects,
}) => {
  const [sortType, setSortType] = useState<Sort>("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const changeSort = (newSortType: Sort) => {
    if (newSortType == sortType) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setObjects(objects.toReversed());
    } else {
      setSortType(newSortType);
      setSortOrder("asc");
      setObjects(
        objects.toSorted((a, b) => {
          const first = parseFloat(a[newSortType]);
          const second = parseFloat(b[newSortType]);

          if (first > second) {
            return 1;
          }
          if (first < second) {
            return -1;
          }
          return 0;
        }),
      );
    }
  };

  return (
    <thead className={styles.tableHeader}>
      <tr>
        <th onClick={() => changeSort("rank")}>
          # {sortType === "rank" ? (sortOrder === "asc" ? "▼" : "▲") : ""}
        </th>
        <th>Name</th>
        <th onClick={() => changeSort("priceUsd")}>
          Price{" "}
          {sortType === "priceUsd" ? (sortOrder === "asc" ? "▼" : "▲") : ""}
        </th>
        <th onClick={() => changeSort("changePercent24Hr")}>
          24h%{" "}
          {sortType === "changePercent24Hr"
            ? sortOrder === "asc"
              ? "▼"
              : "▲"
            : ""}
        </th>
        <th onClick={() => changeSort("marketCapUsd")}>
          Market Cap{" "}
          {sortType === "marketCapUsd" ? (sortOrder === "asc" ? "▼" : "▲") : ""}
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TableHeader;
