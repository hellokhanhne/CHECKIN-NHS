import { Spin } from "antd";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminWrappter from "./components/AdminWrappter";
import CreateUserModal from "./components/CreateUserModalx";
import UpdateUserModal from "./components/UpdateUserModal";
import { db } from "./firebase";
import useDebounce from "./hooks/useDebounce";

const UserMage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectUser, setSelectedUser] = useState(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [tabs, setTabs] = useState([]);
  const debouncedValue = useDebounce(search, 500);
  const [unit, setUnit] = useState("All");
  const [loading, setLoading] = useState(true);

  const handleModalUpdate = (val) => {
    if (!val) {
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    if (!unit) return;
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

  

      arr.sort(
        (a, b) =>
          Number(a?.qrcode?.split("DHXIXTPDN")[1]) -
          Number(b?.qrcode?.split("DHXIXTPDN")[1])
      );

      setUsers(
        arr.filter(
          (u) =>
            (unit === "All" ? true : u.unit === unit) &&
            u.name.toUpperCase().includes(debouncedValue.toUpperCase())
        )
      );
    });
    return () => {
      unsubscribe();
    };
  }, [debouncedValue, unit]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "units"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data().value);
      });
      data.sort((a, b) => a.localeCompare(b));
      setTabs(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,.3)",
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <ToastContainer />
      <AdminWrappter>
        <div
          style={{
            textAlign: "right",
          }}
        >
          <button
            className="btn text-danger btn-warning text-bold"
            onClick={() => setShowModalCreate(true)}
          >
            Th??m m???i
          </button>
        </div>

        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <div className="d-flex align-items-center justify-content-center mb-4">
            <h3 className="pe-4 mb-0 border-text-blue text-blue flex-1">
              T??m ki???m ( c?? d???u ){" "}
            </h3>
            <input
              className="form-control"
              type="text"
              style={{
                maxWidth: "75%",
              }}
              value={search}
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              id=""
            />
          </div>
          <div className="d-flex align-items-center justify-content-center mb-4">
            <h3 className="pe-4 mb-0 border-text-blue text-blue flex-1">
              Ch???n ????n v???
            </h3>
            <select
              className="form-select"
              value={unit}
              style={{
                maxWidth: "75%",
              }}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            >
              <option value="All">T???t c???</option>
              {tabs.map((t) => (
                <option value={t} key={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              maxHeight: "57.25vh",
              overflowY: "auto",
            }}
          >
            <table className="w-100">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">???nh</th>
                  <th scope="col">T??n</th>
                  <th scope="col">????n v???</th>
                  <th scope="col">Qr code </th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>

              <tbody>
                {users.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
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
                    <td>{l.qrcode} </td>
                    <td>
                      <button
                        className="btn  btn-secondary"
                        onClick={() => setSelectedUser(l)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminWrappter>
      {/* modal  */}

      <CreateUserModal
        modalIsOpen={showModalCreate}
        setIsOpen={setShowModalCreate}
      />

      <UpdateUserModal
        modalIsOpen={Boolean(selectUser)}
        setIsOpen={handleModalUpdate}
        initForm={selectUser}
      />
    </>
  );
};

export default UserMage;
