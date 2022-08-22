import React, { useEffect, useState } from "react";
import { orders } from "../data";
import logo from "../BBLogo.png";
import logoDeliveroo from "../deliveroo.png";
import logoFP from "../foodpanda.png";
import logoGrab from "../grab.png";
import logoOther from "../other_icon-1024x1024.png";

import blank_icon from "../BLANK_ICON.png";
//Function Array
function splitArray(array, n) {
  let [...arr] = array;
  let res = [];
  while (arr?.length) {
    res.push(arr.splice(0, n));
  }
  return res;
}
const rowsPerCol = 10;
const columns = splitArray(orders, rowsPerCol);

const isNumeric = (num) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN(num);

const countNumeric = (orderRef) => {
  let data = 0;
  for (let index = 0; index < orderRef?.length; index++) {
    const element = orderRef[index];
    if (isNumeric(+element)) {
      data++;
    }
  }
  return data;
};

const handleOrderRef = (orderRef) => {
  let data = "";
  let countNumber = countNumeric(orderRef);
  if (!orderRef?.toLowerCase()?.includes("gf-")) {
    if (!orderRef?.toLowerCase()?.includes("#")) {
      if (countNumber >= 4) {
        for (let index = 0; index < orderRef?.length; index++) {
          const element = orderRef[index];
          if (index !== 0 && index !== 1 && isNumeric(+element)) {
            data = data + "-";
          } else {
            data = data + element;
          }
        }
      } else {
        for (let index = 0; index < orderRef?.length; index++) {
          const element = orderRef[index];
          if (index !== 0 && isNumeric(+element)) {
            data = data + "-";
          } else {
            data = data + element;
          }
        }
      }
    } else {
      if (countNumber >= 4) {
        for (let index = 0; index < orderRef?.length; index++) {
          const element = orderRef[index];
          if (
            index !== 0 &&
            index !== 1 &&
            index !== 2 &&
            isNumeric(+element)
          ) {
            data = data + "-";
          } else {
            data = data + element;
          }
        }
      } else {
        for (let index = 0; index < orderRef?.length; index++) {
          const element = orderRef[index];
          if (index !== 0 && index !== 1 && isNumeric(+element)) {
            data = data + "-";
          } else {
            data = data + element;
          }
        }
      }
    }

    return data;
  } else {
    if (!orderRef?.toLowerCase()?.includes("#")) {
      for (let index = 0; index < orderRef?.length; index++) {
        const element = orderRef[index];
        if (countNumber < 4) {
          if (index !== 3 && isNumeric(+element)) {
            data = data + "-";
          } else {
            data = data + element;
          }
        } else {
          if (index !== 3 && index !== 4 && isNumeric(+element)) {
            data = data + "-";
          } else {
            data = data + element;
          }
        }
      }
    } else {
      for (let index = 0; index < orderRef?.length; index++) {
        const element = orderRef[index];
        if (countNumber < 4) {
          if (index !== 4 && isNumeric(+element)) {
            data = data + "-";
          } else {
            data = data + element;
          }
        } else {
          if (index !== 4 && index !== 5 && isNumeric(+element)) {
            data = data + "-";
          } else {
            data = data + element;
          }
        }
      }
    }
    return data;
  }
};

const handleOrderRefFP = (orderRef) => {
  let data = "";
  let countNumber = countNumeric(orderRef);

  if (!orderRef?.toLowerCase()?.includes("#")) {
    if (countNumber >= 4) {
      for (let index = 0; index < orderRef?.length; index++) {
        const element = orderRef[index];
        if (
          index !== orderRef?.length - 1 &&
          index !== orderRef?.length - 2 &&
          isNumeric(+element)
        ) {
          data = data + "-";
        } else {
          data = data + element;
        }
      }
    } else {
      for (let index = 0; index < orderRef?.length; index++) {
        const element = orderRef[index];
        if (index !== orderRef?.length - 1 && isNumeric(+element)) {
          data = data + "-";
        } else {
          data = data + element;
        }
      }
    }
  } else {
    if (countNumber >= 4) {
      for (let index = 0; index < orderRef?.length; index++) {
        const element = orderRef[index];
        if (
          index !== orderRef?.length - 1 &&
          index !== orderRef?.length - 2 &&
          index !== 0 &&
          isNumeric(+element)
        ) {
          data = data + "-";
        } else {
          data = data + element;
        }
      }
    } else {
      for (let index = 0; index < orderRef?.length; index++) {
        const element = orderRef[index];
        if (
          index !== orderRef?.length - 1 &&
          index !== 0 &&
          isNumeric(+element)
        ) {
          data = data + "-";
        } else {
          data = data + element;
        }
      }
    }
  }
  // for (let index = 0; index < orderRef?.length; index++) {
  //   const element = orderRef[index];
  //   if(index !==  orderRef?.length-1 && isNumeric(+element)){
  //     data= data+'-'
  //   }else{
  //     data= data+element
  //   }
  // }
  return data;
};

const Column = (props) => (
  <table>
    <tr>
      <th className="colImg"></th>
      <th className="colRef" align="left">
        Store
      </th>
      <th className="colPin">Order #</th>
      <th className="colPin">Locker</th>
    </tr>
    <tbody>
      <Row
        rows={props.rows}
        data={props?.data}
        ordersUpdate={props?.ordersUpdate}
      />
    </tbody>
  </table>
);

const ColumnPortraitTv = (props) => (
  <table>
    <tr>
      <th className="colImg"></th>
      <th className="colRef" align="left">
        Store
      </th>
      <th className="colPin">Order #</th>
      <th className="colLocker">Locker</th>
    </tr>
    <tbody>
      <RowPortraitTv
        rows={props.rows}
        data={props?.data}
        ordersUpdate={props?.ordersUpdate}
      />
    </tbody>
  </table>
);

