import { Col, Row, Select } from "antd";
import { memo, useEffect, useState } from "react";
import QrReader from "react-qr-scanner";

function Scanner({ onScan }) {
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = () => {
    navigator.mediaDevices.enumerateDevices().then((dvs) => {
      const videoinput = dvs.filter((d) => d.kind === "videoinput");
      setDevices(videoinput);
      if (videoinput[0]?.deviceId) {
        setDevice(videoinput[0]);
      }
    });
  };

  const handleScan = (data) => {
    if (!data) return;
    onScan && onScan(data.text);
  };

  const handleError = (err) => {
    console.log(err);
  };

  return (
    <Row>
      <Col span={24}>
        <Select
          className="w-100"
          value={device?.deviceId || ""}
          onChange={(value) =>
            setDevice(devices.find((d) => d.deviceId === value))
          }
        >
          {devices.map((item, index) => (
            <Select.Option key={item.deviceId} value={item.deviceId}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Col>
      {device && (
        <Col span={24}>
          <QrReader
            className="w-100"
            constraints={{
              video: { deviceId: device.deviceId },
            }}
            style={{
              height: "25vh",
              objectFit: "fill",
            }}
            delay={100}
            onError={handleError}
            onScan={handleScan}
            onLoad={(value) => console.log("load", value)}
          />
        </Col>
      )}
    </Row>
  );
}

export default memo(Scanner);
