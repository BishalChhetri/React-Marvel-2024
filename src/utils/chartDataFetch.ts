import { CheckedItems } from "../types/type.d";

// Returns Data for ChartJS
export function getChartData(data: any[], props?: CheckedItems) {
  let filteredData = data;
  let filterByChar: any = [];
  let nameFrequencyMap: { [key: string]: number } = {};

  if (props && !props.all) {
    filterByChar = Object.keys(props).filter(
      (key) => key !== "all" && props[key] === true
    );
  } else {
    filterByChar = [];
  }
  nameFrequencyMap = filteredData.reduce((map: any, item: any) => {
    if (item && item.name) {
      const [name] = item.name.split(" #");
      map[name] = (map[name] || 0) + 1;
      return map;
    }
  }, {});

  if (filterByChar && filterByChar.length > 0) {
    const filteredObject: { [key: string]: number } = {};
    for (const key in nameFrequencyMap) {
      if (nameFrequencyMap.hasOwnProperty(key)) {
        if (filterByChar.some((prefix: string) => key.startsWith(prefix))) {
          filteredObject[key] = nameFrequencyMap[key];
        }
      }
    }
    nameFrequencyMap = filteredObject;
  }
  return [
    Object.keys(nameFrequencyMap),
    Object.values(nameFrequencyMap).map(String),
  ];
}

// Return array of filters
export function getChartFilter(data: any) {
  const namesSet = new Set();

  data.forEach((obj: any) => {
    const name = obj.name;
    if (typeof name === "string") {
      const match = name.match(/^(.*?)(?:#|$)/);
      if (match && match[1]) {
        namesSet.add(match[1].trim());
      }
    }
  });

  return Array.from(namesSet);
}
