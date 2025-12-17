import { Outlet } from "react-router-dom";

import Header from "./components/layoutes/Header";

function App() {
  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default App;

//  <main className="container mx-auto px-4 py-8 max-w-7xl">
//    <Outlet />
//  </main>;
