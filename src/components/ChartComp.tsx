import React, { useCallback, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { CategoryScale, defaults } from "chart.js";
import { getChartData, getChartFilter } from "../utils/chartDataFetch";
import { CheckedItems, ChartData } from "../types/type.d";

// Chart Register and Chart Responsive
Chart.register(CategoryScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface ChartCompProps {
  data: any;
}

const ChartComp: React.FC<ChartCompProps> = ({ data }) => {
  const [chartJSData, setChartJSData] = useState<ChartData>({
    labels: [],
    chartData: [],
  });
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "all" && checked === false) return;
    if (name === "all") {
      // all others false if all is true
      if (checked) {
        const newCheckedItems: CheckedItems = { all: true };
        Object.keys(checkedItems).forEach((key) => {
          if (key !== "all") {
            newCheckedItems[key] = false;
          }
        });
        setCheckedItems(newCheckedItems);
      } else {
        setCheckedItems({ ...checkedItems, all: false });
      }
    } else {
      // all is false and others are from user input
      let newCheckedItems: CheckedItems = {
        ...checkedItems,
        [name]: checked,
        all: false,
      };
      // all to true if all others false
      newCheckedItems = Object.assign(
        {},
        newCheckedItems,
        Object.values(newCheckedItems).every((val) => val === false) && {
          all: true,
        }
      );
      setCheckedItems(newCheckedItems);
    }
  };

  const fetchFilterData = useCallback(
    () => getChartData(data, checkedItems),
    [checkedItems]
  );

  const chartFilter = getChartFilter(data);

  useEffect(() => {
    const [labels, chartData] = fetchFilterData();
    setChartJSData({ labels, chartData });
  }, [checkedItems]);

  return (
    <>
      <div className="flex flex-wrap justify-center my-4">
        <span className="text-[#1B1B1B] mx-2">Filter : </span>
        <input
          className="peer  placeholder-gray-400 text-sm text-primary rounded border-none ring-2 ring-gray-300 focus:ring-primary focus:ring-2 mt-1"
          type="checkbox"
          name="all"
          defaultChecked={true}
          checked={checkedItems.all}
          onChange={handleCheckboxChange}
        />
        <label className="ms-2">All</label>
        {chartFilter.map((filter: any, index: number) => (
          <>
            <input
              className="px-1 placeholder-gray-400 text-sm text-primary rounded border-none ring-2 ring-gray-300 focus:ring-primary focus:ring-2 mt-1 ms-3 me-1"
              type="checkbox"
              key={index}
              name={filter}
              checked={checkedItems[filter] || false}
              onChange={handleCheckboxChange}
            />
            <label className="ms-2">{filter}</label>
          </>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-2 w-full">
        <div className="col-span-1 h-full">
          <Bar
            height={300}
            data={{
              labels: chartJSData?.labels,
              datasets: [
                {
                  label: "Comics Appeared In",
                  data: chartJSData?.chartData,
                  borderRadius: 5,
                  backgroundColor: [
                    "rgba(0, 0, 139, 0.8)",
                    "rgba(184, 134, 11, 0.8)",
                    "rgba(139, 0, 0, 0.8)",
                  ],
                },
              ],
            }}
          />
        </div>
        <div className="col-span-1 h-full">
          <Doughnut
            height={300}
            data={{
              labels: chartJSData?.labels,
              datasets: [
                {
                  label: "Comics Appeared In",
                  data: chartJSData?.chartData,
                  borderRadius: 5,
                  backgroundColor: [
                    "rgba(0, 0, 139, 0.8)",
                    "rgba(184, 134, 11, 0.8)",
                    "rgba(139, 0, 0, 0.8)",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ChartComp;
