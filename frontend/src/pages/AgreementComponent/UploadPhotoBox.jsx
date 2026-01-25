// import React from 'react'
// const FormLabel = ({ children, required }) => (
//   <label className="block text-lg font-bold text-gray-700 mb-1">
//     {children} {required && <span className="text-red-500">*</span>}
//   </label>
// );

// const InputField = ({
//   type = "text",
//   placeholder,
//   required,
//   value,
//   onChange,
// }) => (
//   <input
//     type={type}
//     required={required}
//     value={value}
//     onChange={onChange}
//     placeholder={placeholder}
//     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//   />
// );

// function UploadPhotoBox() {
//   return (
//     <div className="md:col-span-2">
//       <FormLabel required>
//         Upload photo identification for
//       </FormLabel>

//       <label className="flex flex-col  items-center justify-center w-full  border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group ">
//         <div className="flex flex-col items-center justify-center text-center p-4">
//           <svg
//             className="w-12 h-12 mb-3 mt-5 text-gray-400 group-hover:text-black transition"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//             />
//           </svg>

//           <p className="font-semibold text-gray-900">
//             Drag & drop files here, or click to upload
//           </p>
//           <p className="text-sm text-gray-500 mb-4">
//             You can upload up to 2 images <br /> (Only .jpg, .jpeg, .png, .heic
//             files are allowed)
//           </p>
//         </div>

//         <input
//           type="file"
//           multiple
//           required
//           accept="image/*"
//           onChange={}
//           className="hidden"
//         />
//       </label>
//     </div>
//   );
// }

// export default UploadPhotoBox
