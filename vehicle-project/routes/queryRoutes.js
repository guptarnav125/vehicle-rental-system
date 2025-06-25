const express = require('express');
const router = express.Router();
const db = require('../db/db');


router.get('/api/max-customer-id', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT MAX(CustomerID) AS maxId FROM VehicleBorrower");
    const maxId = rows[0]?.maxId ?? 0;
    res.json({ maxId });
  } catch (err) {
    console.error("❌ DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get('/api/max-lender-id', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT MAX(LenderID) AS maxId FROM VehicleLender");
    const maxId = rows[0]?.maxId ?? 0;
    res.json({ maxId });
  } catch (err) {
    console.error("❌ Lender ID fetch error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get('/api/max-vehicle-id', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT MAX(VehicleID) AS maxId FROM Vehicle");
    const maxId = rows[0]?.maxId ?? 0;
    res.json({ maxId });
  } catch (err) {
    console.error("Error fetching max Vehicle ID:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get('/api/max-rental-id', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT MAX(RentalID) AS maxId FROM RentalAgreement");
    const maxId = rows[0]?.maxId ?? 0;
    res.json({ maxId });
  } catch (err) {
    console.error("Error fetching max Rental ID:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get('/api/available-vehicles', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT VehicleID, Brand, Model, Type, SeatingCapacity, PricePerDay
      FROM Vehicle
      WHERE Status = 'Available'
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available vehicles:", err);
    res.status(500).json({ error: "Database error" });
  }
});


// Predefined Queries
router.post('/run-query', async (req, res) => {
  const sql = req.body.sql;

  try {
    const [rows, fields] = await db.query(sql)

    if (Array.isArray(rows)) {
      // SELECT-like query
      const headers = Object.keys(rows[0] || {});
      const rowsHtml = rows.map(row => `
        <tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>
      `).join('');
      const tableHeader = headers.map(h => `<th>${h}</th>`).join('');

      res.send(`
        <h2>Query Result</h2>
        <table border="1" cellpadding="10" cellspacing="0">
          <tr>${tableHeader}</tr>
          ${rowsHtml}
        </table>
        <br><a href="/forms/customQuery.html">Run another query</a>
      `);
    } else {
      // Non-SELECT query (UPDATE/INSERT/DELETE)
      res.send(`
        <h2>Query Executed Successfully</h2>
        <p>Rows affected: ${rows.affectedRows}</p>
        <br><a href="/forms/customQuery.html">Run another query</a>
      `);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`
      <h3>Error:</h3>
      <pre>${err.message}</pre>
      <a href="/forms/customQuery.html">Try Again</a>
    `);
  }
});

// Register new customer
router.post('/register-customer', async (req, res) => {
  const { CustomerID, Name, ContactInfo, Address, IDProof, DLNumber } = req.body;
  try {
    await db.query(
      `INSERT INTO VehicleBorrower (CustomerID, Name, ContactInfo, Address, IDProof, DLNumber)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [CustomerID, Name, ContactInfo, Address, IDProof, DLNumber]
    );
    const [rows] = await db.query(
      `SELECT * FROM VehicleBorrower`,
    );
    const table = `
      <h2>Customer Registered!</h2>
      <table border="1" cellpadding="8">
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Contact Info</th>
          <th>Address</th>
          <th>ID Proof</th>
          <th>DL Number</th>
        </tr>
        ${rows.map(row => `
          <tr>
            <td>${row.CustomerID}</td>
            <td>${row.Name}</td>
            <td>${row.ContactInfo}</td>
            <td>${row.Address}</td>
            <td>${row.IDProof}</td>
            <td>${row.DLNumber}</td>
          </tr>`).join('')}
      </table>
      <br><a href="/forms/dashboard.html">Back to Dashboard</a>
    `;
    res.send(table);
  } catch (err) {
    res.status(500).send('Error: ' + err.message + '<br><a href="/forms/register-Customer.html">Try Again</a>');
  }
});

// Register new lender
router.post('/register-lender', async (req, res) => {
  const { LenderID, Name, ContactInfo, Address, IDProof, CarRegistration } = req.body;
  try {
    await db.query(
      `INSERT INTO VehicleLender (LenderID, Name, ContactInfo, Address, IDProof, CarRegistration)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [LenderID, Name, ContactInfo, Address, IDProof, CarRegistration]
    );
    const [rows] = await db.query(
      `SELECT * FROM VehicleBorrower`,
    );
    const table = `
      <h2>Lender Registered!</h2>
      <table border="1" cellpadding="8">
        <tr>
          <th>Lender ID</th>
          <th>Name</th>
          <th>Contact Info</th>
          <th>Address</th>
          <th>ID Proof</th>
          <th>Registration No.</th>
        </tr>
        ${rows.map(row => `
          <tr>
            <td>${row.LenderID}</td>
            <td>${row.Name}</td>
            <td>${row.ContactInfo}</td>
            <td>${row.Address}</td>
            <td>${row.IDProof}</td>
            <td>${row.carRegistration}</td>
          </tr>`).join('')}
      </table>
      <br><a href="/forms/dashboard.html">Back to Dashboard</a>
    `;
    res.send(table);
  } catch (err) {
    res.status(500).send('Error: ' + err.message + '<br><a href="/forms/registerLender.html">Try Again</a>');
  }
});

