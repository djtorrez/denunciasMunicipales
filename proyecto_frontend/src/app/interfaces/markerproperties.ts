import { MyReclamo } from "./reclamos"


export interface MarkerProperties {
  position: google.maps.LatLngLiteral
  options:Options
  reclamo:MyReclamo
}
// export interface Position {
//   lat: number,
//   lng: number
// }
export interface Options {
  draggable:boolean,
  icon: string
}
