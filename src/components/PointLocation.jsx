import { useState, useEffect } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"
import { Marker, useMapEvents, Popup } from "react-leaflet"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import { buscarCoordenadas } from "../utils/Coordenadas"

const iconRoxo = new L.Icon({
    iconUrl: '/location-pin-roxo.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})


export default function PointLocation({ nomeLocal, logradouro, numero, cidade, estado, buscarNoMapa, onCoordenadasChange }) {
    const [position, setPosition] = useState(null)
    const map = useMap()

    useEffect(() => {
        async function buscaCoordenadas() {
            if (!nomeLocal && !logradouro && !cidade && !estado) return

            const coords = await buscarCoordenadas(nomeLocal, logradouro, numero, cidade, estado)
            if (coords) {
                setPosition(coords)
                map.flyTo(coords, 18)
                if (onCoordenadasChange) onCoordenadasChange(coords)
            }
        }

        buscaCoordenadas()
    }, [buscarNoMapa])

    useMapEvents({
        click(e) {
            const coords = [e.latlng.lat, e.latlng.lng]
            setPosition(coords)
            console.log("cordenadas", coords);

            if (onCoordenadasChange) onCoordenadasChange(coords)
        },
    })

    return position ? (
        <Marker
            position={position}
            draggable={true}
            icon={iconRoxo}
            eventHandlers={{
                dragend: (e) => {
                    const coords = [e.target.getLatLng().lat, e.target.getLatLng().lng]
                    setPosition(coords)
                    if (onCoordenadasChange) onCoordenadasChange(coords)
                },
            }}
        >
        </Marker>
    ) : null
}