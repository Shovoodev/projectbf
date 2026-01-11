import { createContext, useContext, useMemo, useState } from "react";

const PrePayServiceProviderContext = createContext();

export const PrePayServiceProvider = ({ children }) => {
  const [writer, setWriter] = useState("");

  const ctxValue = useMemo(
    () => ({
      writer,
      setWriter,
    }),
    [writer, setWriter]
  );

  return (
    <PrePayServiceProviderContext.Provider value={ctxValue}>
      {children}
    </PrePayServiceProviderContext.Provider>
  );
};

// Export the hook as a property of the component
PrePayServiceProvider.usePrePayServiceApi = function usePrePayServiceApi() {
  const context = useContext(PrePayServiceProviderContext);

  if (context === undefined) {
    throw new Error(
      "usePrePayServiceApi must be used within a PrePayServiceProvider"
    );
  }

  return context;
};

// Usage would then be: PrePayServiceProvider.usePrePayServiceApi()
