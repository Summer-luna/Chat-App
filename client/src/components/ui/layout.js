import { Outlet } from "react-router-dom";
import { Header } from "./header";

export const AppLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
