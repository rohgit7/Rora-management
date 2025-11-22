import React from 'react'
import ResourceList from '../components/ResourceList'
import { ambulanceSchema } from '../forms/schemas'

export default function Ambulance() {
  return <ResourceList title="Ambulance" resource="ambulances" schema={ambulanceSchema} />
}