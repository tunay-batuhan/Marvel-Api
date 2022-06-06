import "./styles/app.scss";
import "./styles/characterCard.scss";
import "./styles/header.scss";
import "./styles/modal.scss";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import CharacterCard from "./components/CharacterCard";

function App() {
  return (
    <>
      <Header />
      <CharacterCard />
    </>
  );
}

export default App;
