import { useEffect, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import { useNavigate } from "react-router-dom";
import Contact from "./components/Contact";
import Settings from "./components/Settings";
import CalculatorLoader from "./components/CalculatorLoader";

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

      var watchId = app.addEventListener({ appId: "y2JqUKwCOh.BasicDemo", name: "first_app_event_1" }, function (event, data) {
        /* Data from first app must be received here */
        setValue(JSON.stringify(data));
      });
    } catch (error) {
      console.log(error);
    }

    document.addEventListener("webOSLaunch", function (e) {
      const launchParams = window.webOSDev.launchParams();
      console.log("<====Inside LaunchParams===>", launchParams);
      const {
        // bubbles,
        // cancelable,
        // currentTarget,
        // composed,
        // defaultPrevented,
        detail,
        // eventPhase,
      } = e;
      const logs = {
        launchParams,
        location: window.location,
        e,
        // bubbles,
        // cancelable,
        // currentTarget,
        // composed,
        // defaultPrevented,
        detail,
        // eventPhase,
      };
      setValue(logs);
      navigate(`/${launchParams.target}`);
      // Do something
      console.log("<=========webOSLaunch=========>", e);
    });

    document.addEventListener("webOSRelaunch", function (e) {
      console.log("<=========webOSRelaunch=========>", e);
      const {
        // bubbles,
        // cancelable,
        // currentTarget,
        // composed,
        // defaultPrevented,
        detail,
        // eventPhase,
      } = e;
      const logs = {
        launchParams,
        location: window.location,
        e,
        // bubbles,
        // cancelable,
        // currentTarget,
        // composed,
        // defaultPrevented,
        detail,
        // eventPhase,
      };
      setValue(logs);
      // Do something
      navigate(`/${launchParams.target}`);
    });
  }, [navigate]);

  // useEffect(() => {
  //   let appInfo1, appInfo2;
  //   try {
  //     appInfo1 = window?.tizen?.application?.getAppInfo(
  //       'org.tizen.application'
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   try {
  //     appInfo2 = window?.tizen?.application?.getCurrentApplication();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setValue({ appInfo1, appInfo2 });

  //   document.addEventListener('keydown', function (e) {
  //     switch (e.keyCode) {
  //       case 37: //LEFT arrow
  //         console.log('<===left arrow clicked===>');
  //       case 38: //UP arrow
  //         console.log('<====UP arrow button clicked====>');
  //       case 39: //RIGHT arrow
  //         console.log('<=====right btn clicked====>');
  //       case 40: //DOWN arrow
  //         console.log('<=====down btn clicked====>');
  //       case 13: //OK button
  //         break;
  //       case 10009: //RETURN button
  //         console.log('<=====return btn clicked====>');
  //         window?.tizen?.application?.getCurrentApplication()?.exit();
  //         break;
  //       default:
  //         console.log('Key code : ' + e.keyCode);
  //         break;
  //     }
  //   });

  //   // Update state with the query parameters
  // }, []);

  return (
    <div className="App">
      <h1>Simple Calculator App</h1>
      {/* <h4 style={{ width: "500px" }}>{JSON.stringify(value)}</h4> */}
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
