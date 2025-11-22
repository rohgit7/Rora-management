import React from 'react'
import ResourceList from '../components/ResourceList'
import { appointmentSchema } from '../forms/schemas'

export default function Appointments() {
  return <ResourceList title="Appointments" resource="appointments" schema={appointmentSchema} />
}