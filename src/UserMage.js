import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { db } from "./firebase";
import Button from "./components/button";
import "react-toastify/dist/ReactToastify.css";

const UserMage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const [form, setForm] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetForm = (payload) => {
    setForm(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form) return;
    const usersRef = doc(db, "users", form.id);
    const { group, seat1, seat2, qrcode, type, userImg } = form;
    setDoc(
      usersRef,
      {
        group,
        seat1,
        seat2,
        qrcode,
        type,
        userImg,
      },
      { merge: true }
    );
    toast.success("Cập nhật thành công !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setForm(null);
  };

  const handleCancel = () => {
    setForm(undefined);
  };

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      setUsers(
        arr.filter(
          (u) =>
            u.name.toUpperCase().includes(search.toUpperCase()) &&
            (!active ? true : !u.qrcode)
        )
      );
    });
    return () => {
      unsubscribe();
    };
  }, [search, active]);

  return (
    <div className="user-manage-wrapper">
      <div>
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button text="THÊM MỚI" bold />
        </div>
      </div>
      {/* <div
        style={{
          marginTop: "2rem",
        }}
      >
        <ToastContainer />
        {form && (
          <div className="form-wrapper">
            <div>
              <form onSubmit={handleSubmit}>
                <p>Tên </p>
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  disabled
                  value={form.name}
                />
                <p>Nhóm </p>
                <input
                  type="text"
                  onChange={handleChange}
                  name="group"
                  value={form.group}
                />
                <p>Seat1 </p>
                <input
                  type="text"
                  onChange={handleChange}
                  name="seat1"
                  value={form.seat1}
                />
                <p>Seat2 </p>
                <input
                  type="text"
                  onChange={handleChange}
                  name="seat2"
                  value={form.seat2}
                />
                <p>QR code </p>
                <input
                  type="text"
                  onChange={handleChange}
                  name="qrcode"
                  value={form.qrcode}
                />
                <p>Type </p>
                <input
                  type="text"
                  onChange={handleChange}
                  name="type"
                  value={form.type}
                />
                <p>Image </p>
                <input
                  type="text"
                  onChange={handleChange}
                  name="userImg"
                  value={form.userImg}
                />
                <div
                  className="d-flex align-items-center"
                  style={{
                    marginTop: "1rem",
                    marginBottom: "3rem",
                    justifyContent: "space-between",
                  }}
                >
                  <button type="submit" className="edit btn-primary">
                    Save
                  </button>
                  <button className="edit btn-danger" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="d-flex align-items-center justify-content-center mb-4">
          <h3 className="pe-4">Tìm kiếm ( có dấu ) </h3>
          <input
            type="text"
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            id=""
          />
        </div>
        <div className="d-flex justify-content-center">
          <div
            onClick={() => setActive(false)}
            className={`tab ${!active && "active"}`}
          >
            All
          </div>
          <div
            onClick={() => setActive(true)}
            className={`tab ${active && "active"}`}
          >
            Chưa điền thông tin
          </div>
        </div>
        <table
          style={{
            marginBottom: 0,
            marginTop: 0,
            maxWidth: "100%",
          }}
        >
          <thead>
            <tr>
              <th scope="col">Ảnh</th>
              <th scope="col">Tên</th>
              <th scope="col">Unit</th>

              <th scope="col">Email</th>
              <th scope="col">Đã check in</th>
              <th scope="col">Seat1</th>
              <th scope="col">Seat2</th>
              <th scope="col">Group</th>
              <th scope="col">Qr code </th>
              <th scope="col">Type</th>
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
                <td>{l.email}</td>

                <td>{moment(l.checkIn).format("DD-MM-YYYY HH:mm")}</td>
                <td>{l.seat1}</td>
                <td>{l.seat2}</td>
                <td>{l.group}</td>
                <td>{l.qrcode} </td>
                <td>{l.type}</td>
                <td>
                  {" "}
                  <button className="edit" onClick={() => handleSetForm(l)}>
                    Edit
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default UserMage;
