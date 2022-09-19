import { Modal } from "antd";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";

export const formatFileName = (name) => {
  const splitted = name.split(".");

  const extension = splitted.slice(-1)[0];
  const baseName = splitted.slice(0, -1).join(".");

  return `${baseName}_${uuidv4()}.${extension}`;
};

const CreateUserModal = ({ modalIsOpen, setIsOpen }) => {
  const [form, setForm] = useState(null);
  const [file, setFile] = useState(null);
  const [units, setUnits] = useState([]);
  const storage = getStorage();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form || !file) return;
    const storageRef = ref(storage, "daihoixix/" + formatFileName(file.name));

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((userImg) => {
        const usersRef = doc(db, "users", uuidv4());
        const { name, unit, qrcode } = form;
        setDoc(usersRef, {
          userImg,
          name,
          unit,
          qrcode,
        });
        toast.success("Thêm mới thành công !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setForm({
          name: "",
          unit: units[0],
          qrcode: "",
        });
        setFile(null);
        document.getElementById("file").value = "";
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
      setForm({ unit: data[0] });
    })();
  }, []);

  return (
    <Modal
      title="Tạo đại biểu mới"
      centered
      open={modalIsOpen}
      onCancel={() => setIsOpen(false)}
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
            type="file"
            id="file"
            onChange={handleChangeFile}
          />
          {file && (
            <img
              style={{
                maxHeight: "35vh",
                objectFit: "cover",
              }}
              src={URL.createObjectURL(file)}
              className="w-100 mt-2 mb-2"
              alt=""
            />
          )}

          <div
            className="d-flex align-items-center"
            style={{
              marginTop: "1rem",

              justifyContent: "space-between",
            }}
          >
            <button type="submit" className="btn btn-primary text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateUserModal;
