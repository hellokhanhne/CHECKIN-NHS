import banner from "../src/banner.png";
import gttrienlam from "../src/GThieuTrienLam.png";

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
              src="https://discloud-storage.herokuapp.com/file/df1d23b10519895fb4a9dfe7c4519535/trailer.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="mt-4 text-center">
          <img src={gttrienlam} alt="" className="w-100 gttrienlam" />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <a href="" className="trien-lam-button">
            <b>VÀO XEM</b>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TriemLam;
