import { ButtonLink } from "./components/button";

const data = [
  {
    title: "Ban chấp hành Quận Đoàn khóa V, nhiệm kỳ 2017 - 2022",
    url: "https://trien-lam.netlify.app/ban-chap-hanh-quan-khoa-v-nhiem-ki-2017-2022",
    image:
      "/ban-chap-hanh-quan-khoa-v-nhiem-ki-2017-2022/images/1. Đồng chí Hoàng Trân Châu - Bí thư.jpg",
  },
  {
    title:
      "Chương trình đồng hành với thanh niên rèn luyện và phát triển kỹ năng trong cuộc sống, nâng cao thể chất, đời sống văn hóa tinh thần",
    url: "https://trien-lam.netlify.app/chuong-trinh-dong-hanh-voi-thanh-nien-ren-luyen-va-phat-trien-ky-nang-trong-cuoc-song-nang-cao-the-chat-doi-song-van-hoa-tinh-than",
    image:
      "/chuong-trinh-dong-hanh-voi-thanh-nien-ren-luyen-va-phat-trien-ky-nang-trong-cuoc-song-nang-cao-the-chat-doi-song-van-hoa-tinh-than/images/DSC_0208.JPG",
  },
  {
    title: "Chương trình Đồng hành với thanh niên trong học tập",
    url: "https://trien-lam.netlify.app/chuong-trinh-dong-hanh-voi-thanh-nien-trong-hoc-tap",
    image:
      "/chuong-trinh-dong-hanh-voi-thanh-nien-trong-hoc-tap/images/275558193_3037680229780209_8877403490549153502_n.jpg",
  },
  {
    title:
      "Chương trình đồng hành với thanh niên trong khởi nghiệp, lập nghiệp",
    url: "https://trien-lam.netlify.app/chuong-trinh-dong-hanh-voi-thanh-nien-trong-khoi-nghiep-lap-nghiep",
    image:
      "/chuong-trinh-dong-hanh-voi-thanh-nien-trong-khoi-nghiep-lap-nghiep/images/276135721_958467281521193_567195450817162957_n.jpg",
  },
  {
    title: "Công tác giáo dục",
    url: "https://trien-lam.netlify.app/cong-tac-giao-duc",
    image:
      "/cong-tac-giao-duc/images/CHƯƠNG TRÌNH CHIA SẺ YÊU THƯƠNG NHÂN NGÀY 27-07.jpg",
  },
  {
    title:
      "Công tác phụ trách Đội TNTP Hồ Chí Min và bảo vệ, chăm sóc, giáo dục thiếu niên, nhi đồng",
    url: "https://trien-lam.netlify.app/cong-tac-phu-trach-doi-tntp-ho-chi-minh-va-bao-ve-cham-soc-giao-duc-thieu-nien-nhi-dong",
    image:
      "/cong-tac-phu-trach-doi-tntp-ho-chi-minh-va-bao-ve-cham-soc-giao-duc-thieu-nien-nhi-dong/images/9cdb4cfbd51933476a08.jpg",
  },
  {
    title: "Công tác tham gia xây dựng Đảng và hệ thống chính trị",
    url: "https://trien-lam.netlify.app/cong-tac-tham-gia-xay-dung-dang-va-he-thong-chinh-tri",
    image:
      "/cong-tac-tham-gia-xay-dung-dang-va-he-thong-chinh-tri/images/z3560163385339_1b36ae406076bb146c5a224d05d49bd7.jpg",
  },
  {
    title:
      "Công tác tổ chức xây dựng Đoàn, mở rộng mặt trận đoàn kết tập hợp thanh niên",
    url: "https://trien-lam.netlify.app/cong-tac-to-chuc-xay-dung-doan-mo-rong-mat-tran-doan-ket-tap-hop-thanh-nien",
    image:
      "/cong-tac-to-chuc-xay-dung-doan-mo-rong-mat-tran-doan-ket-tap-hop-thanh-nien/images/FPT-AnhHoatDong3.jpeg",
  },
  {
    title:
      "Đại hội Đoàn các cấp tiến tới Đại hội Đại biểu Đoàn TNCS Hồ Chí Minh quận Ngũ Hành Sơn lần thứ VI",
    url: "https://trien-lam.netlify.app/dai-hoi-doan-cac-cap-tien-toi-dai-hoi-ngu-hanh-son-bieu-doan-tncs-ho-chi-minh-quan-ngu-hanh-son-lan-thu-vi22",
    image:
      "/dai-hoi-doan-cac-cap-tien-toi-dai-hoi-ngu-hanh-son-bieu-doan-tncs-ho-chi-minh-quan-ngu-hanh-son-lan-thu-vi22/images/274186076_258130819836675_6276924157606223912_n.jpg",
  },
  {
    title: "Phong trào thanh niên tình nguyện",
    url: "https://trien-lam.netlify.app/phong-trao-thanh-nien-tinh-nguyen",
    image: "/phong-trao-thanh-nien-tinh-nguyen/images/2.jpg",
  },
  {
    title: "Phong trào tuổi trẻ sáng tạo",
    url: "https://trien-lam.netlify.app/phong-trao-tuoi-tre-sang-tao",
    image:
      "/phong-trao-tuoi-tre-sang-tao/images/275850433_1295433327613587_8979187749136573360_n.jpg",
  },
  {
    title: "Phong trào tuổi trẻ xung kích bảo vệ tổ quốc",
    url: "https://trien-lam.netlify.app/phong-trao-tuoi-tre-xung-kich-bao-ve-to-quoc",
    image:
      "/phong-trao-tuoi-tre-xung-kich-bao-ve-to-quoc/images/z3508459016793_a267dec0a9a463c3d397b4eed228e053.jpg",
  },
];

function TriemLam() {
  return (
    <div className={` trienlam-wrapper`}>
      <div
        className="w-100 h-100 d-flex justify-content-center align-items-center flex-col"
        style={{
          transform: "translateY(8vh)",
        }}
      >
        <div>
          <video controls loop autoPlay muted>
            <source src="/Trailer.mp4" type="video/mp4" />
          </video>
        </div>
        <ButtonLink
          href="https://trien-lam.netlify.app/phong-trao-tuoi-tre-sang-tao"
          style={{
            marginTop: "calc(.5vw + .5vh)",
          }}
          text="VÀO XEM"
          bold
        />
      </div>
    </div>
  );
}

export default TriemLam;
