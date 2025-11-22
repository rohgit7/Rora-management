import React from 'react'
import ResourceList from '../components/ResourceList'
import { medicineSchema } from '../forms/schemas'

export default function Medicines() {
  return <ResourceList title="Medicines" resource="medicines" schema={medicineSchema} />
}