import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureField = ({ sigPadRef, clearSignature }) => {
  const wrapperRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 150 });

  useEffect(() => {
    if (wrapperRef.current) {
      setSize({
        width: wrapperRef.current.offsetWidth,
        height: 150,
      });
    }
  }, []);

  return (
    <div className="w-full">
      <label className="block mb-2 font-medium text-gray-700">Signature</label>

      <div ref={wrapperRef} className="border rounded bg-white w-full">
        {size.width > 0 && (
          <SignatureCanvas
            ref={sigPadRef}
            penColor="black"
            canvasProps={{
              width: size.width,
              height: size.height,
              className: "block",
            }}
          />
        )}
      </div>

      <div className="flex gap-3 mt-3 right-0">
        <button
          type="button"
          onClick={clearSignature}
          className={`px-4 py-2 rounded  ${!size ? "bg-gray-200" : "bg-black"}`}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignatureField;
