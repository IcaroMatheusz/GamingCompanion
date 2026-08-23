import GameHeader from "./GameHeader"


function GameMainLayout({ children }) {
  return (
    <div className="min-h-screenbg-gray-9000 flex flex-col">
      <GameHeader />
      <main className="mt-6 flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}

export default GameMainLayout;
