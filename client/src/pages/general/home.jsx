import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
export default function Home() {
  const imagesHeader = [
    "https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/desktop_home_page_carousel/public/2022-04/Untitled%20design_0.png.webp?itok=cB8w5KZM",
    "https://ibaohiem.vn/wp-content/uploads/2018/04/Bao-hiem-Bao-Viet-An-Gia.jpg",
    "https://www.libertyinsurance.com.vn/sites/libertyvn/files/2023-04/family_955x958.png",
  ];
  return (
    <>
      <div className="bg-[gray] h-[550px] overflow-hidden text-center w-[100vw]">
        <Slide>
          <div className="flex items-center justify-center bg-cover  ">
            <img className="h-[550px]  object-cover" src={imagesHeader[0]} />
          </div>
          <div className="flex items-center justify-center bg-cover  ">
            <img className="h-[550px]  object-cover" src={imagesHeader[1]} />
          </div>
          <div className="flex items-center justify-center bg-cover">
            <img className="h-[550px]  object-cover" src={imagesHeader[2]} />
          </div>
        </Slide>
      </div>
    </>
  );
}
