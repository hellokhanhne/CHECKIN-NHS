import banner from "../src/banner.png";
import gttrienlam from "../src/GioithieuTrienlam.png";
import video from "../src/ĐẠI HỘI ĐOÀN THCS HỒ CHÍ MINH THÀNH PHỐ ĐÀ NẴNG LẦN THỨ XIX, NHIỆM KỲ 2022-2027.mp4"

function TriemLam() {
  return (
    <div className=" w-100 trienlam-wrapper d-flex">
      <div className="p-4 d-flex flex-column align-items-center h-100 justify-content-center m-auto">
        <div className=" text-center mb-3">
          <img src={banner} className="trienlam-banner" alt="" />
        </div>
        <div className="video-wrapper">
          <video controls loop autoPlay muted>
            <source
              src={video}
              type="video/mp4"
            />
          </video>
        </div>
        <div className="mt-4 text-center">
          <img src={gttrienlam} alt="" className="w-100 gttrienlam" />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <a href="https://trien-lam.netlify.app" className="trien-lam-button">
            <b>VÀO XEM</b>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TriemLam;
