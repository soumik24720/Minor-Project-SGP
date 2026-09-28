const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the www directory
app.use(express.static(path.join(__dirname, 'www')));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb+srv://dassoumik861:Das%401234567@cluster0.wkzhtv5.mongodb.net/sgp_college?retryWrites=true&w=majority');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // Don't exit the process, just log the error
    console.log('Continuing without database connection...');
  }
};

// Connect to the database
connectDB();

// Import models
const Student = require('./sgp-backend/src/models/Student');
const Mark = require('./sgp-backend/src/models/Mark');
const Contact = require('./sgp-backend/src/models/Contact');

// API Routes

// Get student marks
app.get('/api/marks/marksheet', async (req, res) => {
  try {
    const { name, rollNumber, department } = req.query;
    
    // Find the student
    const student = await Student.findOne({
      name: name,
      rollNumber: rollNumber,
      department: department
    });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Find the marks for this student
    const marks = await Mark.findOne({ student: student._id });
    
    if (!marks) {
      return res.status(404).json({ message: 'Marks not found for this student' });
    }
    
    // Return the marksheet data
    res.json({
      student: {
        name: student.name,
        rollNumber: student.rollNumber,
        department: student.department
      },
      semester: marks.semester,
      subjects: marks.subjects,
      totalMarks: marks.totalMarks,
      percentage: marks.percentage,
      result: marks.result
    });
  } catch (error) {
    console.error('Error fetching marksheet:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit student marks
app.post('/api/marks/submit', async (req, res) => {
  try {
    const { student, semester, subjects, totalMarks, percentage, result } = req.body;
    
    // Find or create the student
    let studentDoc = await Student.findOne({
      name: student.name,
      rollNumber: student.rollNumber,
      department: student.department
    });
    
    if (!studentDoc) {
      studentDoc = new Student({
        name: student.name,
        rollNumber: student.rollNumber,
        department: student.department
      });
      await studentDoc.save();
    }
    
    // Find or create the marks
    let marks = await Mark.findOne({ student: studentDoc._id });
    
    if (marks) {
      // Update existing marks
      marks.semester = semester;
      marks.subjects = subjects;
      marks.totalMarks = totalMarks;
      marks.percentage = percentage;
      marks.result = result;
      await marks.save();
    } else {
      // Create new marks
      marks = new Mark({
        student: studentDoc._id,
        semester,
        subjects,
        totalMarks,
        percentage,
        result
      });
      await marks.save();
    }
    
    res.status(201).json({ message: 'Marks submitted successfully', studentId: studentDoc._id });
  } catch (error) {
    console.error('Error submitting marks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit contact form
app.post('/api/contact/submit', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });
    
    await contact.save();
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully', 
      contactId: contact._id,
      note: 'Your message will be forwarded to dassoumik861@gmail.com'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Default route - serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
