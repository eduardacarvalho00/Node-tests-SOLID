import { getFutureDate } from '../tests/utils/getFutureDate'
import { Appointment } from './appointment'
import { expect, test } from 'vitest'

test('create as appointment', () => {
  const startsAt = getFutureDate('2023-08-10')
  const endsAt = getFutureDate('2023-08-11')

  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
})

test('cannot create as appointment with end date earlier than the start date', () => {
  const startsAt = getFutureDate('2023-08-10')
  const endsAt = getFutureDate('2023-08-09')

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt
    })
  }).toThrow()
})

test('cannot create as appointment with start date before now', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt
    })
  }).toThrow()
})
