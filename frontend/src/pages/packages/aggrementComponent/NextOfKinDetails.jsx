export const NextOfKinDetails = ({
  salutations,
  setKinFirstName,
  nameLabel,
  kinNameValue,
  kinIdImages,
  handleKinIdUpload,
  removeImage,
  uploadError,
  isEnglish, // NEW: language toggle

  FormLabel,
  InputField,
  SelectField,
}) => {
  return (
    <div>
      <h3 className="text-4xl text-center font-bold mb-6">
        {isEnglish ? "Next of Kin Details" : "近亲信息"}
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <FormLabel required>{isEnglish ? "Salutation" : "称谓"}</FormLabel>
          <SelectField options={salutations} required />
        </div>

        <div>
          <FormLabel required>
            {isEnglish ? "First given name" : "名"}
          </FormLabel>
          <InputField
            onChange={(e) => setKinFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <FormLabel>{isEnglish ? "Other given name(s)" : "其他名"}</FormLabel>
          <InputField />
        </div>

        <div>
          <FormLabel required>
            {isEnglish ? "Surname / Family Name" : "姓"}
          </FormLabel>
          <InputField required />
        </div>

        <div className="md:col-span-2">
          <FormLabel required>
            {isEnglish ? "Current Address" : "现住地址"}
          </FormLabel>
          <InputField required />
        </div>

        <div>
          <FormLabel required>{isEnglish ? "Mobile" : "手机号码"}</FormLabel>
          <InputField type="tel" required />
        </div>

        <div>
          <FormLabel required>{isEnglish ? "Email" : "邮箱"}</FormLabel>
          <InputField type="email" required />
        </div>

        <div className="md:col-span-2">
          <FormLabel required>
            {isEnglish
              ? `Your relationship to ${nameLabel}`
              : `您与${nameLabel}的关系`}
          </FormLabel>
          <InputField required />
        </div>

        <div className="md:col-span-2">
          <FormLabel required>
            {isEnglish
              ? `Upload photo identification for ${kinNameValue}`
              : `上传${kinNameValue}的照片证件`}
          </FormLabel>

          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group">
            <div className="flex flex-col items-center justify-center text-center p-4">
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
                  : "拖放文件到此处，或点击上传"}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                {isEnglish ? (
                  <>
                    You can upload up to 2 images <br /> (Only .jpg, .jpeg,
                    .png, .heic files are allowed)
                  </>
                ) : (
                  <>
                    您最多可以上传 2 张图片 <br /> （仅允许
                    .jpg、.jpeg、.png、.heic 文件）
                  </>
                )}
              </p>
            </div>

            <input
              type="file"
              multiple
              required
              accept="image/*"
              onChange={handleKinIdUpload}
              className="hidden"
            />
          </label>
        </div>

        {uploadError && (
          <p className="text-red-500 mt-2 text-sm">{uploadError}</p>
        )}

        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2">
            {kinIdImages.map((file, index) => (
              <div key={index} className="relative inline-block">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-52 object-cover border rounded"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index, "kin")}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextOfKinDetails;