import { collection, onSnapshot, query } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "./firebase";

function ListCheckIn() {
  const [listAttend, setListAttend] = useState([]);
  const [listCountUnit, setListCountUnit] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "checkIns_test_5"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = querySnapshot.docs.map((d) => d.data());
      arr.sort((a, b) => a.checkIn - b.checkIn);
      setListAttend(arr);
      const obj = arr.reduce((prev, current) => {
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
  }, []);

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
                {" "}
                <h2>DANH SÁCH ĐẠI BIỂU ĐÃ THAM GIA</h2>{" "}
              </div>
              <div
                // className="hidden-scroll"
                style={{
                  maxHeight: 500,
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

                      <th scope="col">Đoàn</th>
                      <th scope="col">Đã check in</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listAttend.map((l) => (
                      <tr key={l.id}>
                        <td>
                          <img
                            src={l.userImg}
                            style={{
                              width: 150,
                              height: 100,
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                        </td>
                        <td>{l.name}</td>

                        <td>{l.unit}</td>
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
                    Số lượng đại biểu đã tham gia :{" "}
                    <b>
                      {
                        Array.from(new Set(listAttend.map((l) => l.userId)))
                          .length
                      }
                    </b>
                  </p>
                  {listCountUnit.map((l) => (
                    <p
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
        </div>
      </div>
    </div>
  );
}

export default ListCheckIn;
