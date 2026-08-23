import GameHeader from "./GameHeader";
import Footer from "../Footer";

function GameMainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <GameHeader />

      <main className="flex-1 m-6 flex flex-col items-center">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default GameMainLayout;