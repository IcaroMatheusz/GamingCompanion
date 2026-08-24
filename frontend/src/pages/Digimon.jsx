import GameMainLayout from "../components/GamePageComponents/GameMainLayout";
import DigimonAPI from "../components/DigimonComponents/DigimonAPI";
import DigimonRadialProgress from "../components/DigimonComponents/DigimonRadialProgress";
import { useState } from "react";

function Digimon() {


  const [saveInfo, setSaveInfo] = useState(null)

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("saveFile", file);

    const response = await fetch("http://localhost:3000/api/save/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    setSaveInfo(data.saveInfo);
  }

  return (
    <>
      <GameMainLayout>
        <h1 className="text-2xl font-bold m-4">Carregar o save</h1>
        <input type="file" className="file-input file-input-md" onChange={handleFileChange} />

        <div className="flex justify-around mt-10 gap-50">
          <div className="flex flex-col gap-10">
            <h1 className="text-xl font-bold">Último Digimon Capturado:</h1>
            <DigimonAPI autoSearch={saveInfo?.lastCapturedName} />
          </div>

          <div className="flex flex-col gap-10">
            <h1 className="text-xl font-bold">Digimons Capturados:</h1>
            <DigimonRadialProgress captured={saveInfo?.capturedCount} total={475}/>
          </div>
        </div>
      </GameMainLayout>
    </>
  );
}

export default Digimon;
