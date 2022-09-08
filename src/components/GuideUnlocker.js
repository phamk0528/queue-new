import React, { useEffect, useState } from "react";
import { orders } from "../data";

function splitArray(array, n) {
  let [...arr] = array;
  let res = [];
  while (arr.length) {
    res.push(arr.splice(0, n));
  }
  return res;
}
const rowsPerCol = 10;
const columns = splitArray(orders, rowsPerCol);
const dataMock = [
  // 0,
  {
    title: "Order from Kiosk",
    description: "Unlock using PIN or QR code printed on the receipt",
  },
  {
    title: "Order from KLIK",
    description: "Unlock from order screen via app",
  },
  {
    title: "Deliveroo/Foodpanda/Grab",
    description: "Unlock by entering the full Order Number",
  },
  // 0,
  1,
  2,
];

const Column = (props) => (
  <table>
    <tbody>
      <Row
        rows={props.rows}
        data={dataMock}
        ordersUpdate={props.ordersUpdate}
      />
    </tbody>
  </table>
);

const Row = ({ rows, data, ordersUpdate }) =>
  data.map((items, key) => (
    <>
      <tr key={key}>
        <td className={"colPrepare"}>
          <div className={"colPrepare_title"} style={{ color: "#f5667e" }}>
            {items?.title ?? <p style={{ color: "transparent" }}>&nbsp</p>}
          </div>
          <div className={"colPrepare_description"}>
            {items?.description ?? (
              <p style={{ color: "transparent" }}>&nbsp</p>
            )}
          </div>
        </td>
      </tr>
    </>
  ));

export const GuideUNLOCKER = (props) => {
  const { ordersPrepareLeft, ordersPrepareRight, ordersUpdate } = props;

  return (
    <table className="preparing">
      <tbody>
        <tr>
          <td>
            <Column
              rows={[0, 1, 2, 3, 4, 5, 6, 7]}
              data={ordersPrepareLeft}
              ordersUpdate={ordersUpdate}
            />
          </td>
          {/* <td>
            <Column
              rows={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
              data={ordersPrepareRight}
              ordersUpdate={ordersUpdate}
            />
          </td> */}
        </tr>
      </tbody>
    </table>
  );
};
