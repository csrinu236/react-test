import { useEffect, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import { useNavigate } from "react-router-dom";
import Contact from "./components/Contact";
import Settings from "./components/Settings";
// import CalculatorLoader from "./components/CalculatorLoader";

function App() {
  const [value, setValue] = useState({});
  const navigate = useNavigate();
  console.log({ window });
  const protocol = window.location.protocol;
  const href = window.location.href;
  const location = window.location;
  console.log("<===protocol:", protocol);
  console.log("<===href:", href);
  console.log("<===location:", location);

  useEffect(() => {
    const keyDownEventListener = (e) => {
      const keyCode = e.keyCode;
      if (keyCode === 461 || keyCode === 10009 || keyCode === 27) {
        if (navigator.userAgent.indexOf("Web0S") > -1 || navigator.userAgent.indexOf("WebOS") > -1) {
          console.log("exit app webOS");
          window.close();
        } else if (navigator.userAgent.includes("Tizen")) {
          console.log("exit app Tizen");
          try {
            window?.tizen?.application?.getCurrentApplication().exit();
          } catch (error) {
            console.log("error -", error);
          }
        }
      }
    };

    window.addEventListener("keydown", keyDownEventListener);
    return () => {
      window.removeEventListener("keydown", keyDownEventListener);
    };
  }, []);

  useEffect(() => {
    const launchParams = window.webOSDev.launchParams();
    console.log("<====launchParams===>", { launchParams });

    try {
      console.log("<====tizen====>", { tizen: window.tizen });
      var app = window?.tizen?.application.getCurrentApplication();

      var watchId = app.addEventListener({ appId: "yvwRDoqjgX.BasicDemoSameCertificate", name: "first_app_event_1" }, function (event, data) {
        /* Data from first app must be received here */
        setValue(JSON.stringify(data));
      });
      console.log(watchId);
    } catch (error) {
      setValue(JSON.stringify(error));
    }

    document.addEventListener("webOSLaunch", function (e) {
      const launchParams = window.webOSDev.launchParams();
      console.log("<====Inside LaunchParams===>", launchParams);
      const { detail } = e;
      const logs = {
        launchParams,
        location: window.location,
        e,
        detail,
      };
      setValue(logs);
      navigate(`/${launchParams.target}`);
      // Do something
      console.log("<=========webOSLaunch=========>", e);
    });

    document.addEventListener("webOSRelaunch", function (e) {
      console.log("<=========webOSRelaunch=========>", e);
      const { detail } = e;
      const logs = {
        launchParams,
        location: window.location,
        e,
        detail,
      };
      setValue(logs);
      // Do something
      navigate(`/${launchParams.target}`);
    });
  }, [navigate]);

  return (
    <div className="App">
      <h1>Simple Calculator App</h1>
      <h4 style={{ width: "500px" }}>{JSON.stringify(value)}</h4>
      <Calculator></Calculator>
      {/* <CalculatorLoader></CalculatorLoader> */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
