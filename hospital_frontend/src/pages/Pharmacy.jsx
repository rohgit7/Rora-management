import React from 'react'
import ResourceList from '../components/ResourceList'
import { pharmacySchema } from '../forms/schemas'

export default function Pharmacy() {
  return <ResourceList title="Pharmacy" resource="pharmacies" schema={pharmacySchema} />
}