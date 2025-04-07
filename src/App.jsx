
import Header from "./components/common/Header/Header";
import Main from "./components/Main";
import Footer from "./components/common/Footer/Footer";
import PrintForm from "./components/PrintForm";

export default function Home() {
  return (
    <div className="container mx-auto ">
      <Header />
      <Main />
      <Footer />
      <PrintForm/>
    </div>
  );
}