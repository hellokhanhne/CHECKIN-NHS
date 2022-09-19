import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { db } from "./firebase";

function ListCheckIn() {
  const [listAttend, setListAttend] = useState([]);
  const [total, setTotal] = useState(0);
  const [listCountUnit, setListCountUnit] = useState([]);
  const [tabs, setTabs] = useState([]);
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
      newListCountUnit.sort((a, b) => a.key.localeCompare(b.key));
      setListCountUnit(newListCountUnit);
    });

    return () => {
      unsubscribe();
    };
  }, [unit, tabs]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "units"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data().value);
      });
      data.sort((a, b) => a.localeCompare(b));
      setTabs(data);
    })();
  }, []);

  return (
    <div className={` main-wrapper-thong-ke`}>
      <div
        className="h-100"
        style={{
          paddingLeft: "10vw",
          paddingRight: "10vw",
          paddingTop: "20vh",
        }}
      >
        <div className="d-flex">
          <div className="flex-1">
            <div className="title-wrapper">
              {" "}
              <h2 className="border-text-blue">
                DANH SÁCH ĐẠI BIỂU ĐÃ THAM GIA
              </h2>
              <div
                style={{
                  width: "45vw",
                }}
              >
                <select
                  className="form-select"
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                >
                  {tabs.map((t) => (
                    <option value={t} key={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className="w-100 "
              style={{
                maxHeight: "50vh",
                overflowY: "scroll",
                marginTop: "3vh",
              }}
            >
              <table
                className="w-100"
                style={{
                  marginBottom: 0,
                  marginTop: 0,
                }}
              >
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên</th>

                    <th scope="col">Đã check in vào thời gian</th>
                  </tr>
                </thead>

                <tbody>
                  {listAttend.map((l, i) => (
                    <tr key={l.id}>
                      <td>{i + 1}</td>
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
                  <h2 className="border-text-blue">THỐNG KÊ</h2>{" "}
                </div>
                <p
                  style={{
                    marginBottom: 5,
                  }}
                >
                  Số lượng đại biểu đã tham gia :<b>{total}</b>
                </p>
                <hr />
                <div className="listCountUnit">
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
        </div>
      </div>
    </div>
  );
}

export default ListCheckIn;
