import { Modal } from "antd";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

const SubUpdateUserModal = ({ modalIsOpen, setIsOpen, initForm }) => {
  const [form, setForm] = useState({
    name: "",
    unit: "",
    userImg: null,
    qrcode: "",
  });

  const [units, setUnits] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userImg = form?.userImg;

    const { name, unit, qrcode } = form;

    if (name.length === 0 || qrcode.length === 0 || userImg.length === "") {
      return toast.error("Nhập đầy đủ thông tin !");
    }
    const usersRef = doc(db, "users", form?.id);
    
    setDoc(
      usersRef,
      {
        userImg,
        name,
        unit,
        qrcode,
      },
      {
        merge: true,
      }
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
    setIsOpen(false);
    setForm({
      name: "",
      unit: units[0],
      qrcode: "",
      userImg: "",
    });
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "units"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data().value);
      });
      data.sort((a, b) => a.localeCompare(b));
      setUnits(data);
    })();
  }, []);

  useEffect(() => {
    if (units && initForm) {
      setForm(initForm);
    }
  }, [units, initForm]);

  return (
    <Modal
      title="Sửa đại biểu"
      centered
      open={modalIsOpen}
      onCancel={() => {
        setForm({
          name: "",
          unit: units[0],
          qrcode: "",
          userImg: "",
        });

        setIsOpen(false);
      }}
      footer={[]}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <p className="mb-0 mt-2">Tên </p>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            name="name"
            value={form?.name}
          />
          <p className="mb-0 mt-2">Đơn vị </p>
          <select
            className="form-select"
            value={form?.unit}
            name="unit"
            onChange={handleChange}
          >
            {units.map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>

          <p className="mb-0 mt-2">QR code </p>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            name="qrcode"
            value={form?.qrcode}
          />

          <p className="mb-0 mt-2">Ảnh </p>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            name="userImg"
            value={form?.userImg}
          />
          {/* {file && (
            <img
              style={{
                maxHeight: "35vh",
                objectFit: "cover",
              }}
              src={URL.createObjectURL(file)}
              className="w-100 mt-2 mb-2"
              alt=""
            />
          )} */}

          {/* {!file && form?.userImg && (
            <img
              style={{
                maxHeight: "35vh",
                objectFit: "cover",
              }}
              src={form.userImg}
              className="w-100 mt-2 mb-2"
              alt=""
            />
          )} */}

          <div
            className="d-flex align-items-center"
            style={{
              marginTop: "1rem",

              justifyContent: "space-between",
            }}
          >
            <button type="submit" className="btn btn-primary text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default memo(SubUpdateUserModal);
