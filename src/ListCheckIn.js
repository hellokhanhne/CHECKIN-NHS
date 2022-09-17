import { collection, onSnapshot, query } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { db } from "./firebase";

const tabs = [
  "Đại biểu chỉ định",
  "Đoàn TNCS Hồ Chí Minh Phường Hòa Quý",
  "Đoàn TNCS Hồ Chí Minh Phường Hòa Hải",
  "Đoàn TNCS Hồ Chí Minh Trường THPT Võ Chí Công",
  "Chi đoàn Quân sự Quận Ngũ Hành Sơn",
  "Đoàn Cơ sở Công An Quận Ngũ Hành Sơn",
  "Đoàn Phường Hòa Hải",
  "Đại biểu khách mời",
  "Đoàn TNCS Hồ Chí Minh Trường PT Hermann Gmeiner",
  "Đại biểu đương nhiên",
  "Đoàn TNCS Hồ Chí Minh Phường Mỹ An",
  "Đoàn TNCS Hồ Chí Minh Phường Khuê Mỹ",
  "Đoàn Trung tâm Y tế Quận Ngũ Hành Sơn",
  "Đoàn TNCS Hồ Chí Minh Trường THPT Ngũ Hành Sơn",
];

function ListCheckIn() {
  const [listAttend, setListAttend] = useState([]);
  const [total, setTotal] = useState(0);
  const [listCountUnit, setListCountUnit] = useState([]);
  const [unit, setUnit] = useState(tabs[0]);

  useEffect(() => {
    const q = query(collection(db, "checkIns_test_5"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = querySnapshot.docs.map((d) => d.data());
      arr.sort((a, b) => a.checkIn - b.checkIn);
      const setUnitIds = new Set(arr.map((l) => l.userId));
      const setUnitArrayUser = Array.from(setUnitIds).map((id) =>
        arr.find((u) => u.userId === id)
      );
      // console.log(setUnitArrayUser);
      setTotal(setUnitIds.size);
      setListAttend(arr.filter((n) => n.unit === unit));
      const obj = setUnitArrayUser.reduce((prev, current) => {
        return prev[current.unit]
          ? { ...prev, [current.unit]: prev[current.unit] + 1 }
          : { ...prev, [current.unit]: 1 };
      }, {});
      const newListCountUnit = [];
      for (let [key, value] of Object.entries(obj)) {
        newListCountUnit.push({
          key,
          value,
        });
      }
      setListCountUnit(newListCountUnit);
    });

    return () => {
      unsubscribe();
    };
  }, [unit]);

  return (
    <div className="h-100-v d-flex align-items-center justify-content-center">
      <div className={` main-wrapper`}>
        {/* <div>
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
                {" "}
                <h2>DANH SÁCH ĐẠI BIỂU ĐÃ THAM GIA</h2>
                <div className="tabs">
                  {tabs.map((t) => (
                    <div
                      onClick={() => setUnit(t)}
                      className={`tab ${t === unit ? "active" : ""}`}
                      key={t}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div
                // className="hidden-scroll"
                style={{
                  maxHeight: 450,
                  overflowY: "scroll",
                }}
              >
                <table
                  style={{
                    marginBottom: 0,
                    marginTop: 0,
                  }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Ảnh</th>
                      <th scope="col">Tên</th>
                      <th scope="col">Email</th>
                      <th scope="col">Đã check in vào thời gian</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listAttend.map((l) => (
                      <tr key={l.id}>
                        <td>
                          <LazyLoad height={100}>
                            <img
                              src={l.userImg}
                              style={{
                                width: 150,
                                height: 100,
                                objectFit: "cover",
                              }}
                              alt=""
                            />
                          </LazyLoad>
                        </td>
                        <td>{l.name}</td>

                        <td>{l.email}</td>

                        <td>{moment(l.checkIn).format("DD-MM-YYYY HH:mm")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="statistical">
              <div
                className="d-flex  h-100"
                style={{
                  paddingLeft: 20,
                  fontSize: 18,
                }}
              >
                <div>
                  <div
                    className="title-wrapper"
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    {" "}
                    <h2
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      THỐNG KÊ
                    </h2>{" "}
                  </div>
                  <p
                    style={{
                      marginBottom: 5,
                    }}
                  >
                    Số lượng đại biểu đã tham gia :<b>{total}</b>
                  </p>
                  {listCountUnit.map((l) => (
                    <p
                      key={l.key}
                      style={{
                        marginBottom: 5,
                      }}
                    >
                      {l.key} : <b>{l.value}</b>{" "}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ListCheckIn;
