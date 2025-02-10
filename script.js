//==========JavaScript========
let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
let currentPage = 1;
const rowsPerPage = 3;

function formatTime(seconds) {
    return seconds < 10 ? "00:0" + seconds : "00:" + seconds;
}
let timerInterval;
function startTimer() {
    let timeLeft = 30; // Set timer duration in seconds

    // Clear any previous timer (just in case)
    clearInterval(timerInterval);

    // Reset the timer container's HTML so it contains a <span>
    $("#timer").html('<span>' + timeLeft + '</span> seconds');

    // Start the countdown interval
    timerInterval = setInterval(function () {
        timeLeft--;
        $("#timer span").text(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Disable the form when time is up.
            $("#myForm :input").prop("disabled", true);
            $("#timer").text("Time is up! Form is disabled.");
        }
    }, 1000);
}
startTimer();
function validateForm() {
    let isValid = true;
    let firstName = $("#firstName").val().trim();
    let middleName = $("#middleName").val().trim();
    let lastName = $("#lastName").val().trim();
    let address = $("#address").val().trim();
    let email = $("#email").val().trim();
    let phone = $("#phone").val().trim();
    let gender = $("input[name='gender']:checked").val();
    let country = $("#country").val();
    let state = $("#state").val();
    let city = $("#city").val();
    let termsAccepted = $("#terms").is(":checked");
    
    $(".error-msg").remove();

    if (firstName === "") {
        $("#firstName").after('<span class="error-msg">⚠ First Name is required.</span>');
        isValid = false;
    }

    if (middleName === "") {
        $("#middleName").after('<span class="error-msg">⚠ Middle Name is required.</span>');
        isValid = false;
    }

    if (address === "") {
        $("#address").after('<span class="error-msg">⚠ Address is required.</span>');
        isValid = false;
    }

    if (lastName === "") {
        $("#lastName").after('<span class="error-msg">⚠ Last Name is required.</span>');
        isValid = false;
    }

    if (email === "") {
        $("#email").after('<span class="error-msg">⚠ Email is required.</span>');
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        $("#email").after('<span class="error-msg">⚠ Invalid email format.</span>');
        isValid = false;
    }

    if (phone === "") {
        $("#phone").after('<span class="error-msg">⚠ Phone number is required.</span>');
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        $("#phone").after('<span class="error-msg">⚠ Phone number must be exactly 10 digits.</span>');
        isValid = false;
    }

    if (!gender) {
        $("#gender").after('<div class="error-msg">⚠ Please select your gender.</div>');
        isValid = false;
    }

    if (country === "") {
        $("#country").after('<span class="error-msg">⚠ Please select a country.</span>');
        isValid = false;
    }

    if (state === "") {
        $("#state").after('<span class="error-msg">⚠ Please select a state.</span>');
        isValid = false;
    }

    if (city === "") {
        $("#city").after('<span class="error-msg">⚠ Please select a city.</span>');
        isValid = false;
    }

   if (!termsAccepted) {
        $(".terms-check").after('<p class="error-msg">⚠ You must accept the terms and conditions.</p>');
        isValid = false;
    }

    return isValid;
}
function myTimer() {
  const d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
setInterval(myTimer);
function displayTable(formDataArray, currentPage) {
    if (!formDataArray || formDataArray.length === 0) {
        $("#formContainer").html("<p>No data available.</p>");
        return; 
    }

    const recordsPerPage = 3;  
    const totalPages = Math.ceil(formDataArray.length / recordsPerPage); 

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, formDataArray.length);

    // Use your original table markup (with border="1")
    let tableHTML = ` 
        <br/><h3>Submitted Information</h3>
        <table border="1">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="tableBody">`;

    for (let i = startIndex; i < endIndex; i++) {
        const formData = formDataArray[i];
        if (formData) {
            tableHTML += `
                <tr data-index="${i}">
                    <td>${formData.firstName || 'N/A'}</td>
                    <td>${formData.middleName || 'N/A'}</td>
                    <td>${formData.lastName || 'N/A'}</td>
                    <td>${formData.address || 'N/A'}</td>
                    <td>${formData.email || 'N/A'}</td>
                    <td>${formData.phone || 'N/A'}</td>
                    <td>${formData.gender || 'N/A'}</td>
                    <td>${formData.country || 'N/A'}</td>
                    <td>${formData.state || 'N/A'}</td>
                    <td>${formData.city || 'N/A'}</td>
                    <td>
                        <i class="editBtn fa-solid fa-pen editIcon" style="cursor:pointer; margin-right:10px;"></i>
                        <i class="deleteBtn fa-solid fa-trash deleteIcon" style="cursor:pointer;"></i>
                    </td>
                </tr>`;
        }
    }

    tableHTML += `</tbody></table>`;

    // Pagination controls (as in your original code)
    tableHTML += `
        <div class="pagination">
            <button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        </div>`;

    $("#formContainer").html(tableHTML);

    // Bind pagination events.
    $("#prevPage").click(function () {
        if (currentPage > 1) {
            displayTable(formDataArray, currentPage - 1);
        }
    });
    $("#nextPage").click(function () {
        if (currentPage < totalPages) {
            displayTable(formDataArray, currentPage + 1);
        }
    });

    // Use a global variable for editing; initialize if not set.
    window.editIndex = (window.editIndex === undefined) ? -1 : window.editIndex;


    // EDIT functionality:
    $(".editBtn").click(function () {
        // Clear any existing timer.
        clearInterval(timerInterval);
    
        // Re-enable the form if it was disabled.
        $("#myForm :input").prop("disabled", false);
    
        // Reset the timer display (ensure the <span> exists).
        $("#timer").html('<span>30</span> seconds');
    
        // Restart the timer.
        startTimer();
    
        // Then load the data for editing...
        let rowIndex = $(this).closest("tr").data("index");
        window.editIndex = rowIndex;
        let contactsArray = JSON.parse(localStorage.getItem("formData")) || [];
        let record = contactsArray[rowIndex];
        if (record) {
            $("#firstName").val(record.firstName);
            $("#middleName").val(record.middleName);
            $("#lastName").val(record.lastName);
            $("#address").val(record.address);
            $("#email").val(record.email);
            $("#phone").val(record.phone);
            $("input[name='gender'][value='" + record.gender + "']").prop("checked", true);
            $("#country").val(record.country).trigger("change");
            $("#state").val(record.state).trigger("change");
            $("#city").val(record.city);
        }
    });
    
    
    
    
    

    // DELETE functionality:
    $(".deleteBtn").click(function () {
        let rowIndex = $(this).closest("tr").data("index");
        let confirmation = window.confirm("Are you sure you want to delete this record?");
        if (confirmation) {
            if (formDataArray[rowIndex]) {
                formDataArray.splice(rowIndex, 1); 
                showdeleteMessage("Data deleted successfully!");
                setTimeout(function () {
                    $(".delete-message").fadeOut();
                }, 2000);
                localStorage.setItem("formData", JSON.stringify(formDataArray)); 
                displayTable(formDataArray, currentPage); 
            }
        }
        function showdeleteMessage(message) {
            let successMessage = $('<div class="delete-message" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background-color: red; color: white; padding: 10px; border-radius: 5px; font-weight: bold;">' + message + '</div>');
            $("body").prepend(successMessage);
        }
    });

    // Clear button event.
    $("#clearBtn").click(function () {
        $("#myForm")[0].reset(); 
        $(".error-msg").remove();  
        $("input, select").removeClass("error");  
        $("#firstName, #middleName, #lastName, #address, #email, #phone").val('');
        $("input[name='gender']").prop('checked', false);  
        $("#country").val('').trigger('change');  
        $("#state").val('').prop('disabled', true);
        $("#city").val('').prop('disabled', true);
    });
}
function updatePagination(totalItems) {
    let totalPages = Math.ceil(totalItems / rowsPerPage);
    let paginationDiv = $("#pagination");
    paginationDiv.empty();

    for (let i = 1; i <= totalPages; i++) {
        let button = `<button class="pageBtn" data-page="${i}">${i}</button>`;
        paginationDiv.append(button);
    }

    $(".pageBtn").click(function () {
        let pageNumber = $(this).data("page");
        changePage(pageNumber);
    });
}
function changePage(pageNumber) {
    currentPage = pageNumber;
    displayTable(formDataArray, currentPage);
}
function filterData() {
    let searchQuery = $("#searchInput").val().toLowerCase().trim(); // Get search input value

    let filteredData = formDataArray.filter(item =>
        Object.values(item).some(value =>
            value && typeof value === "string" && value.toLowerCase().includes(searchQuery)
        )
    );

    if (filteredData.length === 0) {
        // If no matching data, display "No data found" message
        $("#tableBody").html('<tr><td colspan="100%" style="text-align: center; font-weight: bold; color: red;">No data found</td></tr>');
    } else {
        displayTable(filteredData, 1); // Display filtered results
    }
}

