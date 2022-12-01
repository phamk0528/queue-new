import { myFetcher } from "../request";

export const queryQueue = async (
  fromDate,
  toDate,
  level,
  locationID,
  statuses
) => {
  try {
    const myQuery = `query{
        lcdOrders(locationID:${locationID},filter:{
            statuses:[${statuses}],         
            fromDate:"${fromDate}"
            toDate:"${toDate}",
            branchGroupID:1
          },level:${level}){
            id orderType lockerNumber status pin orderRef updatedAt ofo 
            branch{
              photo coverPhoto id name
            }
          }
          }`;
    const data = await myFetcher(myQuery);
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
