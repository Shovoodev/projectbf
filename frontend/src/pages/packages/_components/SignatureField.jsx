import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { IoMdCloseCircle } from "react-icons/io";

const SignatureField = ({ sigPadRef, clearSignature, onStrokeEnd }) => {
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
      {/* Make this relative */}
      <div ref={wrapperRef} className="relative p-1">
        {size.width > 0 && (
          <>
            <ReactSketchCanvas
              ref={sigPadRef}
              width={size.width}
              height={size.height}
              strokeWidth={2}
              strokeColor="black"
              className="rounded-md border border-dashed border-gray-400 touch-none"
              onStrokeEnd={onStrokeEnd}
            />

            {/* Close Button INSIDE canvas */}
            <button
              type="button"
              onClick={clearSignature}
              className="absolute top-2 right-2 text-red-500 hover:scale-110 transition"
            >
              <IoMdCloseCircle size={32} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignatureField;
