import { Col, List, Row } from "antd";
import "antd/dist/antd.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Scanner from "./components/scanner";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [userCurrent, setUserCurrent] = useState(null);
  const [listAttend, setListAttend] = useState([]);

  const prev = useRef("");

  useEffect(() => {
    const q = query(collection(db, "checkIns_test_4"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setListAttend(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const scan = useCallback(
    async (value) => {
      if (value === prev.current) {
        return;
      }
      prev.current = value;

      const q = query(collection(db, "users"), where("qrcode", "==", value));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (_doc) => {
        const date = moment().valueOf();
        const dateString = moment(date).format("DD-MM-YYYY").toString();
        setUserCurrent({ ..._doc.data(), checkIn: date });
        const q2 = query(
          collection(db, "checkIns_test_4"),
          where("userId", "==", _doc.data().userId)
        );
        let checkExist = false;
        for (let snap of (await getDocs(q2)).docs) {
          if (
            dateString ===
            moment(snap.data().checkIn).format("DD-MM-YYYY").toString()
          ) {
            checkExist = true;
          }
        }
        if (!checkExist) {
          console.log("zoo");
          await setDoc(doc(db, "checkIns_test_4", uuidv4()), {
            ..._doc.data(),
            checkIn: date,
          });
        }
      });
    },
    [setUserCurrent]
  );

  return (
    <div className="h-100-v d-flex align-items-center justify-content-center">
      <div className={` main-wrapper`}>
        <div>
          <div className="d-flex  ">
            <div
              className="flex-1 "
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="title-wrapper">
                <h2 className="text-green">
                  NHIỆT LIỆT CHÀO MỪNG ĐẠI BIỂU VỀ THAM DỰ
                </h2>
                <h1 className="text-red">
                  <span
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    ĐẠI HỘI ĐẠI BIỂU ĐOÀN TNCS HỒ CHÍ MINH
                  </span>{" "}
                  <br />
                  <span>QUẬN NGŨ HÀNH SƠN</span>
                  <br />
                  <span className="text-green">
                    LẦN THỨ VI, NHIỆM KỲ 2022-2027
                  </span>
                </h1>
              </div>

              <div
                className="d-flex "
                style={{
                  marginTop: "1rem",
                }}
              >
                <div
                  style={{
                    maxWidth: 300,
                    objectFit: "cover",
                  }}
                >
                  <img
                    className="w-100"
                    src={
                      userCurrent?.userImg ||
                      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                    }
                    alt=""
                  />
                </div>
                <div
                  className="flex-1"
                  style={{
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <span className="text-info">
                    <span className="text-green">Chào mừng đại biểu:</span>{" "}
                    <span
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      <span
                        className="text-red"
                        style={{
                          fontSize: 30,
                        }}
                      >
                        {" "}
                        {userCurrent?.name || ""}
                      </span>
                    </span>
                  </span>
                  <br />
                  <span className="text-info">
                    <span className="text-green">
                      Đơn vị : {userCurrent?.unit || ""}
                    </span>
                  </span>
                  <br />
                  <span className="text-info">
                    {" "}
                    <span className="text-green">
                      Thời gian:{" "}
                      {userCurrent &&
                        moment(userCurrent.checkIn).format("DD-MM-YYYY HH:mm")}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="scanner-wrapper">
              <Row className="bg-white">
                <Col span={24} className={styles.camera}>
                  <Scanner onScan={scan} />
                </Col>
                <Col span={24}>
                  <List
                    size="large"
                    className="w-100"
                    header={
                      <div>
                        Tổng đại biểu đã tham dự:{" "}
                        <b>{new Set(listAttend.map((l) => l.userId)).size}</b>{" "}
                      </div>
                    }
                    bordered
                    dataSource={listAttend.reverse() || []}
                    renderItem={(item) => (
                      <List.Item>
                        {item?.name}
                        {"   "}
                        {moment(item?.checkIn).format("DD-MM-YYYY HH:mm")}
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
