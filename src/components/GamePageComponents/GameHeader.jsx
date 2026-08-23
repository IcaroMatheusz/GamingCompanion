import { LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";

function GameHeader() {
  return (
    <section className="relative w-full h-80 overflow-hidden">
      <div className="absolute top-5 left-5 z-20 bg-base-200 p-4 rounded-2xl shadow-md hover:-translate-y-1 transition-all duration-300">
        <Link to="/">
          <LogOutIcon size={20} />
        </Link>
      </div>

      <img
        src="https://cdn2.steamgriddb.com/hero/ca4e513e86f968ab9bc48adf6b572c48.png"
        alt="Game Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-10 text-white">
        <h2 className="text-5xl font-bold">Digimon Story: Time Stranger</h2>

        <p className="text-lg mt-2">
          Track statistics of your adventures in Digimon Story: Time Stranger!
        </p>
      </div>
    </section>
  );
}

export default GameHeader;
