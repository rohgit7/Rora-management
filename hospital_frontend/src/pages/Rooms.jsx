import React from 'react'
import ResourceList from '../components/ResourceList'
import { roomSchema } from '../forms/schemas'

export default function Rooms() {
  return <ResourceList title="Rooms" resource="rooms" schema={roomSchema} />
}