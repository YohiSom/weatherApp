const iconObject = [
  { id: 1, text: "day" },
  { id: 2, text: "cloudy-day-1" },
  { id: 3, text: "cloudy-day-1" },
  { id: 4, text: "cloudy-day-1" },
  { id: 5, text: "cloudy-day-1" },
  { id: 6, text: "cloudy-day-1" },
  { id: 7, text: "cloudy-day-1" },
  { id: 8, text: "cloudy-day-1" },
  { id: 11, text: "cloudy-day-1" },
  { id: 12, text: "rainy-5" },
  { id: 13, text: "rainy-5" },
  { id: 14, text: "rainy-2" },
  { id: 15, text: "rainy-7" },
  { id: 16, text: "rainy-7" },
  { id: 17, text: "rainy-5" },
  { id: 18, text: "rainy-7" },
  { id: 19, text: "cloudy" },
  { id: 20, text: "cloudy" },
  { id: 21, text: "cloudy-day-2" },
  { id: 22, text: "snowy-5" },
  { id: 23, text: "snowy-5" },
  { id: 24, text: "snowy-6" },
  { id: 25, text: "snowy-6" },
  { id: 26, text: "rainy-7" },
  { id: 29, text: "snowy-6" },
  { id: 30, text: "day" },
  { id: 31, text: "snowy-6" },
  { id: 32, text: "rainy-7" },
  { id: 33, text: "night" },
  { id: 34, text: "cloudy-day-1" },
  { id: 35, text: "cloudy-day-1" },
  { id: 36, text: "cloudy-day-1" },
  { id: 37, text: "cloudy-night-2" },
  { id: 38, text: "cloudy" },
  { id: 39, text: "rainy-7" },
  { id: 40, text: "rainy-7" },
  { id: 41, text: "thunder" },
  { id: 42, text: "thunder" },
  { id: 43, text: "cloudy" },
  { id: 44, text: "snowy-6" },
];

const findIconName = (id) => {
  const elementId = iconObject.find((element) => element.text === id);
  return elementId.text;
};

export { iconObject, findIconName };
