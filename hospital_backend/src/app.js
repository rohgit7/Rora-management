const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/db');
const { formatDate } = require('./utils/helpers');

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const billingRoutes = require('./routes/billingRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const roomRoutes = require('./routes/roomRoutes');
const ambulanceRoutes = require('./routes/ambulanceRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const authenticateToken = require('./middleware/authMiddleware');



app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/ambulances', ambulanceRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);

app.get('/', (req, res) => {
  res.send('Hospital Management API is running');
});

// Aggregated summary for dashboard (protected)
app.use('/api/summary', authenticateToken, async (req, res) => {
  try {
    // --- COUNTS ---
    const [[patients]] = await pool.query('SELECT COUNT(*) AS c FROM Patients');
    const [[doctors]] = await pool.query('SELECT COUNT(*) AS c FROM Doctors');
    const [[scheduled]] = await pool.query("SELECT COUNT(*) AS c FROM Appointments WHERE status = 'Scheduled'");
    const [[roomsAvail]] = await pool.query("SELECT COUNT(*) AS c FROM Rooms WHERE status = 'Available'");
    const [[pendingBills]] = await pool.query("SELECT COUNT(*) AS c FROM Billing WHERE status = 'Pending'");
    const [[lowStock]] = await pool.query("SELECT COUNT(*) AS c FROM Medicine WHERE stock < 10");
    const [[ambulAvail]] = await pool.query("SELECT COUNT(*) AS c FROM Ambulance WHERE status = 'Available'");

    // --- UPCOMING APPOINTMENTS ---
    const [upcoming] = await pool.query(
      `SELECT a.appointment_id, a.appointment_date, a.status,
              p.name AS patient_name,
              d.name AS doctor_name
       FROM Appointments a
       JOIN Patients p ON a.patient_id = p.patient_id
       JOIN Doctors d ON a.doctor_id = d.doctor_id
       WHERE a.appointment_date >= NOW()
       ORDER BY a.appointment_date ASC
       LIMIT 5`
    );

    // --- RECENT BILLING ---
    const [recentBilling] = await pool.query(
      `SELECT b.bill_id, b.amount, b.status,
              p.name AS patient_name,
              a.appointment_date
       FROM Billing b
       JOIN Appointments a ON b.appointment_id = a.appointment_id
       JOIN Patients p ON a.patient_id = p.patient_id
       ORDER BY b.bill_id DESC
       LIMIT 5`
    );

    // --- RESPONSE ---
    res.json({
      stats: {
        patients: patients.c,
        doctors: doctors.c,
        scheduledAppointments: scheduled.c,
        availableRooms: roomsAvail.c,
        pendingBills: pendingBills.c,
        lowStockMedicines: lowStock.c,
        ambulancesAvailable: ambulAvail.c
      },
      upcoming: upcoming.map((row) => ({
        ...row,
        appointment_date: row.appointment_date
          ? formatDate(row.appointment_date)
          : null,
      })),
      billing: recentBilling.map((row) => ({
        ...row,
        date: row.appointment_date
          ? formatDate(row.appointment_date)
          : null,
      }))
    });

  } catch (err) {
    console.error('Summary error:', err);
    res.status(500).json({ message: 'Failed to load summary' });
  }
});


app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
