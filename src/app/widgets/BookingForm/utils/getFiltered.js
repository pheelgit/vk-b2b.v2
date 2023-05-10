export function getTowersOptions(arr, { floor, room }) {
  let towers = [...arr]
  if (floor) {
    towers = towers.filter(room => room.floor === floor)
  }
  if (room) {
    towers = towers.filter(room => room.room === room)
  }

  const towersArray = typeArray(towers, 'tower')

  return towersArray.map(tower => ({
    value: tower,
    label: `Башня ${tower}`,
  }))
}

export function getFloorsOptions(arr, { tower, room }) {
  let floors = [...arr]
  if (tower) {
    floors = floors.filter(room => room.tower === tower)
  }
  if (room) {
    floors = floors.filter(room => room.room === room)
  }

  const floorsArray = typeArray(floors, 'floor')

  return floorsArray.map(floor => ({
    value: floor,
    label: floor,
  }))
}

export function getRoomsOptions(arr, { tower, floor }) {
  let rooms = [...arr]
  if (tower) {
    rooms = rooms.filter(room => room.tower === tower)
  }

  if (floor) {
    rooms = rooms.filter(room => room.floor === floor)
  }

  const roomsArray = typeArray(rooms, 'room')

  return roomsArray.map(room => ({
    value: room,
    label: room,
  }))
}

function typeArray(arr, type) {
  return Array.from(new Set(arr.map(el => el[type])))
}
