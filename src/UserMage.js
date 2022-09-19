import { Spin } from "antd";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [unit, setUnit] = useState(tabs[0]);
  const [loading, setLoading] = useState(true);

  const handleModalUpdate = (val) => {
    if (!val) {
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    if (!unit) return;
    const q = query(collection(db, "users"), where("unit", "==", unit || ""));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      setUsers(
        arr.filter((u) =>
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
      setUnit(data[0]);
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
      <div className="user-manage-wrapper">
        <div
          style={{
            textAlign: "right",
          }}
        >
          <button
            className="btn text-danger btn-warning text-bold"
            onClick={() => setShowModalCreate(true)}
          >
            Thêm mới
          </button>
        </div>

        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <div className="d-flex align-items-center justify-content-center mb-4">
            <h3 className="pe-4 mb-0 border-text-blue text-blue flex-1">
              Tìm kiếm ( có dấu ){" "}
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
              Chọn đơn vị
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
              {tabs.map((t) => (
                <option value={t} key={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              maxHeight: "55vh",
              overflowY: "auto",
            }}
          >
            <table className="w-100">
              <thead>
                <tr>
                  <th scope="col">Ảnh</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Đơn vị</th>
                  <th scope="col">Qr code </th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>

              <tbody>
                {users.map((l) => (
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
      </div>
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
