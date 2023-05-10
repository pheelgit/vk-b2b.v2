import React, { useEffect, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'

import { FreeRoomsService } from '../service/FreeRoomService'

import { useFreeRooms } from '../hooks/useFreeRooms'
import { Input, Select, DatePicker, TimePicker, Button } from 'antd'

import './BookingForm.css'
import { config } from '../utils/config'

export const BookingForm = () => {
  const [freeRoomsByDateandTime, setFreeRoomsByDateandTime] = useState([])

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm({
    mode: 'all',
  })

  const onResetBookingForm = () => {
    reset()
    setFreeRoomsByDateandTime([])
  }

  const onSubmitBookingForm = formData => {
    const { date, time, tower, floor, room, comment } = formData

    const bookingData = {
      date: dayjs(date).format(config.dateFormat),
      timeStart: dayjs(time[0]).format(config.dateFormat),
      timeEnd: dayjs(time[1]).format(config.dateFormat),
      tower,
      floor,
      room,
      comment,
    }
    FreeRoomsService.bookingRoom(bookingData)
    reset()
    setFreeRoomsByDateandTime([])
  }

  const date = watch('date')
  const time = watch('time')
  const tower = watch('tower')
  const floor = watch('floor')
  const room = watch('room')

  async function getAllFreeRoomsByDateAndTime(date, time) {
    const freeRooms = await FreeRoomsService.getAll(date, time)
    setFreeRoomsByDateandTime(freeRooms)
  }

  useEffect(() => {
    if (date && time) {
      getAllFreeRoomsByDateAndTime(date, time)
    }
  }, [date, time])

  const { towerOptions, floorOptions, roomOptions } = useFreeRooms(
    freeRoomsByDateandTime,
    {
      tower,
      floor,
      room,
    }
  )

  return (
    <form className='booking-form' onSubmit={handleSubmit(onSubmitBookingForm)}>
      <Controller
        name='date'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            {...field}
            autoFocus={true}
            format={config.dateFormat}
            disabledDate={config.disabledDates}
          />
        )}
      />
      <Controller
        name='time'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TimePicker.RangePicker
            {...field}
            format={config.timeFormat}
            minuteStep={config.minuteStep}
          />
        )}
      />

      <Controller
        name='tower'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            placeholder='выбор башни'
            disabled={!towerOptions.length}
            options={towerOptions}
          />
        )}
      />
      <Controller
        name='floor'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            placeholder='выбор этажа'
            disabled={!floorOptions.length}
            options={floorOptions}
            filterSort={config.sortingForRender}
          />
        )}
      />
      <Controller
        name='room'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            placeholder='выбор комнаты'
            disabled={!floorOptions.length}
            options={roomOptions}
            filterSort={config.sortingForRender}
          />
        )}
      />
      <Controller
        control={control}
        name='comment'
        render={({ field }) => (
          <Input.TextArea
            {...field}
            placeholder='комментарий...'
            maxLength={200}
            autoSize={{ minRows: 2, maxRows: 3 }}
          />
        )}
      />

      <div className='controllers'>
        <Button
          danger
          htmlType='reset'
          children='очистить'
          onClick={onResetBookingForm}
        />
        <Button
          type='primary'
          htmlType='submit'
          children='забронировать'
          disabled={!isValid}
        />
      </div>
    </form>
  )
}
