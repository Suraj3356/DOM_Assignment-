// Function to add a new student record
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contactNo').value;

    // Validate input fields
    if (!name.match(/^[a-zA-Z\s]+$/)) {
        alert('Name must contain only letters.');
        return;
    }
    if (!id || !contact.match(/^[0-9]{10}$/)) {
        alert('ID must be valid and Contact No must be a 10-digit number.');
        return;
    }

    // Create student object
    const student = { name, id, email, contact };

    // Get existing students from local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // Clear form fields
    this.reset();

    // Update display section
    displayStudents();
});

// Function to display students
function displayStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach((student, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>ID:</strong> ${student.id}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Contact:</strong> ${student.contact}</p>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
            <hr>
        `;
        studentList.appendChild(div);
    });
}

// Function to edit a student record
function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    // Remove the student from storage
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to delete a student record
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Display students on page load
document.addEventListener('DOMContentLoaded', displayStudents);


// Function to add a new student record
// Prevents default form submission and validates input before saving to local storage
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form behavior

    // Get input values
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contactNo').value;

    // Validate name (only letters and spaces)
    if (!name.match(/^[a-zA-Z\s]+$/)) {
        alert('Name must contain only letters.');
        return;
    }
    // Validate student ID and contact number
    if (!id || !contact.match(/^[0-9]{10}$/)) {
        alert('ID must be valid and Contact No must be a 10-digit number.');
        return;
    }

    // Create student object and store in local storage
    const student = { name, id, email, contact };
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // Clear form fields after submission
    this.reset();

    // Update the display section to show the new list of students
    displayStudents();
});

