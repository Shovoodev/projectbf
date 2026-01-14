import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const SignatureField = ({ sigPadRef, clearSignature, saveSignature }) => {
  const wrapperRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 150 });

  // Set initial canvas width based on container
  useEffect(() => {
    if (wrapperRef.current) {
      setSize({ width: wrapperRef.current.offsetWidth, height: 150 });
    }
  }, []);

  return (
    <div className="w-full">
      <label className="block mb-2 font-medium text-gray-700">
        Signature Of Investor 1
      </label>
      <div ref={wrapperRef} className="border rounded bg-white w-full">
        {size.width > 0 && (
          <ReactSketchCanvas
            ref={sigPadRef}
            width={`${size.width}px`}
            height={`${size.height}px`}
            strokeWidth={2}
            strokeColor="black"
            className="block"
          />
        )}
      </div>

      <div className="flex gap-3 mt-3 right-0">
        <button
          type="button"
          onClick={saveSignature}
          className={`px-4 py-2 rounded ${
            !size.width ? "bg-gray-200" : "bg-black text-white"
          }`}
        >
          Save
        </button>
        <button
          type="button"
          onClick={clearSignature}
          className={`px-4 py-2 rounded ${
            !size.width ? "bg-gray-200" : "bg-black text-white"
          }`}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignatureField;
