import SignatureCanvas from "react-signature-canvas";

export const SignatureDetails = ({
    signatureType,
    setSignatureType,
    signatureHandler,
    signatureImage,
    removeImage,
    sigPadRef,
    isEnglish, // ✅ language toggle
    FormLabel,
}) => {
    return (
        <div>
            <h3 className="text-4xl text-center font-bold mb-6">
                {isEnglish ? "Signature" : "签名"}
            </h3>

            <div>
                <FormLabel required>
                    {isEnglish ? "Choose Your Signature Type" : "选择签名方式"}
                </FormLabel>

                <select
                    value={signatureType}
                    onChange={(e) => setSignatureType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                    <option value="Digital Signature">
                        {isEnglish ? "Screen Signature" : "屏幕签名"}
                    </option>
                    <option value="Upload Photo">
                        {isEnglish ? "Upload Photo" : "上传照片"}
                    </option>
                </select>
            </div>

            {/* Upload Signature Image */}
            {signatureType === "Upload Photo" && (
                <div className="mt-4">
                    <FormLabel required>
                        {isEnglish ? "Upload Your Signature Here" : "在此上传您的签名"}
                    </FormLabel>

                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group p-1">
                        <div className="flex flex-col items-center justify-center text-center py-4">
                            <svg
                                className="w-12 h-12 mb-3 mt-5 text-gray-400 group-hover:text-black transition"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>

                            <p className="font-semibold text-gray-900">
                                {isEnglish
                                    ? "Drag & drop files here, or click to upload"
                                    : "将文件拖放到此处，或点击上传"}
                            </p>

                            <p className="text-sm text-gray-500 mb-4">
                                {isEnglish
                                    ? "(Only .jpg, .jpeg, .png, .heic files are allowed)"
                                    : "（仅允许 .jpg、.jpeg、.png、.heic 文件）"}
                            </p>
                        </div>

                        <input
                            type="file"
                            multiple
                            required
                            accept="image/*"
                            onChange={signatureHandler}
                            className="hidden"
                        />
                    </label>

                    <div className="md:col-span-2 mt-4">
                        <div className="flex flex-wrap gap-2">
                            {signatureImage.map((file, index) => (
                                <div key={index} className="relative inline-block">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-52 object-cover border rounded"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeImage(index, "signature")}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Digital Signature */}
            {signatureType === "Digital Signature" && (
                <div className="mt-4">
                    <FormLabel required>
                        {isEnglish ? "Sign Your Name Here" : "请在此签名"}
                    </FormLabel>

                    <div className="border rounded-md bg-gray-50 p-2">
                        <SignatureCanvas
                            ref={sigPadRef}
                            penColor="black"
                            canvasProps={{ className: "w-full h-32" }}
                        />

                        <button
                            type="button"
                            onClick={() => sigPadRef.current.clear()}
                            className="mt-2 text-sm text-red-500"
                        >
                            {isEnglish ? "Clear Signature" : "清除签名"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};