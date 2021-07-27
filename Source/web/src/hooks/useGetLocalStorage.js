import { useEffect, useState } from "react";

const getLocalStorage = (props) => {
  const [defaultAcademy, setDefaultAcademy] = useState({});

  useEffect(() => {
    setDefaultAcademy(JSON.parse(localStorage.getItem("defaultAcademy")) || {});
  }, []);

  return defaultAcademy;
};

export default getLocalStorage;
