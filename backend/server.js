const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors')

const app = express();
app.use(express.json());
const port = 3000;

const upload = multer({ storage: multer.memoryStorage() });
app.use(express.urlencoded({ extended: true }));

app.use(cors())
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'iiitn',
  database: 'college_management',
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

app.get('/departments', (req, res) => {
  db.query('SELECT * FROM Department', (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
})
  .get('/Courses', (req, res) => {
    db.query('SELECT * FROM Course', (err, results) => {
      if (err) {
        console.error('Error fetching courses:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  })
  .get('/slider', (req, res) => {
    db.query('SELECT imageLink FROM Slider', (err, results) => {
      if (err) {
        console.error('Error fetching sliders:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  })
  .get('/image-gallary', (req, res) => {
    db.query('SELECT link FROM ImageGallary', (err, results) => {
      if (err) {
        console.error('Error fetching gallary:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/book', (req, res) => {
    db.query('SELECT * FROM book', (err, results) => {
      if (err) {
        console.error('Error fetching book:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/library-members', (req, res) => {
    db.query('SELECT * FROM members', (err, results) => {
      if (err) {
        console.error('Error fetching members:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/certifications', (req, res) => {
    db.query('SELECT * FROM certification', (err, results) => {
      if (err) {
        console.error('Error fetching certification:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/certificate-enrolled', (req, res) => {
    db.query('SELECT * FROM certificate_enrolled', (err, results) => {
      if (err) {
        console.error('Error fetching certificare enrolled:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/grievences', (req, res) => {
    db.query('SELECT * FROM Grievences', (err, results) => {
      if (err) {
        console.error('Error fetching grievences:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/feedback', (req, res) => {
    db.query('SELECT * FROM Feedback', (err, results) => {
      if (err) {
        console.error('Error fetching feedbacks:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/inquiry', (req, res) => {
    db.query('SELECT * FROM Inquiry', (err, results) => {
      if (err) {
        console.error('Error fetching inquiry:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/faculty', (req, res) => {
    db.query('SELECT * FROM Faculty', (err, results) => {
      if (err) {
        console.error('Error fetching faculty:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/admin', (req, res) => {
    db.query('SELECT * FROM Admin', (err, results) => {
      if (err) {
        console.error('Error fetching admin:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/notice', (req, res) => {
    db.query('SELECT * FROM Notice', (err, results) => {
      if (err) {
        console.error('Error fetching notices:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/news', (req, res) => {
    db.query('SELECT * FROM News', (err, results) => {
      if (err) {
        console.error('Error fetching news:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/students', (req, res) => {
    db.query('SELECT * FROM Student', (err, results) => {
      if (err) {
        console.error('Error fetching Student:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/enrolled_course/:slug', (req, res) => {
    const { slug } = req.params;

    const query = "SELECT * FROM enrolled_course where s_id = ?"
    db.query(query, [slug], (err, results) => {
      if (err) {
        console.error('Error fetching Student:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
  .get('/admissions', (req, res) => {

    const query = "SELECT * FROM Admission"
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching Admissions:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  })
app.patch('/admission/approve/:app_id', (req, res) => {
  const { app_id } = req.params;

  const sql = `UPDATE Admission SET isApproved = true WHERE App_id = ?`;
  db.query(sql, [app_id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error updating approval status', error });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }
    return res.status(200).json({ message: 'Approval status toggled successfully' });
  });
})
  .post('/login/student', (req, res) => {
    const { s_id, password } = req.body;

    if (!s_id || !password) {
      return res.status(400).json({ success: false, message: 'Student ID and password are required' });
    }
    const query = 'SELECT password FROM Student WHERE s_id = ?';

    db.query(query, [s_id], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database query error' });
      }

      if (results.length > 0 && results[0].password === password) {
        return res.json({ success: true, valid: true });
      } else {
        return res.json({ success: false, valid: false });
      }
    });
  })
  .post('/login/admin', (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ success: false, message: 'Admin ID and password are required' });
    }

    const query = 'SELECT password FROM Admin WHERE id = ?';

    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database query error' });
      }

      if (results.length > 0 && results[0].password === password) {
        return res.json({ success: true, valid: true });
      } else {
        return res.json({ success: false, valid: false });
      }
    });
  })
  .post('/login/faculty', (req, res) => {
    const { F_id, password } = req.body;
    if (!F_id || !password) {
      return res.status(400).json({ success: false, message: 'Faculty ID and password are required' });
    }

    const query = 'SELECT password FROM Faculty WHERE F_id = ?';

    db.query(query, [F_id], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database query error' });
      }

      if (results.length > 0 && results[0].password === password) {
        return res.json({ success: true, valid: true });
      } else {
        return res.json({ success: false, valid: false });
      }
    });
  })
  .post('/student/add', (req, res) => {
    const { id, fname, lname, email, phone_no, dep_id, password } = req.body;

    const query = `
      INSERT INTO student (s_id, fname, lname, email, phone_no, dep_id, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [id, fname, lname, email, phone_no, dep_id, password];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting student data:', err);
        return res.status(500).json({ sucess: false });
      }
      res.status(201).json({ sucess: true });
    });
  })
  .post('/faculty/add', (req, res) => {
    const { id, fname, lname, email, phone_no, dep_id, password, isActive } = req.body;
    const query = `
      INSERT INTO Faculty (f_id, fname, lname, email, phone_no, dep_id, password, isActive) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [id, fname, lname, email, phone_no, dep_id, password, isActive];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting faculty data:', err);
        return res.status(500).json({ sucess: false });
      }
      res.status(201).json({ sucess: true });
    });
  })
  .post('/book/add', (req, res) => {
    const { id, title, author, qty } = req.body;
    const sql = 'INSERT INTO Book (B_id, B_name, B_author, total_quantity) VALUES (?, ?, ?, ?)';

    db.query(sql, [id, title, author, qty], (err, results) => {
      if (err) {
        console.error('Error inserting book:', err);
        return res.status(500).json({ message: 'Error adding book', error: err.message });
      }

      res.status(201).json({ message: 'Book added successfully!', bookId: results.insertId });
    });
  })
  .post('/admission-form/submit', upload.single('Document'), (req, res) => {
    const { App_id, branch, fname, lname, email, mobile, address, date, isApproved } = req.body;
    const document = req.file ? req.file.buffer : null;

    const sql = `
        INSERT INTO Admission (App_id, branch, fname, lname, email, mobile, address, date, isApproved, Document) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [App_id, branch, fname, lname, email, mobile, address, date, isApproved === 'true', document];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err.message);
        return res.status(500).json({ error: 'Failed to submit admission form' });
      }
      res.status(200).json({ message: 'Admission form submitted successfully!' });
    });
  })
  .post('/certificate-enrolled/enroll', (req, res) => {
    const { cer_id, s_id, cer_code, isCompleted, cer_name } = req.body;

    if (!cer_id || !s_id || !cer_code || isCompleted === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `
      INSERT INTO certificate_enrolled (cer_id, s_id, cer_code, isCompleted,cer_name)
      VALUES (?, ?, ?, ?,?)
    `;

    db.query(query, [cer_id, s_id, cer_code, isCompleted, cer_name], (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ message: 'Failed to enroll in certification' });
      }
      res.status(201).json({ message: 'Enrollment successful', enrollment: results });
    });
  })
  .post('/form/:slug/add', (req, res) => {
    const { id, s_id, subject, details, datePosted, dateClosed } = req.body;
    const { slug } = req.params

    const sql = `INSERT INTO ${slug} (id, s_id, subject, details, datePosted, dateClosed) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [id, s_id, subject, details, datePosted, dateClosed];

    db.execute(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting form data', err);
        return res.status(500).json({ error: 'Failed to insert data' });
      }
      res.status(200).json({ message: 'Data inserted successfully' });
    })
  })
  .post("/contact-us/add", (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO contact_us (name, phone, email) VALUES (?, ?, ?)";
    db.execute(query, [name, phone, email], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "Your message has been submitted successfully!" });
    });
  })
  .delete('/student/delete/:id', (req, res) => {
    const s_id = req.params.id;

    const sql = 'DELETE FROM fees WHERE s_id = ?;DELETE FROM members WHERE s_id = ?;DELETE FROM Grievences WHERE s_id = ?;DELETE FROM Feedback WHERE s_id = ?;DELETE FROM Inquiry WHERE s_id = ?;DELETE FROM certificate_enrolled WHERE s_id = ?;DELETE FROM enrolled_course WHERE s_id = ?; DELETE from Student where s_id = ?';
    db.query(sql, [s_id, s_id, s_id, s_id, s_id, s_id, s_id, s_id], (err, results) => {
      if (err) {
        console.error('Error deleting student:', err);
        return res.status(500).json({ message: 'error deleting student', error: err.message });
      }
      res.status(204).send();
    })
  })
  .delete('/faculty/delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE from Faculty where F_id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error deleting Faculty:', err);
        return res.status(500).json({ message: 'error deleting Faculty', error: err.message });
      }
      res.status(204).send();
    })
  })
  .put('/:slug1/update/:slug2', (req, res) => {
    const { slug1, slug2 } = req.params;
    const { field, value } = req.body;

    let id;
    if (slug1.toLowerCase() === "student") {
      id = "s_id";
    } else if (slug1.toLowerCase() === "faculty") {
      id = "f_id";
    } else {
      return res.status(400).json({ message: 'Invalid slug1 value' });
    }

    const sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    db.query(sql, [slug1, field, value, id, slug2], (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ message: 'Error updating data', error: err.message });
      }
      res.status(204).send();
    });
  })
  .put('/:table/mark-closed/:id', (req, res) => {
    let { table, id } = req.params;
    const { formattedDate } = req.body
    table = table.toLowerCase();
    if (table != "grievences" && table != "feedback" && table != "inquiry") {
      return res.status(400).json({ message: 'Action NOT permitted' });
    }

    const sql = `UPDATE ${table} SET dateClosed = ? WHERE id = ?`;
    db.query(sql, [formattedDate, id], (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ message: 'Error updating data', error: err.message });
      }
      res.status(200).json({ message: "success" });
    });
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});