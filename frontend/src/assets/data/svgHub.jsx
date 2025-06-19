export function BackSvg({ handleOnClick, classname, state }) {
  return (
    <div
      style={{ pointerEvents: `${state.index === 0 ? "none" : ""}` }}
      className={classname}
      aria-disabled={state.index === 0}
      role="button"
    >
      <svg
        onClick={handleOnClick}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6502 14.6666L11.8335 13.4833L6.35016 7.99998L11.8335 2.51665L10.6502 1.33331L3.9835 7.99998L10.6502 14.6666Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function ForwardSvg({ handleOnClick, hasAnswered, classname }) {
  // ForwardSvg component
  // This component renders a forward arrow icon and handles click events
  return (
    <div
      style={{ pointerEvents: `${!hasAnswered ? "none" : ""}` }}
      className={classname}
      aria-disabled={!hasAnswered}
      role="button"
    >
      <svg
        onClick={handleOnClick}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.34984 14.6666L4.1665 13.4833L9.64984 7.99998L4.1665 2.51665L5.34984 1.33331L12.0165 7.99998L5.34984 14.6666Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
