import { Appointment } from '../entities/appointment'
import { InMemoryAppointmentRepository } from '../repositories/inMemory/inMemoryAppointmentRepository'
import { getFutureDate } from '../tests/utils/getFutureDate'
import { CreateAppointment } from './createAppointment'
import { describe, it, expect } from 'vitest'

describe('Create Appointment', () => {
  it('should be able to create a new Appointment', () => {
    const startsAt = getFutureDate('2023-08-10')
    const endsAt = getFutureDate('2023-08-11')
    const appointmentRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create a new Appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2023-08-10')
    const endsAt = getFutureDate('2023-08-15')
    const appointmentRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-08-14'),
      endsAt: getFutureDate('2023-08-18')
    })).rejects.toBeInstanceOf(Error)
  })
})
