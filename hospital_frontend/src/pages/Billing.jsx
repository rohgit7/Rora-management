import React from 'react'
import ResourceList from '../components/ResourceList'
import { billingSchema } from '../forms/schemas'

export default function Billing() {
  return <ResourceList title="Billing" resource="billing" schema={billingSchema} />
}