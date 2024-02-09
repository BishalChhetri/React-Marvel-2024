import React from "react";
import ChartComp from "./ChartComp";

interface CharacterCompProps {
  data: any[];
}

const CharacterComp: React.FC<CharacterCompProps> = ({ data }) => {
  return (
    <div className="max-w-[2520px] pb-20 pt-26 h-full">
      <div className="h-[500px] w-full bg-black slanted-div skew-y-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-black ">
          <div className="col-span-1 lg:ms-4">
            <img
              className="h-[500px] w-full object-cover"
              src={data[0].thumbnail.path + "." + data[0].thumbnail.extension}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center mb-4">
            <span className="text-white font-bold text-2xl flex items-center justify-center">
              {data[0].name}
            </span>
            <span className="text-white font-semibold text-sm flex items-center justify-center">
              {data[0].events.items[0]?.name}
            </span>
          </div>
        </div>
        <div className="max-w-[2520px] mx-auto xl:px-40 md:px-20 sm:px-4 px-8 pb-8 flex flex-col justify-center items-center mt-8">
          <span className="text-2xl font-bold">Description</span>
          <span className="text-sm mt-1">
            {data[0].description || "No description."}
          </span>
        </div>
        <div className="max-w-[2520px] mx-auto xl:px-40 md:px-20 sm:px-4 px-8 pb-10 flex flex-col justify-center items-center mt-2">
          <span className="text-2xl font-bold">Comics Appeared In</span>
          <div className="flex flex-wrap justify-center">
            {data[0].comics.items.map((item: any, index: number) => (
              <div
                className="px-4 py-2 rounded bg-black mt-2 text-white font-semibold ms-4"
                key={index}
              >
                {item.name}
                {/* {item.name.replace(/#\d+\s*$/, "")} */}
              </div>
            ))}
            <span className="text-sm">
              {data[0].comics.available === 0 && "Not appeared in comics."}
            </span>
          </div>
        </div>
        <div className="max-w-[2520px] mx-auto xl:px-40 md:px-20 sm:px-4 px-8 pb-20 flex flex-col justify-center items-center mt-2">
          <span className="text-2xl font-bold">Series</span>
          <div className="flex flex-wrap justify-center">
            {data[0].series.items.map((item: any, index: number) => (
              <div
                className="px-4 py-2 rounded bg-black mt-2 text-white font-semibold ms-4"
                key={index}
              >
                {item.name}
                {/* {item.name.replace(/#\d+\s*$/, "")} */}
              </div>
            ))}
            <span className="text-sm">
              {data[0].series.available === 0 && "Not appeared in series."}
            </span>
          </div>
        </div>
        <div className="max-w-[2520px] mx-auto  md:px-20 sm:px-4 px-8 pb-20 flex flex-col justify-center items-center mt-2">
          <span className="text-2xl font-bold">Chart</span>
          {data[0].comics.available === 0 ? (
            <span className="text-sm">No data to show chart.</span>
          ) : (
            <ChartComp data={data[0].comics.items} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterComp;
