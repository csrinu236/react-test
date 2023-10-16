import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

function Button({ children, handleButtonClick }) {
  const { ref, focused } = useFocusable({
    onEnterPress: (e) => {
      handleButtonClick(children);
    },
  });

  return (
    <button
      onClick={() => handleButtonClick(children)}
      ref={ref}
      className={focused ? 'button-focused' : 'button'}
    >
      {children}
    </button>
  );
}

export default Button;
