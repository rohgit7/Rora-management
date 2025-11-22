import React from 'react'
import ResourceList from '../components/ResourceList'
import { patientSchema } from '../forms/schemas'

export default function Patients() {
  return <ResourceList title="Patients" resource="patients" schema={patientSchema} />
}