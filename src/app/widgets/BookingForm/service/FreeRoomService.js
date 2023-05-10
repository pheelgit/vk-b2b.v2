import dayjs from 'dayjs'
import { freeRoomsFromServer } from './data'

export const FreeRoomsService = {
  async getAll(date, time) {
    if (!date || !time) {
      return []
    }

    const params = {
      date: dayjs(date).format('DD-MM-YYYY'),
      timeStart: dayjs(time[0]).format('HH-mm'),
      timeEnd: dayjs(time[1]).format('HH-mm'),
    }

    ///const freeRoomsFromServer = axios.get('...',{params}).then(({data})=>data.data)

    return freeRoomsFromServer
  },

  bookingRoom(data) {
    ///fetch axios.post('....',{data})
    console.log(JSON.stringify(data, null, '  '))
  },
}
