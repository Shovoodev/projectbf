import { Outlet } from "react-router-dom";

function LandingLayout() {
  return (
    <main className="mx-auto">
      <Outlet />
    </main>
  );
}
export default LandingLayout;
