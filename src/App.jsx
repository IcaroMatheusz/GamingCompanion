import "./App.css";

import Header from "./components/Header";
import GameList from "./components/GameList";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <div className="min-h-screen  bg-gray-9000 flex flex-col">
        <Header />

        <main className="mt-30 flex flex-col items-center justify-center">

          <SearchBar />

          <GameList />


        </main>

      </div>
    </>
  );
}

export default App;
