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
  const [value2, setValue2] = useState({});
  const navigate = useNavigate();
  // console.log({ window });
  const protocol = window.location.protocol;
  const href = window.location.href;
  const location = window.location;
  // console.log("<===protocol:", protocol);
  // console.log("<===href:", href);
  // console.log("<===location:", location);

  const grammar = "#JSGF V1.0; grammar names; public <name> = JioCinema | JIO | jiocinema ;";

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const [recognition, setrecognition] = useState(new window.SpeechRecognition());
  const [isListening, setisListening] = useState(false);
  // const recognition = new window.SpeechRecognition();

  recognition.interimResults = false;
  recognition.lang = "en-IN";
  recognition.continuous = false;
  // recognition.maxAlternatives = 1;

  window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

  const speechRecognitionList = new window.SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;

  useEffect(() => {
    const listener = (event) => {
      const color = event.results[0][0].transcript;
      console.log(color);
      setValue2(color);
      setisListening(false);
    };

    recognition.addEventListener("result", listener);

    recognition.addEventListener("audioend", () => {
      console.log("Audio capturing ended");
      setisListening(false);
    });

    recognition.addEventListener("audiostart", () => {
      console.log("Audio capturing started");
    });

    recognition.addEventListener("end", () => {
      console.log("Speech recognition service disconnected");
    });

    recognition.addEventListener("nomatch", () => {
      console.error("Speech not recognized");
    });

    recognition.addEventListener("soundstart", () => {
      console.log("Some sound is being received");
    });

    recognition.addEventListener("soundend", (event) => {
      console.log("Sound has stopped being received");
      setisListening(false);
    });

    recognition.addEventListener("speechstart", () => {
      console.log("Speech has been detected");
    });

    recognition.addEventListener("speechend", () => {
      console.log("Speech has stopped being detected");
      setisListening(false);
    });
  }, []);

  useEffect(() => {
    const keyDownEventListener = (e) => {
      const keyCode = e.keyCode;
      if (keyCode === 461 || keyCode === 10009 || keyCode === 27) {
        if (navigator.userAgent.indexOf("Web0S") > -1 || navigator.userAgent.indexOf("WebOS") > -1) {
          console.log("exit app webOS");
          window.close();
        } else if (navigator.userAgent.includes("Tizen")) {
          console.log("exit app Tizen====> ROhit Sharma");
          try {
            window?.tizen?.application?.getCurrentApplication().exit();
          } catch (error) {
            console.log("error -", error);
          }
        }
      }
      switch (keyCode) {
        case 37: //LEFT arrow
          console.log("Left arrow clicked =======>");

          // var request = window.webOS.service.request("luna://com.webos.service.applicationmanager", {
          //   method: "launch",
          //   parameters: {
          //     id: "amazon",
          //   },
          //   onSuccess: function (inResponse) {
          //     console.log("The app is launched");
          //     // To-Do something
          //   },
          //   onFailure: function (inError) {
          //     console.log("Failed to to do the operation");
          //     console.log("[" + inError.errorCode + "]: " + inError.errorText);
          //     // To-Do something
          //     return;
          //   },
          // });
          var request = window.webOS.service.request("luna://com.webos.service.location", {
            method: "getAllLocationHandlers",
            parameters: {},
            onSuccess: function (inResponse) {
              console.log("The app is launched", inResponse);
              // To-Do something
            },
            onFailure: function (inError) {
              console.log("Failed to to do the operation");
              console.log("[" + inError.errorCode + "]: " + inError.errorText);
              // To-Do something
              return;
            },
          });

          break;
        case 38: //UP arrow
          console.log("UP arrow clicked =======>");

          var request = window.webOS.service.request("luna://com.palm.activitymanager", {
            method: "adopt",
            parameters: {
              activityId: 90,
              wait: true,
              subscribe: true,
              detailedEvents: false,
            },
            onSuccess: function (inResponse) {
              if (inResponse.event == "orphan") {
                console.log("The activity has been adopted to current app or service");
                // To-Do something
              } else if (inResponse.adopted) {
                console.log("The activity has been transferred from current app or service to another adopter");
                // To-Do something
              } else if (!inResponse.adopted) {
                console.log("The succeeded to request a activity adoption and start subscription");
              }
            },
            onFailure: function (inError) {
              console.log("Failed to request a activity adoption");
              console.log("[" + inError.errorCode + "]: " + inError.errorText);
              // To-Do something
              return;
            },
          });
          break;
        case 39: //RIGHT arrow
          console.log("Right arrow clicked =======>");
          var request = window.webOS.service.request("luna://com.webos.service.wifi", {
            method: "getCountryCode",
            parameters: {},
            onSuccess: function (inResponse) {
              console.log("The app is launched", inResponse);
              // To-Do something
            },
            onFailure: function (inError) {
              console.log("Failed to to do the operation");
              console.log("[" + inError.errorCode + "]: " + inError.errorText);
              // To-Do something
              return;
            },
          });
          break;
        case 40: //DOWN arrow
          if (isListening) return;
          setisListening(true);
          recognition.start();
          break;
        case 48: //Zero Btn
          if (isListening) return;
          setisListening(true);
          recognition.start();
          break;
        case 13: //OK button
          break;
        case 10009: //RETURN button
          window?.tizen.application.getCurrentApplication().exit();
          break;
        default:
          console.log("Key code : " + e.keyCode);
          break;
      }
    };

    window.addEventListener("keydown", keyDownEventListener);
    return () => {
      window.removeEventListener("keydown", keyDownEventListener);
    };
  }, [isListening]);

  useEffect(() => {
    const launchParams = window.webOSDev.launchParams();
    // console.log("<====launchParams===>", { launchParams });

    try {
      // console.log("<====tizen====>", { tizen: window.tizen });
      var app = window?.tizen?.application.getCurrentApplication();

      var watchId = app.addEventListener({ appId: "y2JqUKwCOh.BasicDemo", name: "first_app_event_1" }, function (event, data) {
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
      // console.log("<=========webOSLaunch=========>", e);
    });

    document.addEventListener("webOSRelaunch", function (e) {
      // console.log("<=========webOSRelaunch=========>", e);
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
      <h1 style={{ width: "500px" }}>{JSON.stringify(value)}</h1>
      <h1 style={{ width: "500px" }}>{JSON.stringify(value2)}</h1>
      <Calculator></Calculator>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
