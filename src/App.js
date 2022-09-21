import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Scanner from "./components/scanner";
import { db } from "./firebase";
import demoImage from "../src/demo.png";

function App() {
  const [userCurrent, setUserCurrent] = useState(null);
  const [listAttend, setListAttend] = useState([]);

  const prev = useRef("");

  useEffect(() => {
    const q = query(collection(db, "checkIns_test_5"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      arr.sort((a, b) => b.checkIn - a.checkIn);

      setListAttend(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const scan = useCallback(
    async (value) => {
      console.log(value === prev.current);
      if (value === prev.current) {
        return;
      }
      prev.current = value;

      console.log(value)

      const q = query(collection(db, "users"), where("qrcode", "==", value || "" ));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (_doc) => {
        // console.log(_doc.data())
        const date = moment().valueOf();
        const dateString = moment(date).format("DD-MM-YYYY").toString();
        setUserCurrent({ ..._doc.data(), checkIn: date });
        const q2 = query(
          collection(db, "checkIns_test_5"),
          where("qrcode", "==", _doc.data().qrcode) 
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
          await setDoc(doc(db, "checkIns_test_5", uuidv4()), {
            ..._doc.data(),
            checkIn: date,
          });
        }
      });
    },
    [setUserCurrent]
  );

  return (
    <div className={` main-wrapper position-relative`}>
      <div
        className="w-100 h-100 d-flex align-items-center justify-content-between"
        style={{
          padding: "0 10vw",
          paddingRight: "11vw"
        }}
      >
        <div
          style={{
            width: "33%",
            height: "56vh",
            transform: "translateY(-2vh)",
            objectFit: "fill",
            borderRadius: "1rem",
            overflow: "hidden",
            border: ".4vw solid #64dafb",
          }}
        >
          <img
            src={userCurrent?.userImg || demoImage}
            style={{}}
            className="w-100 h-100"
            alt=""
          />
        </div>
        <div
          className="d-flex flex-column"
          style={{
            width: "33%",
            height: "56vh",
            transform: "translateY(-2vh)",
            objectFit: "fill",
            borderRadius: "1rem",
            border: ".4vw solid #64dafb",
          }}
        >
          <Scanner onScan={scan} />
          <div
            className=" flex-1 d-flex align-items-start px-2 checkIn-info-wrap"
            style={{
              maxHeight: "27vh",
              overflowY: "auto",
            }}
          >
            <div
              className="text-center w-100  d-flex flex-column justify-content-center persion-info "
              style={{
                padding: "1vw 0rem",
              }}
            >
              <h1
                className="font-title-medium border-text-white text-red"
                style={{
                  marginBottom: "1.75vh",
                
                }}
              >
                NHIỆT LIỆT CHÀO MỪNG ĐẠI BIỂU
              </h1>
              <h1
                className="font-title-medium border-text-red font-large text-white"
                style={{
                  marginBottom: "1.15vh",
                  padding: "0 .75vw",
                  lineHeight : 1.55
                }}
              >
                {userCurrent?.name || "NGUYỄN VĂN A"}
              </h1>
              <h2
                className="font-title-medium border-text-white text-green"
                style={{
                  textTransform: "uppercase",
                  marginBottom: "1.15vh",
                  padding: "0 1.25vw",
                  lineHeight : 1.55
                }}
              >
                {userCurrent?.unit ||
                  "Đoàn A"}
              </h2>
              <h2 className="font-title-medium border-text-white text-red ">
                ĐÃ VỀ THAM DỰ ĐẠI HỘI
              </h2>
              {/* <h2 className=" text-pink font-title-medium border-text-white">
                VỊ TRÍ GHẾ NGỒI PHIÊN 1: {userCurrent?.seat1 || "00"}
              </h2>
              <h2 className=" text-pink font-title-medium border-text-white">
                VỊ TRÍ GHẾ NGỒI PHIÊN 2: {userCurrent?.seat2 || "00"}
              </h2> */}
            </div>
          </div>
        </div>
      </div>
      <div
        className="position-absolute w-100"
        style={{
          bottom: "2.35vh",
        }}
      >
        <div className="text-center">
          <h1 className=" border-text-blue font-large text-blue mb-0 ">
            TỔNG SỐ ĐẠI BIỂU THAM DỰ :{" "}
            {new Set(listAttend.map((l) => l.qrcode)).size}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
