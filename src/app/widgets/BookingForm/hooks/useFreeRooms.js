import { useEffect, useState } from 'react'
import {
  getTowersOptions,
  getFloorsOptions,
  getRoomsOptions,
} from '../utils/getFiltered'

export const useFreeRooms = (allFreeRooms, { tower, floor, room }) => {
  const [towerOptions, setTowerOptions] = useState(allFreeRooms)
  const [floorOptions, setFloorOptions] = useState(allFreeRooms)
  const [roomOptions, setRoomOptions] = useState(allFreeRooms)

  useEffect(() => {
    setTowerOptions(getTowersOptions(allFreeRooms, { floor, room }))
    setFloorOptions(getFloorsOptions(allFreeRooms, { tower, room }))
    setRoomOptions(getRoomsOptions(allFreeRooms, { tower, floor }))
  }, [allFreeRooms, tower, floor, room])

  return { towerOptions, floorOptions, roomOptions }
}
