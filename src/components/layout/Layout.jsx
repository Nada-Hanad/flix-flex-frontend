import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="bg-darkBlack">
      <Navbar />
      <main className="w-screen overflow-hidden pt-40">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
