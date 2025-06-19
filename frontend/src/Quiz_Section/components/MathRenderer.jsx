// components/MathRenderer.jsx
import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const MathRenderer = ({ expression, displayMode = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(expression, containerRef.current, {
          throwOnError: false,
          displayMode,
        });
      } catch (err) {
        console.log(err);
        containerRef.current.innerHTML = `<span class="text-red-500">Error rendering math</span>`;
      }
    }
  }, [expression, displayMode]);

  return (
    <span
      ref={containerRef}
      className={`katex-container ${
        displayMode
          ? "block my-4 text-center text-xl leading-relaxed"
          : "inline text-base leading-normal"
      }`}
      style={{
        fontFamily: `'Times New Roman', serif`,
        overflowX: "auto",
      }}
    />
  );
};

export default MathRenderer;
