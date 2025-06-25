-- SQL script to create tables for the Vehicle Rental System

CREATE TABLE Admin (
    AdminID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

CREATE TABLE VehicleBorrower (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    ContactInfo VARCHAR(255) NOT NULL,
    Address TEXT NOT NULL,
    IDProof VARCHAR(50) NOT NULL,
    DLNumber VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE VehicleLender (
    LenderID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    ContactInfo VARCHAR(255) NOT NULL,
    Address TEXT NOT NULL,
    IDProof VARCHAR(50) NOT NULL,
    CarRegistration VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Vehicle (
    VehicleID INT PRIMARY KEY,
    RegistrationNo VARCHAR(50) UNIQUE NOT NULL,
    Brand VARCHAR(50) NOT NULL,
    Model VARCHAR(50) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    SeatingCapacity INT CHECK (SeatingCapacity > 0),
    PricePerDay DECIMAL(10,2) CHECK (PricePerDay > 0),
    Status VARCHAR(20) CHECK (Status IN ('Available', 'Rented', 'Under Maintenance')),
    LenderID INT,
    FOREIGN KEY (LenderID) REFERENCES VehicleLender(LenderID)
);

CREATE TABLE RentalAgreement (
    RentalID INT PRIMARY KEY,
    VehicleID INT,
    CustomerID INT,
    LenderID INT,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    TotalCost DECIMAL(10,2) CHECK (TotalCost >= 0),
    Status VARCHAR(20) CHECK (Status IN ('Active', 'Completed', 'Cancelled')),
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID),
    FOREIGN KEY (CustomerID) REFERENCES VehicleBorrower(CustomerID),
    FOREIGN KEY (LenderID) REFERENCES VehicleLender(LenderID)
);

CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY,
    RentalID INT,
    PaymentMethod VARCHAR(50) CHECK (PaymentMethod IN ('Credit Card', 'Debit Card', 'Cash', 'UPI')),
    Amount DECIMAL(10,2) CHECK (Amount >= 0),
    PaymentDate DATE NOT NULL,
    FOREIGN KEY (RentalID) REFERENCES RentalAgreement(RentalID)
);
