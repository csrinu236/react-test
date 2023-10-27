import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

function Button({ children, handleButtonClick }) {
  const { ref, focused } = useFocusable({
    onEnterPress: (e) => {
      handleButtonClick(children);
    },
  });

  return (
    <button
      onClick={() => {
        if (children === "Launch") {
          const appId = "y2JqUKwCOh.BasicDemo";
          function onSuccess() {
            window.close();
          }
          function onError(err) {
            console.log("Cannot Launch", err);
          }
          window?.tizen?.application?.launch(appId, onSuccess, onError);
        } else {
          handleButtonClick(children);
        }
      }}
      ref={ref}
      className={focused ? "button-focused" : "button"}
    >
      {children}
    </button>
  );
}

export default Button;