const RowPortraitTv = ({ rows, data, ordersUpdate }) =>
  rows.map((items, key) => (
    <tr key={key}>
      <td className="colImgPortraitTv">
        <img
          alt="logo"
          src={
            data[items]?.ofo === "kiosk" || data[items]?.ofo === "app"
              ? logo
              : data[items]?.ofo === "deliveroo"
              ? logoDeliveroo
              : data[items]?.ofo === "foodpanda"
              ? logoFP
              : data[items]?.ofo === "grab"
              ? logoGrab
              : data[items]?.ofo
              ? logoOther
              : blank_icon
          }
          height="72px"
          width="72px"
        />
      </td>
      <td
        className={
          ordersUpdate.includes(data[items]?.id)
            ? "colRefPortraitTvBranchName blink_me"
            : "colRefPortraitTvBranchName"
        }
        style={{
          color: "white",
        }}
        align="left"
      >
        {data[items]?.branch?.name ? (
          data[items]?.branch?.name?.split("@")[0].substr(0, 15)
        ) : (
          <p style={{ color: "transparent" }}></p>
        )}
        {data[items]?.branch?.name
          ? data[items]?.branch?.name?.split("@")[0]?.length > 15
            ? "..."
            : ""
          : null}
      </td>

      <td
        className={
          ordersUpdate.includes(data[items]?.id)
            ? "colOrderRefPortraitTv blink_me"
            : "colOrderRefPortraitTv"
        }
        style={{
          color: "white",
        }}
        align="center"
      >
        {data[items]?.ofo === "kiosk" || data[items]?.ofo === "app" ? (
          data[items]?.orderRef
        ) : data[items]?.ofo !== "foodpanda" ? (
          handleOrderRef(data[items]?.orderRef)
        ) : data[items]?.ofo === "foodpanda" ? (
          handleOrderRefFP(data[items]?.orderRef)
        ) : (
          <p style={{ color: "transparent" }}></p>
        )}
      </td>
      <td
        className={
          ordersUpdate.includes(data[items]?.id)
            ? "colPinPortraitTv blink_me"
            : "colPinPortraitTv"
        }
        style={{
          color: "white",
        }}
        align="center"
      >
        {data[items]?.lockerNumber ?? (
          <p style={{ color: "transparent" }}>&nbsp</p>
        )}
      </td>
    </tr>
  ));

const Row = ({ rows, data, ordersUpdate }) =>
  rows.map((items, key) => (
    <tr key={key}>
      <td className="colImg">
        <img
          alt="logo"
          src={
            data[items]?.ofo === "kiosk" || data[items]?.ofo === "app"
              ? logo
              : data[items]?.ofo === "deliveroo"
              ? logoDeliveroo
              : data[items]?.ofo === "foodpanda"
              ? logoFP
              : data[items]?.ofo === "grab"
              ? logoGrab
              : data[items]?.ofo
              ? logoOther
              : blank_icon
          }
          height="72px"
          width="72px"
        />
      </td>
      <td
        className={
          ordersUpdate.includes(data[items]?.id)
            ? "colNameBranch blink_me"
            : "colNameBranch"
        }
        style={{
          color: "white",
        }}
        align="left"
      >
        {data[items]?.branch?.name ? (
          data[items]?.branch?.name?.split("@")[0].substr(0, 15)
        ) : (
          <p style={{ color: "transparent" }}></p>
        )}
        {data[items]?.branch?.name
          ? data[items]?.branch?.name?.split("@")[0]?.length > 15
            ? "..."
            : ""
          : null}
      </td>

      <td
        className={
          ordersUpdate.includes(data[items]?.id)
            ? "colPinNew blink_me"
            : "colPinNew"
        }
        style={{
          color: "white",
        }}
        align="center"
      >
        {data[items]?.ofo === "kiosk" || data[items]?.ofo === "app" ? (
          data[items]?.orderRef
        ) : data[items]?.ofo !== "foodpanda" ? (
          handleOrderRef(data[items]?.orderRef)
        ) : data[items]?.ofo === "foodpanda" ? (
          handleOrderRefFP(data[items]?.orderRef)
        ) : (
          <p style={{ color: "transparent" }}></p>
        )}
      </td>

      <td
        className={
          ordersUpdate.includes(data[items]?.id)
            ? "colClockerNew blink_me"
            : "colClockerNew"
        }
        style={{
          color: "white",
        }}
        align="center"
      >
        {data[items]?.lockerNumber ?? (
          <p style={{ color: "transparent" }}>&nbsp</p>
        )}
      </td>
    </tr>
  ));

export const Ready = (props) => {
  const { ordersReadyToCollectLeft, ordersReadyToCollectRight, ordersUpdate } =
    props;
  return (
    <table className="ready">
      <tbody>
        <tr>
          <td>
            <Column
              rows={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              data={ordersReadyToCollectLeft}
              ordersUpdate={ordersUpdate}
            />
          </td>
          {/* <td>
            <Column
              rows={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              data={ordersReadyToCollectRight}
              ordersUpdate={ordersUpdate}
            />
          </td> */}
        </tr>
      </tbody>
    </table>
  );
};

export const ReadyPortraitTv = (props) => {
  const { ordersReadyToCollectLeft, ordersReadyToCollectRight, ordersUpdate } =
    props;
  return (
    <table className="readyPortraitTv">
      <tbody>
        <tr>
          <td>
            <ColumnPortraitTv
              rows={[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20,
              ]}
              data={[...ordersReadyToCollectLeft, ...ordersReadyToCollectRight]}
              ordersUpdate={ordersUpdate}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
