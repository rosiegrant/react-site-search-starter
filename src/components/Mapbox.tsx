import React, { useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl, { Map } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1IjoieWV4dCIsImEiOiJqNzVybUhnIn0.hTOO5A1yqfpN42-_z_GuLw';

interface PinProps {
    label: string
}

function Pin(props: PinProps) {
    return (
        <svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15.0882C30 23.4212 23.3333 30.7353 15 38C7.22222 31.2941 0 23.4212 0 15.0882C0 6.75523 6.71573 0 15 0C23.2843 0 30 6.75523 30 15.0882Z" fill="#047857" />
            <text x="50%" y="50%" fontSize="16px" fontWeight="bold" dominantBaseline="middle" textAnchor="middle" fill="white">{props.label}</text>
        </svg>
    )
}

interface Props {
    markers?: {
        coord: [number, number]
        url?: string
    }[]
}

export default function Mapbox(props: Props) {
    const mapContainer = useRef(null);
    const map = useRef<Map | null>(null);

    useLayoutEffect(() => {
        //if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current || '',
            style: 'mapbox://styles/mapbox/streets-v11',
            interactive: false,
            zoom: 9,
            center: [95.7129, 37.0902]
        });
        map.current.setPadding({
            left: 50,
            top: 50,
            bottom: 50,
            right: 50,
        })
    });

    useLayoutEffect(() => {
        if (map === null || map.current === null || !props.markers || props.markers.length === 0) return;
        const bounds = new mapboxgl.LngLatBounds();

        for (const [i, marker] of (props.markers || []).entries()) {
            const el = document.createElement(marker.url ? 'a' : 'div');
            if (marker.url) {
                el.setAttribute('href', marker.url)
                el.setAttribute('target', '_blank')
            }

            ReactDOM.render(<Pin label={String(i + 1)} />, el);
            el.className = 'marker';

            bounds.extend(marker.coord);
            new mapboxgl.Marker(el).setLngLat(marker.coord).addTo(map.current);
        }

        map.current.setCenter(bounds.getCenter());
        map.current.fitBounds(bounds);
    }, [props.markers])

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}