import { Geolocation } from '@capacitor/geolocation'

export interface Coordinates {
  latitude: number
  longitude: number
}

export const getCurrentPosition = async (): Promise<Coordinates> => {
  const coordinates = await Geolocation.getCurrentPosition()
  return {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude
  }
}

export const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
  const data = await response.json()
  
  if (data.status === "OK") {
    return data.results[0].formatted_address
  } else {
    throw new Error("住所を取得できませんでした")
  }
}