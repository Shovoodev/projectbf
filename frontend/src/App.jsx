import { Outlet } from "react-router-dom";
import Hero from "./components/common/Hero";
import Footer from "./components/layouts/Footer/Footer";
import Header from "./components/layouts/Header/Header";

function App() {
  // const navigation = useNavigation();
  return (
    <section className="">
      <Header />
      <main className="mx-auto">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default App;
