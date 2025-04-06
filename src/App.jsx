
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import PrintForm from "./components/PrintForm";

export default function Home() {
  return (
    <div className="text-white bg-black">
      <Header />
      <Main />
      <Footer />
      <PrintForm/>
    </div>
  );
}