// Add new vehicle
router.post('/add-vehicle', async (req, res) => {
  const { VehicleID, RegistrationNo, Brand, Model, Type, SeatingCapacity, PricePerDay, LenderID} = req.body;
  try {
    await db.query(
      `INSERT INTO Vehicle (VehicleID, RegistrationNo, Brand, Model, Type, SeatingCapacity, PricePerDay, Status, LenderID)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Available',?)`,
      [VehicleID, RegistrationNo, Brand, Model, Type, SeatingCapacity, PricePerDay, LenderID]
    );
    const [rows] = await db.query(
      `SELECT * FROM Vehicle`
    );
    const table = `
      <h2>Vehicle Added!</h2>
      <table border="1" cellpadding="8">
        <tr>
          <th>Vehicle ID</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Type</th>
          <th>Seating Capacity</th>
          <th>Price Per Day</th>
          <th>Status</th>
        </tr>
        ${rows.map(row => `
          <tr>
            <td>${row.VehicleID}</td>
            <td>${row.Brand}</td>
            <td>${row.Model}</td>
            <td>${row.Type}</td>
            <td>${row.SeatingCapacity}</td>
            <td>${row.PricePerDay}</td>
            <td>${row.Status}</td>
          </tr>`).join('')}
      </table>
      <br><a href="/forms/dashboard.html">Back to Dashboard</a>
    `;
    res.send(table);
  } catch (err) {
    res.status(500).send('Error: ' + err.message + '<br><a href="/forms/addVehicle.html">Try Again</a>');
  }
});

// Search vehicles
router.post('/search-vehicles', async (req, res) => {
  const { Type, SeatingCapacity } = req.body;
  try {
    const [rows] = await db.query(
      `SELECT * FROM Vehicle WHERE Status = 'Available' AND Type = ? AND SeatingCapacity >= ?`,
      [Type, SeatingCapacity]
    );
    const table = `
      <h2>Available Vehicles</h2>
      <table border="1" cellpadding="8">
        <tr>
          <th>Vehicle ID</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Type</th>
          <th>Seating Capacity</th>
          <th>Price Per Day</th>
          <th>Status</th>
        </tr>
        ${rows.map(row => `
          <tr>
            <td>${row.VehicleID}</td>
            <td>${row.Brand}</td>
            <td>${row.Model}</td>
            <td>${row.Type}</td>
            <td>${row.SeatingCapacity}</td>
            <td>${row.PricePerDay}</td>
            <td>${row.Status}</td>
          </tr>`).join('')}
      </table>
      <br><a href="/forms/dashboard.html">Back to Dashboard</a>
    `;
    res.send(table);
  } catch (err) {
    res.status(500).send('Error: ' + err.message + '<br><a href="/forms/dashboard.html">Try Again</a>');
  }
});

