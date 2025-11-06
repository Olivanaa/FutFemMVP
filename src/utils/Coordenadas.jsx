export async function buscarCoordenadas(nomeLocal, logradouro, numero, cidade, estado) {
    function encodeForNominatim(value) {
        return encodeURIComponent(value.toLowerCase()).replace(/%20/g, "+")
    }
    try {
        let data = []

        if (nomeLocal) {
            const query = encodeForNominatim(nomeLocal)
            const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2`
            console.log("Buscando por nomeLocal:", url)
            const response = await fetch(url, { headers: { 'User-Agent': 'futfem-app' } })
            data = await response.json()
            console.log(data);

        }
        if (data.length === 0 && logradouro && cidade && estado) {
            const street = encodeForNominatim(numero ? `${logradouro} ${numero}` : logradouro)
            const city = encodeForNominatim(cidade)
            const state = encodeForNominatim(estado)
            const url = `https://nominatim.openstreetmap.org/search?street=${street}&city=${city}&state=${state}&country=brazil&format=jsonv2`
            const response = await fetch(url, { headers: { 'User-Agent': 'futfem-app' } })
            data = await response.json()
            console.log(data);
        }
        if (data.length > 0) {
            const { lat, lon } = data[0]
            console.log("Coords:", parseFloat(lat), parseFloat(lon));
            
            return [parseFloat(lat), parseFloat(lon)]
        } else {
            throw new Error("Não foi possível encontrar coordenadas")
        }
    } catch (error) {
        console.error("Erro ao buscar coordenadas:", error)
    }

}