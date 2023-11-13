"use client";
import styles from "./Table.module.scss";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Coin, defaultCoin } from "@/app/service/Types";
import TableRow from "@/app/components/table/table-row/TableRow";
import Pagination from "@/app/components/table/pagination/Pagination";
import TableHeader from "@/app/components/table/table-header/TableHeader";
import ModalAddCoin from "@/app/components/modal-add-coin/ModalAddCoin";

interface ITableProps {
  itemsNumber: number;
  objects: Coin[];
  setObjects: React.Dispatch<React.SetStateAction<Coin[]>>;
  refreshTable: (a: number) => Promise<void>;
}

const Table: FunctionComponent<ITableProps> = ({
  itemsNumber,
  objects,
  setObjects,
  refreshTable,
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [coin, setCoin] = useState<Coin>(defaultCoin);

  useEffect(() => {
    if (coin != defaultCoin) {
      setModalVisible(true);
    }
  }, [coin]);

  return (
    <div className={styles.body}>
      <div>
        <table className={styles.cpTable}>
          <TableHeader objects={objects} setObjects={setObjects} />
          <tbody>
            {objects.map((rowContent: Coin, rowId: number) => (
              <TableRow rowContent={rowContent} key={rowId} setCoin={setCoin} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination itemsNumber={itemsNumber} refreshTable={refreshTable} />
      <ModalAddCoin
        isVisible={isModalVisible}
        setVisible={setModalVisible}
        coin={coin}
      />
    </div>
  );
};

export default Table;
