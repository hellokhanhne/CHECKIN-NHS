import { Button } from "antd";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import CommonBottom from "./components/CommonBottom";
import { db } from "./firebase";

function ListCheckIn() {
  const [listAttend, setListAttend] = useState([]);
  const [total, setTotal] = useState({
    totalJoin: 0,
    total: 0,
  });
  const [listCountUnit, setListCountUnit] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [unit, setUnit] = useState("All");
  const [isJoin, setIsJoin] = useState(true);
  // const [analysis, setAnalysis] = useState()

  useEffect(() => {
    const q = query(collection(db, "checkIns_test_5"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const arr = querySnapshot.docs.map((d) => d.data());

      const querySnapshot_2 = await getDocs(collection(db, "users"));

      if (!isJoin) {
        const data_user_notcheckin = [];
        querySnapshot_2.forEach((doc) => {
          if (!arr.find((r) => r.qrcode === doc.data().qrcode)) {
            data_user_notcheckin.push(doc.data());
          }
        });
        setListAttend(
          data_user_notcheckin.filter((n) =>
            unit === "All" ? true : n.unit === unit
          )
        );
      }

      if (isJoin) {
        arr.sort((a, b) => a.checkIn - b.checkIn);
        setListAttend(
          arr.filter((n) => (unit === "All" ? true : n.unit === unit))
        );
      }

      const setUnitIds = new Set(arr.map((l) => l.qrcode));
      const setUnitArrayUser = Array.from(setUnitIds).map((id) =>
        arr.find((u) => u.qrcode === id)
      );

      setTotal({
        totalJoin: setUnitIds.size,
        total: querySnapshot_2.size,
      });

      const obj = setUnitArrayUser.reduce((prev, current) => {
        return prev[current.unit]
          ? { ...prev, [current.unit]: prev[current.unit] + 1 }
          : { ...prev, [current.unit]: 1 };
      }, {});

      const newListCountUnit = [];
      for (let [key, value] of Object.entries(obj)) {
        newListCountUnit.push({
          key,
          value: {
            data: value,
            totalItemsUnit: querySnapshot_2.docs
              .map((d) => d.data())
              .reduce((t, c) => {
                return c.unit === key ? t + 1 : t;
              }, 0),
          },
        });
      }
      newListCountUnit.sort((a, b) => a.key.localeCompare(b.key));

      setListCountUnit(newListCountUnit);
    });

    return () => {
      unsubscribe();
    };
  }, [unit, tabs, isJoin]);

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
              <h2 className="border-text-blue">DANH S??CH ?????I BI???U</h2>
              <div
                style={{
                  width: "52vw",
                  alignItems: "center",
                }}
                className="d-flex"
              >
                <select
                  className="form-select w-100 "
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                >
                  <option value="All">T???t c???</option>
                  {/* <option value="??o??n TNCS H??? Ch?? Minh Huy???n H??a Vang">"??o??n TNCS H??? Ch?? Minh Huy???n H??a Vang"</option> */}
                  {tabs.map((t) => (
                    <option value={t} key={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="d-flex ms-2">
                  <Button
                    onClick={() => setIsJoin(true)}
                    type={isJoin ? "primary" : "dashed"}
                    className="me-2"
                  >
                    ???? tham gia
                  </Button>
                  <Button
                    onClick={() => setIsJoin(false)}
                    type={!isJoin ? "primary" : "dashed"}
                  >
                    Ch??a tham gia
                  </Button>
                </div>
              </div>
            </div>
            <div
              className="w-100 "
              style={{
                maxHeight: "56.25vh",
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
                    <th scope="col">???nh</th>
                    <th scope="col">T??n</th>

                    <th scope="col">???? check in v??o th???i gian</th>
                  </tr>
                </thead>

                <tbody>
                  {listAttend.map((l, i) => (
                    // <LazyLoad key={i} height={200} offset={100}>
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        {/* <LazyLoad height={100}> */}
                        <img
                          src={l.userImg}
                          style={{
                            width: 150,
                            height: 100,
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                        {/* </LazyLoad> */}
                      </td>
                      <td>{l.name}</td>

                      <td>
                        {l.checkIn
                          ? moment(l.checkIn).format("DD-MM-YYYY HH:mm")
                          : "Ch??a check in"}
                      </td>
                    </tr>
                    // </LazyLoad>
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
                  <h2 className="border-text-blue">TH???NG K??</h2>{" "}
                </div>
                <p
                  style={{
                    marginBottom: 5,
                  }}
                >
                  S??? l?????ng ?????i bi???u ???? tham gia :
                  <b className="ms-1">
                    {total.totalJoin} / {total.total}
                  </b>
                </p>
                <hr />
                <div className="listCountUnit">
                  {listCountUnit.map((l, i) => (
                    <p
                      key={i}
                      style={{
                        marginBottom: 5,
                      }}
                    >
                      {l.key} :{" "}
                      <b className="ms-1">
                        {l.value.data} / {l.value.totalItemsUnit}
                      </b>{" "}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonBottom
        styleRight={{
          paddingBottom: ".5rem",
        }}
      />
    </div>
  );
}

export default ListCheckIn;
