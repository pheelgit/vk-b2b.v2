import dayjs from 'dayjs'

export const config = {
  minuteStep: 15,
  dateFormat: 'DD-MM-YYYY',
  timeFormat: 'HH-mm',

  disabledDates: curr => {
    return curr && curr < dayjs().endOf('day')
  },
  sortingForRender: (a, b) => a.value - b.value,
}
