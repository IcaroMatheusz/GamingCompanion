

export async function fetchDigimon(digimon) {

    try {
        const response = await fetch(`http://localhost:3000/api/digimon/${digimon}`);

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