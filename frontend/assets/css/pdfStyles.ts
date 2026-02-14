export const base = {
    p: "text-sm text-[rgb(49, 41, 166)] leading-relaxed mb-4",
  } as const;
  
  export const classes = {
    /* Root Layout and Sections */
    "form-container-base":
      "w-full bg-white border border-gray-200 rounded-lg overflow-hidden font-sans shadow-xl p-1 md:p-2",
  
    "form-header-area": "bg-slate-50 p-6 border-b border-gray-200",
  
    /* Typography */
    "pdf-h2": "text-xl md:text-2xl font-bold text-[rgb(49, 41, 166)]",
  
    "pdf-section-title":
      "text-lg font-bold text-[rgb(49, 41, 166)] uppercase tracking-wide border-b border-gray-200 pb-2 mt-8 mb-4",
  
    "pdf-label":
      "text-sm font-bold text-[rgb(49, 41, 166)] mb-1 block transition-colors duration-200",
  
    "pdf-label-sm": "text-[14px] font-black text-[rgb(49, 41, 166)] block",
  
    /* Inputs */
    "pdf-input":
      "w-full p-2 border border-gray-300 rounded outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  
    "pdf-input-readonly": "bg-slate-50 font-semibold cursor-not-allowed",
  
    /* Checkboxes & Radios */
    "pdf-radio-group":
      "flex flex-wrap gap-6 p-4 bg-slate-50 rounded-md border border-slate-100",
  
    "pdf-radio-item": "flex items-center space-x-2 cursor-pointer text-[rgb(49, 41, 166)]",
  
    /* Footer & Actions */
    "pdf-footer":
      "mt-12 pt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest",
  
    "btn-primary-pdf":
      "flex items-center bg-blue-900 text-white px-10 py-3 rounded-md shadow-md hover:bg-blue-950 transition-all active:scale-95 w-full sm:w-auto justify-center font-bold",
  
    "btn-secondary":
      "flex items-center text-[rgb(49, 41, 166)] font-bold hover:text-[rgb(49, 41, 166)] transition-colors py-2 px-4",
  
    "pdf-currency-wrapper": "relative flex-1 max-w-xs",
  
    "pdf-currency-symbol":
      "absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(49, 41, 166)] font-bold",
  
    "pdf-info-box":
      "mt-6 p-4 border-l-4 border-blue-900 bg-blue-50 text-sm text-[rgb(49, 41, 166)] leading-relaxed italic",
  
    "pdf-footnote": "mt-8 text-[11px] text-[rgb(49, 41, 166)] leading-normal",
  
    "pdf-footnote-sup": "text-[rgb(49, 41, 166)] font-bold mr-1",
  
    /* Slip One */
    "pdf-intro-p": "text-sm text-[rgb(49, 41, 166)] leading-relaxed mb-4",
  
    "pdf-hr": "border-[color:rgba(30, 58, 138, 0.2)] my-6",
  
    "pdf-highlight-box":
      "bg-[#F1F6F7] text-sm p-4 my-8 border-l-4 border-[#4BA6A6] text-[rgb(49, 41, 166)]",
  
    /* Questionnaire Specifics */
    "pdf-q-title": "text-2xl font-semibold text-[#4BA6A6] mb-6 mt-8",
  
    "pdf-q-note":
      "mt-10 text-[11px] leading-relaxed border-t border-slate-200 pt-6 text-[rgb(49, 41, 166)] italic",
  
    /* Full screen backdrop for the introduction */
    "intro-overlay-container":
      "fixed inset-0 h-screen w-screen bg-[#F5F5F5] flex items-start justify-end z-[1000] overflow-hidden",
  
    /* The floating white information card */
    "intro-card":
      "bg-[rgba(255, 255, 255, 0.98)] backdrop-blur-md rounded-xl shadow-2xl border-2 border-[color:rgba(44, 90, 160, 0.3)] w-full max-w-[400px] m-5 min-h-[200px] flex items-center z-[100] p-9 text-center",
  
    /* The main button used in the overlay */
    "btn-continue":
      "bg-[rgb(44, 90, 160)] text-white border-2 border-[rgb(44, 90, 160)] px-8 py-4 rounded-lg text-base font-semibold uppercase tracking-widest transition-all duration-300 shadow-[0_6px_16px_rgba(44, 90, 160, 0.4)] hover:brightness-110 active:scale-95",
  
    /* Navigation circle buttons */
    "nav-circle-btn":
      "fixed top-1/2 -translate-y-1/2 bg-[rgba(255, 255, 255, 0.9)] border-2 border-[rgb(44, 90, 160)] text-[rgb(44, 90, 160)] w-[60px] h-[60px] rounded-full text-2xl font-bold flex items-center justify-center transition-all duration-300 z-[1100] shadow-lg hover:bg-white",
  
    /* Bottom zoom controls */
    "zoom-controls":
      "absolute bottom-5 right-5 bg-white border border-gray-200 p-2 rounded-lg flex items-center gap-3 z-[300] shadow-sm",
  
    /* Slip Three */
    "pdf-table-wrapper": "w-full overflow-x-auto",
  
    "pdf-table": "min-w-[600px] w-full border-collapse mt-4 text-[12px]",
  
    "pdf-table-thead": "border-b border-[#4BA6A6]",
  
    "pdf-table-th":
      "py-2 px-1 text-left font-bold text-[#4BA6A6] align-bottom leading-tight",
  
    "pdf-table-tr-highlight": "bg-[#00A99D] text-white font-bold",
  
    "pdf-table-td":
      "py-2 px-1 border-b border-[#4BA6A6] text-[rgb(49, 41, 166)] align-top",
  
    "pdf-table-td-teal": "text-[#00A99D] font-bold",
  
    "pdf-table-input-wrapper": "flex items-center gap-1",
  
    "pdf-table-input": "w-full border-b border-gray-300 outline-none bg-transparent py-0.5",
  
    /* ASP Frequency Grid */
    "pdf-asp-grid": "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-6",
  
    "pdf-checkbox-square":
      "w-6 h-6 border border-blue-200 bg-[rgba(239, 246, 255, 0.5)] flex-shrink-0 cursor-pointer",
  
    /* Slip five */
    "pdf-checkbox-box":
      "w-6 h-6 border border-blue-200 bg-[rgba(239, 246, 255, 0.5)] flex items-center justify-center cursor-pointer flex-shrink-0",
  
    "pdf-inline-input":
      "border-b border-gray-300 bg-blue-50/30 px-2 h-7 outline-none focus:border-blue-500 transition-colors",
  
    "pdf-adviser-row": "flex flex-col md:flex-row md:items-center gap-2 mb-3",
  
    "pdf-adviser-label": "text-sm font-medium text-[rgb(49, 41, 166)] min-w-[180px]",
  
    /* Slip Six */
    "pdf-declaration-list": "space-y-0 mt-4 mb-8",
  
    "pdf-declaration-item":
      "flex items-center gap-4 p-2 rounded-md transition-colors",
  
    "pdf-declaration-checkbox":
      "w-5 h-5 mt-1 accent-[rgb(49, 41, 166)] flex-shrink-0 cursor-pointer",
  
    "pdf-declaration-text": "text-[13px] leading-relaxed text-[rgb(49, 41, 166)]",
  
    /* Signature Upload Box */
    "pdf-signature-zone":
      "w-full border-2 border-dashed border-gray-300 rounded-lg p-6 bg-slate-50 flex flex-col items-center justify-center text-center transition-all hover:border-[rgb(49, 41, 166)] hover:bg-blue-50/30",
  
    "pdf-upload-btn":
      "bg-white border border-gray-300 px-4 py-2 rounded shadow-sm text-sm font-bold text-[rgb(49, 41, 166)] hover:bg-slate-50 active:scale-95 transition-all",
  
    /* Slip Seven */
    "pdf-signature-date-row": "flex flex-col md:flex-row gap-6 mt-4 items-stretch",
  
    "pdf-date-container": "flex flex-col justify-end flex-1",
  
    "pdf-instruction-bold":
      "text-sm font-black text-[rgb(49, 41, 166)] mb-2 leading-relaxed",
  
    /* SlipThirteen */
    "pdf-legal-list": "pl-8 space-y-3 mt-3",
  
    "pdf-legal-list-item": "flex gap-3 text-[14px] leading-relaxed text-slate-700",
  
    "pdf-legal-letter":
      "font-bold text-[rgb(49, 41, 166)] min-w-[15px] italic",
  
    "pdf-agreement-h3": "font-bold text-[rgb(49, 41, 166)] mb-3 text-lg",
  } as const;
  