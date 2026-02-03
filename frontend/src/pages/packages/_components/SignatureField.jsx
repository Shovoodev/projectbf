import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const SignatureField = ({
  sigPadRef,
  clearSignature,
  onStrokeEnd,
}) => {
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

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(wrapperRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="w-full">
<<<<<<< HEAD
      <label className="block mb-2 font-medium text-gray-700">
        Signature Of Investor 1
      </label>
      <div ref={wrapperRef} className="border rounded bg-white w-full">
=======
      <div ref={wrapperRef} className="p-1">
>>>>>>> fdd390eadc7d47a7d8167ee9bb1f9361c9abaee4
        {size.width > 0 && (
          <ReactSketchCanvas
            ref={sigPadRef}
            width={size.width}
            height={size.height}
            strokeWidth={2}
            strokeColor="black"
            className="rounded-md border border-dashed border-gray-400 touch-none"
            onStrokeEnd={onStrokeEnd}
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={clearSignature}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignatureField;
