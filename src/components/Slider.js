import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

export default function Slider({ data }) {
  const [value, setValue] = React.useState(0);
  //useEffect weil rerender bei jedem value und data erwünscht
  React.useEffect(() => {
    if (value < 0) {
      setValue(data.length - 1);
    }
    if (value > data.length - 1) {
      setValue(0);
    }
  }, [value, data]);
  //useEffect für autoplay und clean für reseten des timers
  React.useEffect(() => {
    let slider = setInterval(() => {
      setValue(value + 1);
    }, 52222000);
    return () => clearInterval(slider);
  }, [value]);

  return (
    <div
      className="grid place-items-center relative h-screen md:h-auto overflow-hidden"
      style={{ minHeight: "75vh" }}
      onWheel={(e) => {
        if (e.deltaX < -10) {
          console.log("向左滑动");
          setValue(value - 1);
        }
        if (e.deltaX > 10 && e.deltaY < 3 && e.deltaY > -3) {
          console.log("向右滑动");
          setValue(value + 1);
        }
        if (e.ctrlKey) { // ctrlKey 这个字段只有在双指方向不一致时，才会为true
          if (e.deltaY > 0) return console.log('向内');
          if (e.deltaY < 0) return console.log('向外');
        } else {
          if (e.deltaY > 0) return console.log('向上');
          if (e.deltaY < 0) return console.log('向下');
        }
      }}
    >
      {data.map((item, index) => {
        const { id, title, image, quote, name } = item;

        let position = "translate-x-full opacity-0";
        if (index === value) {
          position = "translate-x-0";
        }
        if (index === value - 1 || (value === 0 && index === data.length - 1)) {
          position = "-translate-x-full opacity-0";
        }
        return (
          <article
            key={id}
            className={`${position} transform md:px-48 mt-8 absolute transition-all duration-500 ease-in-out `}
          >
            <div className="w-32 h-32 mx-auto">
              <img
                className="h-full w-full rounded-full object-cover"
                src={image}
                alt={name}
              />
            </div>
            <div className="text-center md:h-40  px-16">
              <h1 className="text-red-400 text-xl">{name}</h1>
              <h2 className="text-lg font-medium">{title}</h2>
              <p className="text-base font-normal leading-8">{quote}</p>
            </div>

          </article>
        );
      })}

      <button
        className="right-0 md:mr-16 mr-4 absolute bg-red-200 p-2 rounded hover:bg-red-400"
        style={{ top: "50%" }}
        onClick={() => {
          setValue(value + 1);
        }}
      >
        <FiChevronRight />
      </button>
      <button
        className="left-0 md:ml-16 ml-4 absolute bg-red-200 p-2 rounded hover:bg-red-400"
        style={{ top: "50%" }}
        onClick={() => {
          setValue(value - 1);
        }}
      >
        <FiChevronLeft />
      </button>
    </div>
  );
}
