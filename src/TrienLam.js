const data = [
  {
    title: "Ban chấp hành Quận Đoàn khóa V, nhiệm kỳ 2017 - 2022",
    url: "/ban-chap-hanh-quan-khoa-v-nhiem-ki-2017-2022",
    image:
      "/ban-chap-hanh-quan-khoa-v-nhiem-ki-2017-2022/images/1. Đồng chí Hoàng Trân Châu - Bí thư.jpg",
  },
  {
    title:
      "Chương trình đồng hành với thanh niên rèn luyện và phát triển kỹ năng trong cuộc sống, nâng cao thể chất, đời sống văn hóa tinh thần",
    url: "/chuong-trinh-dong-hanh-voi-thanh-nien-ren-luyen-va-phat-trien-ky-nang-trong-cuoc-song-nang-cao-the-chat-doi-song-van-hoa-tinh-than",
    image:
      "/chuong-trinh-dong-hanh-voi-thanh-nien-ren-luyen-va-phat-trien-ky-nang-trong-cuoc-song-nang-cao-the-chat-doi-song-van-hoa-tinh-than/images/DSC_0208.JPG",
  },
  {
    title: "Chương trình Đồng hành với thanh niên trong học tập",
    url: "/chuong-trinh-dong-hanh-voi-thanh-nien-trong-hoc-tap",
    image:
      "/chuong-trinh-dong-hanh-voi-thanh-nien-trong-hoc-tap/images/275558193_3037680229780209_8877403490549153502_n.jpg",
  },
  {
    title:
      "Chương trình đồng hành với thanh niên trong khởi nghiệp, lập nghiệp",
    url: "/chuong-trinh-dong-hanh-voi-thanh-nien-trong-khoi-nghiep-lap-nghiep",
    image:
      "/chuong-trinh-dong-hanh-voi-thanh-nien-trong-khoi-nghiep-lap-nghiep/images/276135721_958467281521193_567195450817162957_n.jpg",
  },
  {
    title: "Công tác giáo dục",
    url: "/cong-tac-giao-duc",
    image:
      "/cong-tac-giao-duc/images/CHƯƠNG TRÌNH CHIA SẺ YÊU THƯƠNG NHÂN NGÀY 27-07.jpg",
  },
  {
    title:
      "Công tác phụ trách Đội TNTP Hồ Chí Min và bảo vệ, chăm sóc, giáo dục thiếu niên, nhi đồng",
    url: "/cong-tac-phu-trach-doi-tntp-ho-chi-minh-va-bao-ve-cham-soc-giao-duc-thieu-nien-nhi-dong",
    image:
      "/cong-tac-phu-trach-doi-tntp-ho-chi-minh-va-bao-ve-cham-soc-giao-duc-thieu-nien-nhi-dong/images/9cdb4cfbd51933476a08.jpg",
  },
  {
    title: "Công tác tham gia xây dựng Đảng và hệ thống chính trị",
    url: "/cong-tac-tham-gia-xay-dung-dang-va-he-thong-chinh-tri",
    image:
      "/cong-tac-tham-gia-xay-dung-dang-va-he-thong-chinh-tri/images/z3560163385339_1b36ae406076bb146c5a224d05d49bd7.jpg",
  },
  {
    title:
      "Công tác tổ chức xây dựng Đoàn, mở rộng mặt trận đoàn kết tập hợp thanh niên",
    url: "/cong-tac-to-chuc-xay-dung-doan-mo-rong-mat-tran-doan-ket-tap-hop-thanh-nien",
    image:
      "/cong-tac-to-chuc-xay-dung-doan-mo-rong-mat-tran-doan-ket-tap-hop-thanh-nien/images/FPT-AnhHoatDong3.jpeg",
  },
  {
    title:
      "Đại hội Đoàn các cấp tiến tới Đại hội Đại biểu Đoàn TNCS Hồ Chí Minh quận Ngũ Hành Sơn lần thứ VI",
    url: "/dai-hoi-doan-cac-cap-tien-toi-dai-hoi-ngu-hanh-son-bieu-doan-tncs-ho-chi-minh-quan-ngu-hanh-son-lan-thu-vi22",
    image:
      "/dai-hoi-doan-cac-cap-tien-toi-dai-hoi-ngu-hanh-son-bieu-doan-tncs-ho-chi-minh-quan-ngu-hanh-son-lan-thu-vi22/images/274186076_258130819836675_6276924157606223912_n.jpg",
  },
  {
    title: "Phong trào thanh niên tình nguyện",
    url: "/phong-trao-thanh-nien-tinh-nguyen",
    image: "/phong-trao-thanh-nien-tinh-nguyen/images/2.jpg",
  },
  {
    title: "Phong trào tuổi trẻ sáng tạo",
    url: "/phong-trao-tuoi-tre-sang-tao",
    image:
      "/phong-trao-tuoi-tre-sang-tao/images/275850433_1295433327613587_8979187749136573360_n.jpg",
  },
  {
    title: "Phong trào tuổi trẻ xung kích bảo vệ tổ quốc",
    url: "/phong-trao-tuoi-tre-xung-kich-bao-ve-to-quoc",
    image:
      "/phong-trao-tuoi-tre-xung-kich-bao-ve-to-quoc/images/z3508459016793_a267dec0a9a463c3d397b4eed228e053.jpg",
  },
];

function TriemLam() {
  return (
    <div className="h-100-v d-flex align-items-center justify-content-center">
      <div
        className={` main-wrapper`}
        style={{
          paddingTop: "3rem",
        }}
      >
        <div>
          <div className="d-flex  ">
            <div
              className="flex-1 "
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="title-wrapper">
                <h1
                  style={{
                    fontSize: 40,
                    color: "#001d56",
                    marginBottom: 5,
                    marginTop: 10,
                  }}
                >
                  Triễn lãm ảnh thực tế ảo
                </h1>
              </div>
              <div className="d-flex list-v">
                {data.map((d) => (
                  <a className="item-v " href={d.url}>
                    <img src={d.image} alt="" />
                    <p>{d.title}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TriemLam;
