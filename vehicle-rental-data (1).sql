-- Populating Admin Table
INSERT INTO Admin (AdminID, Name) VALUES
(1, 'Arnav Gupta'),
(2, 'Adamya Rangi'),
(3, 'Namit Bajaj'),
(4, 'Sahaj Gupta');

-- Populating VehicleBorrower Table (Customers)
INSERT INTO VehicleBorrower (CustomerID, Name, ContactInfo, Address, IDProof, DLNumber) VALUES
(1, 'John Doe', 'john.doe@email.com', '123 Maple Street, NY', 'Passport', 'DL12345678'),
(2, 'Emma Watson', 'emma.watson@email.com', '456 Oak Avenue, CA', 'Aadhar', 'DL87654321'),
(3, 'Michael Brown', 'michael.brown@email.com', '789 Pine Road, TX', 'Driving License', 'DL23456789'),
(4, 'Sophia Davis', 'sophia.davis@email.com', '159 Cedar Lane, FL', 'PAN Card', 'DL34567890'),
(5, 'James Wilson', 'james.wilson@email.com', '753 Birch Blvd, WA', 'Voter ID', 'DL45678901'),
(6, 'Olivia Taylor', 'olivia.taylor@email.com', '369 Spruce Road, NY', 'Passport', 'DL56789012'),
(7, 'Daniel Harris', 'daniel.harris@email.com', '258 Ash Drive, TX', 'Aadhar', 'DL67890123'),
(8, 'Emily Moore', 'emily.moore@email.com', '147 Redwood St, CA', 'PAN Card', 'DL78901234'),
(9, 'Matthew White', 'matthew.white@email.com', '951 Fir Lane, FL', 'Driving License', 'DL89012345'),
(10, 'Charlotte Lee', 'charlotte.lee@email.com', '753 Cypress Ave, WA', 'Voter ID', 'DL90123456'),
(11, 'Benjamin Clark', 'ben.clark@email.com', '369 Hemlock St, NY', 'Passport', 'DL01234567'),
(12, 'Ava Martinez', 'ava.martinez@email.com', '258 Alder Road, TX', 'Aadhar', 'DL11234567'),
(13, 'Ethan Lewis', 'ethan.lewis@email.com', '147 Beech Blvd, CA', 'PAN Card', 'DL21234567'),
(14, 'Mia Walker', 'mia.walker@email.com', '951 Spruce St, FL', 'Driving License', 'DL31234567'),
(15, 'Noah Young', 'noah.young@email.com', '753 Cedar Ave, WA', 'Voter ID', 'DL41234567');

-- Populating VehicleLender Table
INSERT INTO VehicleLender (LenderID, Name, ContactInfo, Address, IDProof, CarRegistration) VALUES
(1, 'David Miller', 'david.miller@email.com', '321 Elm Street, FL', 'PAN Card', 'REG1234XYZ'),
(2, 'Sophia Wilson', 'sophia.wilson@email.com', '654 Birch Lane, WA', 'Passport', 'REG5678ABC'),
(3, 'Lucas Robinson', 'lucas.robinson@email.com', '789 Walnut St, NY', 'Aadhar', 'REG9101DEF'),
(4, 'Ella Scott', 'ella.scott@email.com', '357 Hickory Ave, CA', 'Voter ID', 'REG1213GHI'),
(5, 'William Adams', 'william.adams@email.com', '852 Cedar Lane, TX', 'Driving License', 'REG1415JKL');

-- Populating Vehicle Table
INSERT INTO Vehicle (VehicleID, RegistrationNo, Brand, Model, Type, SeatingCapacity, PricePerDay, Status, LenderID) VALUES
(1, 'NY123XYZ', 'Toyota', 'Corolla', 'Sedan', 5, 50.00, 'Available', 1),
(2, 'CA987ABC', 'Honda', 'Civic', 'Sedan', 5, 55.00, 'Rented', 2),
(3, 'TX456DEF', 'Ford', 'Mustang', 'Coupe', 4, 120.00, 'Available', 1),
(4, 'WA321GHI', 'Tesla', 'Model 3', 'Electric', 5, 90.00, 'Under Maintenance', 2),
(5, 'FL654JKL', 'BMW', 'X5', 'SUV', 7, 150.00, 'Available', 3),
(6, 'NY852MNO', 'Mercedes', 'C-Class', 'Sedan', 5, 130.00, 'Rented', 4),
(7, 'TX951PQR', 'Chevrolet', 'Camaro', 'Coupe', 4, 110.00, 'Available', 5),
(8, 'WA753STU', 'Audi', 'A4', 'Sedan', 5, 140.00, 'Available', 1),
(9, 'FL159VWX', 'Jeep', 'Wrangler', 'SUV', 5, 95.00, 'Rented', 2),
(10, 'CA369YZA', 'Nissan', 'Altima', 'Sedan', 5, 75.00, 'Under Maintenance', 3),
(11, 'TX258BCD', 'Hyundai', 'Tucson', 'SUV', 5, 85.00, 'Available', 4),
(12, 'NY147EFG', 'Subaru', 'Outback', 'Wagon', 5, 80.00, 'Rented', 5),
(13, 'WA951HIJ', 'Mazda', 'CX-5', 'SUV', 5, 88.00, 'Available', 1),
(14, 'FL753KLM', 'Kia', 'Sportage', 'SUV', 5, 92.00, 'Available', 2),
(15, 'CA357NOP', 'Volkswagen', 'Passat', 'Sedan', 5, 98.00, 'Available', 3);

-- Populating RentalAgreement Table
INSERT INTO RentalAgreement (RentalID, VehicleID, CustomerID, LenderID, StartDate, EndDate, TotalCost, Status) VALUES
(1, 2, 1, 2, '2024-02-01', '2024-02-07', 385.00, 'Completed'),
(2, 3, 2, 1, '2024-02-05', '2024-02-10', 600.00, 'Active'),
(3, 5, 3, 3, '2024-01-10', '2024-01-15', 750.00, 'Completed'),
(4, 9, 4, 2, '2024-02-11', '2024-02-20', 855.00, 'Active'),
(5, 12, 5, 5, '2024-02-01', '2024-02-06', 400.00, 'Completed');

-- Populating Payment Table
INSERT INTO Payment (PaymentID, RentalID, PaymentMethod, Amount, PaymentDate) VALUES
(1, 1, 'Credit Card', 385.00, '2024-02-07'),
(2, 2, 'UPI', 600.00, '2024-02-10'),
(3, 3, 'Debit Card', 750.00, '2024-01-15'),
(4, 4, 'Cash', 855.00, '2024-02-20'),
(5, 5, 'Credit Card', 400.00, '2024-02-06');