//=======JQuery==========
$(document).ready(function () {


   let input = document.querySelector("#phone");
    let iti = window.intlTelInput(input, {
        initialCountry: "in",
        separateDialCode: true,
        preferredCountries: ["in", "us"],
        
    });
    $("#country").change(function () {
        let selectedCountry = $(this).val().toLowerCase();
        iti.setCountry(selectedCountry === "india" ? "in" : "us");
    });
    $("#phone").on("input", function () {
        this.value = this.value.replace(/\D/g, "");
        let phoneNumber = $(this).val();
        $("#phoneError").text(/^[0-9]{10}$/.test(phoneNumber) ? "" : "Phone number must be exactly 10 digits.");
    });
    let storedData = localStorage.getItem("formData");
    if (storedData) {
        displayTable(JSON.parse(storedData), 1);
    }
    $("input, textarea, select").on("input change", function() {
        $(this).siblings(".error-msg").remove();
     });
     $("input[name='gender']").on("change", function() {
         $("#gender").next(".error-msg").remove();
     });
     $(".terms-check input[type='checkbox']").on("change", function() {
         $(".terms-check").next(".error-msg").remove();
     });

     if ($("#directoryContainer").is(":visible")) {
        startTimer();
    }
     // Trigger filtering when the user types in the search input
     $("#searchInput").on("input", function () {
         filterData(); 
     });
     $("#myForm").submit(function(e) {
        e.preventDefault();
        
        // Call your validation function. If validation fails, stop processing.
        if (!validateForm()) {
            // Optionally, you can display a general message here.
            return;
        }
        
        // If validation passes, gather the form data.
        var formData = {
            firstName: $("#firstName").val(),
            middleName: $("#middleName").val(),
            lastName: $("#lastName").val(),
            address: $("#address").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            gender: $("input[name='gender']:checked").val(),
            country: $("#country").val(),
            state: $("#state").val(),
            city: $("#city").val()
        };
        
        // Retrieve existing contacts from localStorage or initialize an empty array.
        var contacts = localStorage.getItem("formData");
        contacts = contacts ? JSON.parse(contacts) : [];
        
        // Check if we're in edit mode (using a global editIndex variable, for example).
        if (window.editIndex !== undefined && window.editIndex !== -1) {
            contacts[window.editIndex] = formData;
            showSuccessMessage("Data updated successfully");
            window.editIndex = -1; // Reset the edit index after updating.
        } else {
            contacts.push(formData);
            showSuccessMessage("Data saved successfully");
        }
        
        // Save updated contacts array to localStorage.
        localStorage.setItem("formData", JSON.stringify(contacts));
        
        // Reset the form.
        $("#myForm")[0].reset();
        
        // Reload the table (assuming you have a function displayTable to refresh the view).
        displayTable(contacts, 1);
    });
    
    
    
    
    function showSuccessMessage(message) {
        let successMessage = $('<div class="alert alert-success" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); font-weight: bold;">' + message + '</div>');
        $("body").prepend(successMessage);
        setTimeout(() => {
            successMessage.fadeOut("slow", function() {
                $(this).remove();
            });
        }, 2000);
    }
    
    $("input").attr("autocomplete", "off");
    const states = { India: ["Gujarat", "Maharashtra", "Rajasthan"], USA: ["California", "Texas", "New York"] };
    const cities = {
        Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Morbi"], Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"], California: ["Los Angeles", "San Francisco", "San Diego"],
        Texas: ["Houston", "Dallas", "Austin"], NewYork: ["New York City", "Buffalo", "Rochester"]
    };
    $("#country").change(function () {
        let selectedCountry = $(this).val();
    
        // Reset & disable state and city dropdowns
        $("#state").prop("disabled", !selectedCountry).empty().append('<option value="">Select State</option>');
        $("#city").prop("disabled", true).empty().append('<option value="">Select City</option>');
    
        // Populate states if a country is selected
        if (selectedCountry && states[selectedCountry]) {
            states[selectedCountry].forEach(state => {
                $("#state").append(`<option value="${state}">${state}</option>`);
            });
        }
    });
    $("#state").change(function () {
        let selectedState = $(this).val();
    
        // Reset & disable city dropdown
        $("#city").prop("disabled", !selectedState).empty().append('<option value="">Select City</option>');
    
        // Populate cities if a state is selected
        if (selectedState && cities[selectedState]) {
            cities[selectedState].forEach(city => {
                $("#city").append(`<option value="${city}">${city}</option>`);
            });
        }
    });
    function showSuccessMessage(message) {
        let successMessage = $('<div class="success-message" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background-color: #4CAF50; color: white; padding: 10px; border-radius: 5px; font-weight: bold;">' + message + '</div>');
        $("body").prepend(successMessage);
        setTimeout(() => $(".success-message").fadeOut(), 2000);
    }
});

