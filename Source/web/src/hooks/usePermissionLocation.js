import { useEffect, useState } from "react";
import Constants from "../common/Constants";

export default () => {
  const [statusPermission, setStatusPermission] = useState(Constants.STATUS_PERMISSION_LOCATION.PROMPT);
  
  useEffect(() => {
    navigator.permissions
    .query({ name: 'geolocation' })
    .then(function (result) {
        setStatusPermission(result.state);
        result.onchange = function() {
          setStatusPermission(result.state);
        }
    });
  }, []);

  return statusPermission;
}