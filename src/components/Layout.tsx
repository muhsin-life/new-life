import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { addressStore } from "./hooks/useStore";

const Layout = ({ children }: { children: ReactNode }) => {
  
  const {currentAddress, setCurrentAddress} = addressStore()
  
  useEffect(() => {

  }, []);

  return (
    <>
      <Navbar />
      <div className="flex-grow flex-1">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
