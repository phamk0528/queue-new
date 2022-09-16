import "../App.css";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Ready, ReadyPortraitTv } from "../components/Ready";
import { GuideUNLOCKER } from "../components/GuideUnlocker";
import { useQuery } from "../hooks/useQuery";
import differenceBy from "lodash.differenceby";
import { getContentQueue } from "../services/cmsApi/queue";
import { queryQueue } from "../services/api/queue";
import isEqual from "lodash.isequal";
import ReactTextTransition, { presets } from "react-text-transition";
import ReactAudioPlayer from "react-audio-player";
import { Preparing } from "../components/Preparing";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ReactPlayer from "react-player";
import { useAudioPlayer } from "react-use-audio-player";

const AudioPlayerNew = ({ file }) => {
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: file,
    format: "mp3",
    autoplay: false,
    onend: () => console.log("sound has ended!"),
  });

  if (!ready && !loading) return <div>No audio to play</div>;
  if (loading) return <div>Loading audio</div>;

  return (
    <div>
      <div
        style={{
          width: 100,
          height: 50,
          backgroundColor: "black",
          alignItems: "center",
          color: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={togglePlayPause}
      >
        Play Button 4
      </div>
    </div>
  );
};
function QueueView() {
  let query = useQuery();
  const [level, setLevel] = useState(query.get("level"));
  const [locationId, setLocationId] = useState(query.get("location"));
  const [status, setStatus] = useState("readyToPickup");

  const [isPortrait, setIsPortrait] = useState(false);
  const [muted, setMuted] = useState(true);
  const [muted1, setMuted1] = useState(true);
  const [muted2, setMuted2] = useState(true);
  const [ordersPrepareLeft, setOrdersPrepareLeft] = useState([]);
  const [ordersPrepareRight, setOrdersPrepareRight] = useState([]);
  const [ordersPrepareMiddle, setOrdersPrepareMiddle] = useState([]);
  const [ordersReadyToCollectLeft, setOrdersReadyToCollectLeft] = useState([]);
  const [ordersReadyToCollectRight, setOrdersReadyToCollectRight] = useState(
    []
  );

  const inputEl2 = useRef();

  const [ordersUpdate, setOrderupdate] = useState([]);
  const [advertisement, setAdvertisement] = useState([]);
  const [advertisementText, setAdvertisementText] = useState([]);

  const getQueueLcd = async () => {
    var lastMidnight = new Date().setHours(0, 0, 0, 0);
    var nextMidnight = new Date().setHours(24, 0, 0, 0);
    setOrderupdate([]);
    const date = new Date(lastMidnight).toISOString();
    const toDate = new Date(nextMidnight).toISOString();
    const data = await queryQueue(date, toDate, level, locationId, [
      "ACCEPTED",
      "PREPARING",
      "READY_TO_COLLECT",
      "CONSOLIDATING",
    ]);

    const dataAtLocker = await queryQueue(date, toDate, level, locationId, [
      "AT_LOCKER",
    ]);

    let orderPrepareLeft = await data?.lcdOrders
      .sort((a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt))
      .slice(0, 11);

    let orderPrepareMiddle = await data?.lcdOrders
      .sort((a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt))
      .slice(11, 23);
    console.log("orderPrepareMiddle", orderPrepareMiddle);
    let orderPrepareRight = await data?.lcdOrders
      .sort((a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt))
      .slice(23, 35);

    let orderReadyToCollectRight = await dataAtLocker?.lcdOrders
      .sort((a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt))
      .slice(10, 21);

    let orderReadyToCollectLeft = await dataAtLocker?.lcdOrders
      .sort((a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt))
      .slice(0, 10);

    let dataOld = (await JSON.parse(localStorage.getItem("orderData"))) ?? [];
    let dataNew = [
      ...orderPrepareLeft,
      ...orderPrepareRight,
      ...orderReadyToCollectRight,
      ...orderReadyToCollectLeft,
      ...orderPrepareMiddle,
    ];
    let difference = differenceBy(dataNew, dataOld, "id").map((x) => x?.id);

    await localStorage.setItem("orderData", JSON.stringify([...dataNew]));

    setOrderupdate(difference);

    setOrdersPrepareRight((pre) => {
      return orderPrepareRight;
    });
    setOrdersPrepareLeft((pre) => {
      return orderPrepareLeft;
    });
    setOrdersPrepareMiddle((pre) => {
      return orderPrepareMiddle;
    });

    setOrdersReadyToCollectRight((pre) => {
      if (
        !isEqual(orderReadyToCollectRight, pre) &&
        status === "readyToPickup"
      ) {
        let differenceReady = differenceBy(orderReadyToCollectRight, pre, "id");
        if (
          orderReadyToCollectRight?.length >= pre ||
          differenceReady.length > 0
        ) {
          setMuted(false);
        }
        setMuted(false);
      }

      return orderReadyToCollectRight;
    });

    setOrdersReadyToCollectLeft((pre) => {
      if (
        !isEqual(orderReadyToCollectLeft, pre) &&
        status === "readyToPickup"
      ) {
        let differenceReady = differenceBy(orderReadyToCollectLeft, pre, "id");
        if (
          orderReadyToCollectLeft?.length >= pre ||
          differenceReady.length > 0
        ) {
          setMuted(false);
        }
      }
      return orderReadyToCollectLeft;
    });
  };
  useEffect(() => {
    if (!muted) {
      const timer = setTimeout(() => {
        setMuted(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [muted]);

  useEffect(() => {
    let levelQuery = query.get("level");
    let locationQuery = query.get("location");
    let statusQuery = query.get("status");
    let isPortraitTv = query.get("isPortraitTv");

    if (levelQuery) {
      setLevel(levelQuery);
    }
    if (locationQuery) {
      setLocationId(locationQuery);
    }
    if (statusQuery) {
      setStatus(statusQuery);
    }

    if (isPortraitTv) {
      setIsPortrait(true);
      setStatus("readyToPickup");
    }
  }, [query.get("location"), query.get("level")]);

  useEffect(() => {
    console.log("RUNN");

    getQueueLcd();
    const interval = setInterval(() => {
      getQueueLcd();
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, [level, locationId]);

  const getContentQueueCMS = async () => {
    try {
      let result = await getContentQueue();
      setAdvertisement(result?.Advertisement);
      let text = JSON.parse(result?.promotion_text);
      setAdvertisementText(text);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getContentQueueCMS();
  }, []);

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((pre) => pre + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const ReactAudioPlayerElement3 = useMemo(
    () => (
      <>
        <ReactPlayer
          playing
          url={["/doorbell-loud.mp3"]}
          volume={1}
          muted={muted}
          width="100%"
          height="100%"
          loop={true}
          ref={inputEl2}
        />
      </>
    ),
    [muted]
  );

  return (
    <>
      {ReactAudioPlayerElement3}
      {!isPortrait ? (
        <table className="container">
          <th
            className={
              status === "readyToPickup"
                ? "ready_header"
                : "ready_header_preparing"
            }
            align="center"
          >
            <div className="ready_header_title_button">
              {status === "readyToPickup" ? "Ready To Pickup" : "Preparing"}
            </div>
          </th>
          {status === "readyToPickup" ? (
            <th className="ready_prepare" align="center"></th>
          ) : null}
          <tbody>
            <tr>
              {/* Ready */}
              <td>
                {status === "readyToPickup" ? (
                  <Ready
                    ordersReadyToCollectLeft={ordersReadyToCollectLeft}
                    ordersReadyToCollectRight={ordersReadyToCollectRight}
                    ordersUpdate={ordersUpdate}
                  />
                ) : (
                  <Preparing
                    ordersPrepareLeft={ordersPrepareLeft}
                    ordersPrepareRight={ordersPrepareRight}
                    ordersPrepareMiddle={ordersPrepareMiddle}
                    ordersUpdate={ordersUpdate}
                  />
                )}

                {/* <th className="footer_container" align="center">
          {advertisementText.length > 0 ? (
            <ReactTextTransition
              text={
                advertisementText[textIndex % advertisementText.length]
              }
              springConfig={presets.gentle}
              style={{
                margin: "0 4px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
              inline
            />
          ) : null}
        </th> */}
              </td>
              {/* Preparing */}
              {status === "readyToPickup" ? (
                <td>
                  <GuideUNLOCKER
                    ordersPrepareLeft={ordersPrepareLeft}
                    ordersPrepareRight={ordersPrepareRight}
                    ordersUpdate={ordersUpdate}
                  />
                </td>
              ) : null}
            </tr>
          </tbody>
        </table>
      ) : (
        <table
          className="container"
          style={{
            transform: "rotate(270deg)",
            transformOrigin: "top left",
            top: "100vh",
            height: "100vw",
            width: "100vh",
            position: "absolute",
          }}
        >
          <th className="ready_header_portraitTv" align="center">
            <div className="ready_header_title_button_portraiTV">
              {status === "readyToPickup" ? "Ready To Pickup" : "Preparing"}
            </div>
          </th>

          <tbody>
            <tr>
              {/* Ready */}
              <td>
                <ReadyPortraitTv
                  ordersReadyToCollectLeft={ordersReadyToCollectLeft}
                  ordersReadyToCollectRight={ordersReadyToCollectRight}
                  ordersUpdate={ordersUpdate}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default QueueView;
