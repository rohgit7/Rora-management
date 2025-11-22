import React from 'react'
import ResourceList from '../components/ResourceList'
import { departmentSchema } from '../forms/schemas'

export default function Departments() {
  return <ResourceList title="Departments" resource="departments" schema={departmentSchema} />
}