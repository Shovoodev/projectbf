import DatePicker from "react-datepicker";

export const DeceasedDetails = ({
  salutations,
  setDeceasedFormValues,
  firstName,
  setFirstName,
  dob,
  setDob,
  dod,
  setDod,
  notPassed,
  setNotPassed,
  nameLabel,
  DeaceasedImages,
  handleDeaceasedIdUpload,
  removeImage,
  uploadError,
  isEnglish,
  FormLabel,
  InputField,
  SelectField,
}) => {
  return (
    <div>
      <h3 className="text-4xl text-center font-bold mb-6">
        {isEnglish ? "Deceased Persons Details" : "逝者信息"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormLabel required>{isEnglish ? "Salutation" : "称谓"}</FormLabel>
          <SelectField options={salutations} required />
        </div>
        <div>
          <FormLabel required>
            {isEnglish ? "First given name" : "名"}
          </FormLabel>
          <InputField
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <FormLabel> {isEnglish ? "Other given name(s)" : "其他名"}</FormLabel>
          <InputField />
        </div>
        <div>
          <FormLabel required>
            {isEnglish ? "Surname / Family Name" : "姓"}
          </FormLabel>
          <InputField required />
        </div>
        <div>
          <FormLabel required>
            {isEnglish ? "Date of Birth" : "出生年月"}
          </FormLabel>
          <DatePicker
            selected={dob}
            onChange={setDob}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        <div className="flex items-center w-full md:col-span-2">
          <input
            type="checkbox"
            checked={notPassed}
            onChange={(e) => setNotPassed(e.target.checked)}
            className="w-5 h-5 mr-2"
          />
          <span className="font-medium">
            {isEnglish ? "Person Has Passed Away" : "还未过世"}
          </span>
        </div>

        {!notPassed && (
          <div>
            <FormLabel required>
              {" "}
              {isEnglish ? "Date of Death" : "过世日期"}
            </FormLabel>
            <DatePicker
              selected={dod}
              onChange={setDod}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
        )}

        <div className="md:col-span-2">
          <FormLabel required>
            {isEnglish
              ? "Last registered address of " + nameLabel
              : nameLabel + " 最近注册过的居住地址"}
          </FormLabel>

          <InputField
            required
            placeholder={
              isEnglish
                ? "This is the address they have resided at for the last 3 months."
                : "此地址为过去三个月居住的地方"
            }
          />
        </div>

        {!notPassed && (
          <>
            <div className="md:col-span-2">
              <FormLabel required>
                {isEnglish
                  ? `Where did ${nameLabel} pass away ?`
                  : `${nameLabel} 过世地点`}
              </FormLabel>

              <InputField required />
            </div>
            <div className="md:col-span-2">
              <FormLabel required>
                {isEnglish
                  ? `Where is ${nameLabel} now ?`
                  : `${nameLabel} 逝者现在在哪里 ?`}
              </FormLabel>

              <InputField
                placeholder={
                  isEnglish ? "Eg: Home / Hospital" : "比如：家中/医院"
                }
                required
              />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <FormLabel required>
            {isEnglish
              ? `Does ${nameLabel} have any form of battery powered devices?`
              : `${nameLabel} 身上是否有由电池驱动的仪器？`}
          </FormLabel>

          <InputField
            required
            placeholder={
              isEnglish
                ? "This includes all forms of pacemakers and defibrillators"
                : "这包括所有的起搏器和除颤器"
            }
          />
        </div>

        <div className="md:col-span-2">
          <FormLabel required>
            {isEnglish
              ? `Who is ${nameLabel}'s regular doctor (GP) & surgery address?`
              : `${nameLabel} 的家庭医生名字和诊所地址`}
          </FormLabel>

          <InputField
            required
            placeholder={
              isEnglish
                ? "Eg: Dr Adam Brown, Strathfield"
                : "比如：Adam Brown 医生，Strathfield"
            }
          />
        </div>

        {/*  Upload PHoto For Deaseaed */}
        <div className="md:col-span-2">
          <FormLabel required>
            {isEnglish
              ? `Upload photo identification for ${nameLabel}`
              : `上传照片证件${nameLabel}`}
          </FormLabel>

          <label className="flex flex-col  items-center justify-center w-full  border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group ">
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
              onChange={handleDeaceasedIdUpload}
              className="hidden"
            />
          </label>
        </div>
        {uploadError && (
          <p className="text-red-500 mt-2 text-sm ">{uploadError}</p>
        )}
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2">
            {DeaceasedImages.map((file, index) => (
              <div key={index} className="relative inline-block">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-52 object-cover border rounded"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index, "deceased")}
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