// Book vehicle
router.post('/book-vehicle', async (req, res) => {
  const { RentalID, VehicleID, CustomerID, StartDate, EndDate} = req.body;
  try {
    await db.query(
      `INSERT INTO RentalAgreement (RentalID, VehicleID, CustomerID, LenderID, StartDate, EndDate, TotalCost, Status)
       VALUES (?, ?, ?, (SELECT LenderID FROM Vehicle WHERE VehicleID = ?), ?, ?, DATEDIFF(?, ?) * (SELECT PricePerDay FROM Vehicle WHERE VehicleID = ?), 'Active')`,
      [RentalID, VehicleID, CustomerID, VehicleID, StartDate, EndDate, EndDate, StartDate, VehicleID]
    );
    await db.query(
      `UPDATE Vehicle SET Status = 'Rented' WHERE VehicleID = ?`,
      [VehicleID]
    );
    const [rows] = await db.query(
      `SELECT * FROM RentalAgreement`,
    );
    const table = `
      <h2>Vehicle Booked!</h2>
      <table border="1" cellpadding="8">
        <tr>
          <th>Rental ID</th>
          <th>Vehicle ID</th>
          <th>Customer ID</th>
          <th>Lender ID</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total Cost</th>
          <th>Status</th>
        </tr>
        ${rows.map(row => `
          <tr>
            <td>${row.RentalID}</td>
            <td>${row.VehicleID}</td>
            <td>${row.CustomerID}</td>
            <td>${row.LenderID}</td>
            <td>${row.StartDate}</td>
            <td>${row.EndDate}</td>
            <td>${row.TotalCost}</td>
            <td>${row.Status}</td>
          </tr>`).join('')}
      </table>
      <br><a href="/forms/dashboard.html">Back to Dashboard</a>
    `;
    res.send(table);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: Invalid Inputs <br><a href="/forms/dashboard.html">Try Again</a>');
  }
});

// Return vehicle
router.post('/return-vehicle', async (req, res) => {
  const { VehicleID } = req.body;
  try {
    await db.query(
      `UPDATE Vehicle SET Status = 'Available' WHERE VehicleID = ?`,
      [VehicleID]
    );
    const [rows] = await db.query(
      'UPDATE RentalAgreement SET Status = "Completed" WHERE VehicleID = ?',
      [VehicleID]
    );
    if (rows.affectedRows === 0) {
      res.send('Vehicle not found in the rental agreement! <br><a href="/forms/dashboard.html">Back to Dashboard</a>');
    } else {
      const [rows] = await db.query(
        `SELECT * FROM RentalAgreement`,
      );
      const table = `
        <h2>Vehicle Returned!</h2>
        <table border="1" cellpadding="8">
          <tr>
            <th>Rental ID</th>
            <th>Vehicle ID</th>
            <th>Customer ID</th>
            <th>Lender ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Cost</th>
            <th>Status</th>
          </tr>
          ${rows.map(row => `
            <tr>
              <td>${row.RentalID}</td>
              <td>${row.VehicleID}</td>
              <td>${row.CustomerID}</td>
              <td>${row.LenderID}</td>
              <td>${row.StartDate}</td>
              <td>${row.EndDate}</td>
              <td>${row.TotalCost}</td>
              <td>${row.Status}</td>
            </tr>`).join('')}
        </table>
        <br><a href="/forms/dashboard.html">Back to Dashboard</a>
      `;
      res.send(table);
    }
  } catch (err) {
    res.status(500).send('Error: ' + err.message + '<br><a href="/forms/dashboard.html">Try Again</a>');
  }
});

// View bookings
router.post('/view-bookings', async (req, res) => {
  const { CustomerID } = req.body;
  try {
    const [rows] = await db.query(
      `SELECT b.RentalID, v.Brand, v.Model, b.StartDate, b.EndDate, b.Status
       FROM rentalagreement b
       JOIN Vehicle v ON b.VehicleID = v.VehicleID
       WHERE b.CustomerID = ?`,
      [CustomerID]
    );
    if (rows.length === 0) return res.send('<p>No bookings found.</p><br><a href="/forms/dashboard.html">Back to Dashboard</a>');

    const table = `
      <h2>Your Bookings</h2>
      <table border="1" cellpadding="8">
        <tr>
          <th>Rental ID</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
        ${rows.map(row => `
          <tr>
            <td>${row.RentalID}</td>
            <td>${row.Brand}</td>
            <td>${row.Model}</td>
            <td>${row.StartDate}</td>
            <td>${row.EndDate}</td>
            <td>${row.Status}</td>
          </tr>`).join('')}
      </table>
      <br><a href="/forms/dashboard.html">Back to Dashboard</a>
    `;
    res.send(table);
  } catch (err) {
    res.status(500).send('Error: ' + err.message + '<br><a href="/forms/dashboard.html">Try Again</a>');
  }
});

module.exports = router;