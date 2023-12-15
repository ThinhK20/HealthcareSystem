import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
export default function Home() {
  const imagesHeader = [
    "https://www.u.com.my/content/dam/u-mobile/personal/devices/iphone/iphone-14-pro/meta/20220922/iPhone14-Pro-Launch_Meta-Image_EN.png",
    "https://s.tmimgcdn.com/scr/1200x750/293200/headphone-advertisement-poster-vector_293283-original.jpg",
    "https://i.ytimg.com/vi/9Rbb5Sk0r_k/maxresdefault.jpg",
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
