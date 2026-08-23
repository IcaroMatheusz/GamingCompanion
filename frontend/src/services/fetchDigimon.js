const API_URL = "https://digi-api.com/api/v1";

export async function fetchDigimon(digimon) {

    try {
        const response = await fetch(`${API_URL}/digimon/${digimon}`)

        if (!response.ok) {
            throw new Error("Digimon não encontrado")
        }

        const data = await response.json()

        return data;

    } catch (err) {
        console.log(err)
        throw err
    }
}