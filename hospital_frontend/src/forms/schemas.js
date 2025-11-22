export const patientSchema = {
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'address', label: 'Address', type: 'textarea' },
    { name: 'contact', label: 'Contact', type: 'text' },
    { name: 'medical_history', label: 'Medical History', type: 'textarea' }
  ]
}

export const doctorSchema = {
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'specialty', label: 'Specialty', type: 'text' },
    { name: 'contact', label: 'Contact', type: 'text' },
    { name: 'dept_id', label: 'Department ID', type: 'number' }
  ]
}

export const appointmentSchema = {
  fields: [
    { name: 'patient_id', label: 'Patient ID', type: 'number', required: true },
    { name: 'doctor_id', label: 'Doctor ID', type: 'number', required: true },
    { name: 'appointment_date', label: 'Appointment Date', type: 'datetime', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Scheduled', 'Completed', 'Cancelled'] }
  ]
}

export const departmentSchema = {
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text' }
  ]
}

export const billingSchema = {
  fields: [
    { name: 'patient_id', label: 'Patient ID', type: 'number', required: true },
    { name: 'appointment_id', label: 'Appointment ID', type: 'number' },
    { name: 'amount', label: 'Amount', type: 'number', required: true },
    { name: 'insurance_provider', label: 'Insurance Provider', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Paid', 'Cancelled'] }
  ]
}

export const roomSchema = {
  fields: [
    { name: 'type', label: 'Type', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', options: ['Available', 'Occupied', 'Maintenance'] },
    { name: 'capacity', label: 'Capacity', type: 'number' }
  ]
}

export const medicineSchema = {
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'type', label: 'Type', type: 'text' },
    { name: 'stock', label: 'Stock', type: 'number' },
    { name: 'expiry_date', label: 'Expiry Date', type: 'date' }
  ]
}

export const pharmacySchema = {
  fields: [
    { name: 'patient_id', label: 'Patient ID', type: 'number', required: true },
    { name: 'medicine_id', label: 'Medicine ID', type: 'number', required: true },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'dispense_date', label: 'Dispense Date', type: 'date' }
  ]
}

export const ambulanceSchema = {
  fields: [
    { name: 'status', label: 'Status', type: 'select', options: ['Available', 'In Use', 'Maintenance'] },
    { name: 'driver', label: 'Driver', type: 'text' }
  ]
}

export const userSchema = {
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'created_at', label: 'Created At', type: 'datetime', disabled: true }
  ]
};
