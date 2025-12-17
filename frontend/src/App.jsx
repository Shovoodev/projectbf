import { Outlet } from "react-router-dom";
import Footer from "./components/layouts/Footer/Footer";
import Header from "./components/layouts/Header/Header";

function App() {
  // const navigation = useNavigation();
  return (
    <section className="">
      <Header />
      <main className="max-w-[1360px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default App;
