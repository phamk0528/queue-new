import React, { useEffect, useState } from "react";
import { orders } from "../data";
import logo from "../BBLogo.png";
import logoDeliveroo from "../deliveroo.png";
import logoFP from "../foodpanda.png";
import logoGrab from "../grab.png";
import logoOther from "../other_icon-1024x1024.png";
import blank_icon from "../BLANK_ICON.png";

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
      <th className="colStore">Store</th>
      <th className="colRef">Order #</th>
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
            ? "colNameBranchPreparing blink_me"
            : "colNameBranchPreparing"
        }
        style={{
          color: "white",
        }}
        align="left"
      >
        {data[items]?.branch?.name ? (
          data[items]?.branch?.name?.split("@")[0].substr(0, 10)
        ) : (
          <p style={{ color: "transparent" }}></p>
        )}
        {data[items]?.branch?.name
          ? data[items]?.branch?.name?.split("@")[0]?.length > 10
            ? "..."
            : ""
          : null}
      </td>
      <td
        className={
          ordersUpdate.includes(data[items]?.id) ? "colRef blink_me" : "colRef"
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
        ) : data[items]?.ofo == "foodpanda" ? (
          handleOrderRefFP(data[items]?.orderRef)
        ) : (
          <p style={{ color: "transparent" }}></p>
        )}
      </td>
    </tr>
  ));

export const Preparing = (props) => {
  const {
    ordersPrepareMiddle,
    ordersPrepareRight,
    ordersPrepareLeft,
    ordersUpdate,
  } = props;
  return (
    <table className="ready-preparing">
      <tbody>
        <tr>
          <td>
            <Column
              rows={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              data={ordersPrepareLeft}
              ordersUpdate={ordersUpdate}
            />
          </td>
          <td>
            <Column
              rows={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              data={ordersPrepareMiddle}
              ordersUpdate={ordersUpdate}
            />
          </td>
          {/* <td>
            <Column
              rows={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              data={ordersPrepareRight}
              ordersUpdate={ordersUpdate}
            />
          </td> */}
        </tr>
      </tbody>
    </table>
  );
};
