
function handleFormSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const appointment = {
        username,
        email,
        phone
    };
        console.log(appointment);
  axios.post('http://localhost:3000/add-user', appointment)
        .then(response => {
            console.log('Appointment added successfully:', response.data);

            // Display the added appointment on the screen
            displayAppointment(response.data);
        })
        .catch(error => {
            console.error('Error adding appointment:', error);
        });

    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

}

window.addEventListener("DOMContentLoaded", () => {
axios.get('http://localhost:3000/get-user')
.then(response => {
    // let data = req.body.newUserList
  // Display the added appointment on the screen
  for (let i = 0; i < response.data.allUsers.length; i++) {
    displayAppointment(response.data.allUsers[i]);
    
  }
})
.catch(error => {
  console.error('Error fetching appointments:', error);
});
});

function displayAppointment(appointment) {

    const appointmentsList = document.getElementById('appointmentsList');
    const listItem = document.createElement('li');
    // listItem.id = userId;
    listItem.textContent = `Username: ${appointment.name}, Email: ${appointment.email}, Phone: ${appointment.phonenumber}`;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        // Call function to handle deletion
        deleteAppointment(appointment, listItem);
    };
    listItem.appendChild(deleteButton);

    // Add edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        // Call function to handle editing
        editAppointment(appointment);
        // Remove the current list item from the screen
        appointmentsList.removeChild(listItem);
    };
    listItem.appendChild(editButton);

    appointmentsList.appendChild(listItem);
}

function deleteAppointment(appointment, listItem) {
    axios.delete(`http://localhost:3000/delete-user/${appointment.id}`)
        .then(response => {
            removeUserFromScreen(appointment.id, listItem);
            console.log('Appointment deleted successfully:', response.data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error deleting appointment:', error);
        });
}

function removeUserFromScreen(userId, listItem) {
    const parentNode = document.getElementById('appointmentsList');
    const childNodeToDelete = listItem;

    if (childNodeToDelete !== null) {
        parentNode.removeChild(childNodeToDelete);
        // Reload the page after successfully removing the item from the UI
        window.location.reload();
    }
}

function editAppointment(appointment) {
    // Populate the form with existing value
   
    document.getElementById('username').value = appointment.name;
    document.getElementById('email').value = appointment.email;
    document.getElementById('phone').value = appointment.phonenumber;

    // Implement logic to handle editing
    // You can show a modal with the current appointment details and allow the user to make changes
    // After editing, send a PUT request to update the appointment on the server
    // Implement as needed
}