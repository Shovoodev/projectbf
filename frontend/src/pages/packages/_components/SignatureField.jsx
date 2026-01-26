import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const SignatureField = ({ sigPadRef, clearSignature, saveSignature }) => {
  const wrapperRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 150 });

  useEffect(() => {
    if (!wrapperRef.current) return;

    const updateSize = () => {
      setSize({
        width: wrapperRef.current.offsetWidth,
        height: 150,
      });
    };

    updateSize(); // initial

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(wrapperRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="w-full">

      <div ref={wrapperRef} className="p-1">
        {size.width > 0 && (
          <ReactSketchCanvas
            ref={sigPadRef}
            width={size.width}
            height={size.height}
            strokeWidth={2}
            strokeColor="black"
            className="rounded-md border border-dashed border-gray-400 touch-none"
          />
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={saveSignature}
          disabled={!size.width}
          className="px-4 py-2 rounded bg-black text-white disabled:bg-gray-300"
        >
          Save
        </button>

        <button
          type="button"
          onClick={clearSignature}
          disabled={!size.width}
          className="px-4 py-2 rounded bg-black text-white disabled:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignatureField;
