import React from 'react'
import ResourceList from '../components/ResourceList'
import { doctorSchema } from '../forms/schemas'

export default function Doctors() {
  return <ResourceList title="Doctors" resource="doctors" schema={doctorSchema} />
}