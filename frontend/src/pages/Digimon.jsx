import GameMainLayout from "../components/GamePageComponents/GameMainLayout";
import DigimonAPI from "../components/DigimonComponents/DigimonAPI";
import DigimonRadialProgress from "../components/DigimonComponents/DigimonRadialProgress";

function Digimon() {
  return (
    <>
      <GameMainLayout>

        <h1 className="text-2xl font-bold m-4">Carregar o save</h1>
        <input type="file" className="file-input file-input-md" />

    

        <div className="flex justify-around mt-10 gap-50">
          <div className="flex flex-col gap-10">
            <h1 className="text-xl font-bold">Último Digimon Capturado:</h1>
            <DigimonAPI/>
          </div>

          <div className="flex flex-col gap-10">
            <h1 className="text-xl font-bold">Digimons Capturados:</h1>
            <DigimonRadialProgress />
          </div>
        </div>

      </GameMainLayout>


    </>
  );
}

export default Digimon;
