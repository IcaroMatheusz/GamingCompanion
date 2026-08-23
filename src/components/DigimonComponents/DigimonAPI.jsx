import { useState } from "react";
import { fetchDigimon } from "../../services/fetchDigimon";

function DigimonAPI() {
  const [digimon, setDigimon] = useState(null);
  const [search, setSearch] = useState("");

  async function handleSearch() {
    try {
      const data = await fetchDigimon(search);


      console.log(data)
      setDigimon(data);
    } catch (err) {
      console.log(err);
      setDigimon(null);
      alert("Digimon não encontrado");
    }
  }

  return (
    <>
      <div className="card bg-base-100 w-64 shadow-sm hover:shadow-md transition-all transition-200s gap-3">
        {digimon && (
          <div className="card-body">
            <figure>
              <img
                src={digimon.images.0.href}
                alt={digimon.name}
                className="w-full h-auto object-cover"
              />
            </figure>

            <h2 className="card-title">{digimon.name}</h2>
            <p></p>
          </div>
        )}

        <div>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              placeholder="Buscar Digimon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default DigimonAPI;
