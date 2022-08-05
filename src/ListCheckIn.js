import { collection, onSnapshot, query } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "./firebase";

function ListCheckIn() {
  const [userCurrent, setUserCurrent] = useState(null);
  const [listAttend, setListAttend] = useState([]);
  const [unitListAttend, setUnitListAttend] = useState([]);
  let [index, setIndex] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "checkIns_test_5"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = querySnapshot.docs.map((d) => d.data());

      setUnitListAttend(Array.from(new Set(arr.map((a) => a.userId))));
      setListAttend(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (index > unitListAttend.length && unitListAttend.length > 0) {
      return;
    }
    let timer = null;
    if (unitListAttend.length > 0) {
      timer = setTimeout(() => {
        setUserCurrent(
          listAttend.find((a) => a.userId === unitListAttend[index])
        );
        setIndex((i) => i + 1);
      }, 10000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [index, unitListAttend, listAttend]);

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
                className="d-flex justify-content-center "
                style={{
                  marginTop: "2rem",
                }}
              >
                <div
                  style={{
                    maxWidth: 200,
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCheckIn;
