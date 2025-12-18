'use client'

import { useMemo } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

interface Business {
  id: number
  name: string
  offer: string
  distance: string
  address: string
  hours: string
  icon: string
  lat: number
  lng: number
}

interface StadiumMapProps {
  businesses: Business[]
  stadiumName: string
  stadiumLat: number
  stadiumLng: number
  colors: {
    primary: string
    secondary: string
  }
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem'
}

export default function StadiumMap({ businesses, stadiumName, stadiumLat, stadiumLng, colors }: StadiumMapProps) {
  const center = useMemo(() => ({ lat: stadiumLat, lng: stadiumLng }), [stadiumLat, stadiumLng])

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 rounded-2xl flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-gray-600 font-semibold mb-2">Google Maps API Key gerekli</p>
          <p className="text-gray-500 text-sm mb-4">
            Lütfen .env.local dosyasına NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ekleyin
          </p>
          <div className="bg-gray-100 rounded-lg p-4 text-left text-xs font-mono">
            <p className="mb-2">1. Proje kök dizininde .env.local dosyası oluşturun</p>
            <p className="mb-2">2. İçine şunu ekleyin:</p>
            <p className="bg-white p-2 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here</p>
            <p className="mt-2 text-xs text-gray-500">
              API key almak için: https://console.cloud.google.com/
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {/* Stadium Marker - Green */}
        <Marker
          position={{ lat: stadiumLat, lng: stadiumLng }}
          title={stadiumName}
          label={{
            text: '🏟️',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        />

        {/* Business Markers - Blue */}
        {businesses.map((business) => (
          <Marker
            key={business.id}
            position={{ lat: business.lat, lng: business.lng }}
            title={`${business.name} - ${business.offer}`}
            label={{
              text: '📍',
              fontSize: '16px'
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}
