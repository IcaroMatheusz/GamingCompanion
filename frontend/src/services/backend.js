export async function getBackendStatus() {
    const response = await fetch("http://localhost:3000/api/status")

    return response.json();
}
