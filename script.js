// JavaScript Function to Validate Inputs
function validateForm() {
    let isValid = true;

    // Get values
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
    let termsAccepted = $("#terms").is(":checked"); // Check if checkbox is checked 

    // Clear previous error messages
    $(".error").text("");

    // First Name Validation
    if (firstName === "") {
        $("#firstNameError").text("⚠ First Name is required.");
        isValid = false;
    }
    if (middleName === "") {
        $("#middleNameError").text("⚠ Middle Name is required.");
        isValid = false;
    }
    if (address === "") {
        $("#addressError").text("⚠ Address is required.");
        isValid = false;
    }

    // Last Name Validation
    if (lastName === "") {
        $("#lastNameError").text("⚠ Last Name is required.");
        isValid = false;
    }

    // Email Validation
    if (email === "") {
        $("#emailError").text("⚠ Email is required.");
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        $("#emailError").text("⚠ Invalid email format.");
        isValid = false;
    }

    // Phone Number Validation (10 digits only)
    if (phone === "") {
        $("#phoneError").text("⚠ Phone number is required.");
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        $("#phoneError").text("⚠ Phone number must be exactly 10 digits.");
        isValid = false;
    }

    // Gender Validation
    if (!gender) {
        $("#genderError").text("⚠ Please select your gender.");
        isValid = false;
    }

    // Country Validation
    if (country === "") {
        $("#countryError").text("⚠ Please select a country.");
        isValid = false;
    }

    // State Validation
    if (state === "") {
        $("#stateError").text("⚠ Please select a state.");
        isValid = false;
    }

    // City Validation
    if (city === "") {
        $("#cityError").text("⚠ Please select a city.");
        isValid = false;
    }

    if (!termsAccepted) {
        $("#termsError").text("⚠ You must accept the terms and conditions.");
        isValid = false;
    }

    return isValid;
}

// Event listeners to remove validation messages when the user types or interacts with fields

$(document).ready(function () {
    // Remove error message when the user starts typing in a field
    $("#firstName, #middleName, #lastName, #address, #email, #phone, #country, #state, #city").on("input", function () {
        $(this).next(".error").text("");  // Clear error for the corresponding field
    });

    // Remove gender error when the user selects gender
    $("input[name='gender']").change(function () {
        $("#genderError").text("");
    });

    // Remove terms error when the user checks/unchecks the checkbox
    $("#terms").change(function () {
        $("#termsError").text("");
    });
});

let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
let currentPage = 1;
const rowsPerPage = 3;


// Function to search data in the table
function searchData() {
    let searchFirstName = $("#searchFirstName").val().toLowerCase();
    let searchLastName = $("#searchLastName").val().toLowerCase();
    let searchMiddleName = $("#searchMiddleName").val().toLowerCase();
    let searchAddress = $("#searchAddress").val().toLowerCase();
    let searchPhone = $("#searchPhone").val().toLowerCase();
    let searchGender = $("#searchGender").val().toLowerCase();
    let searchCountry = $("#searchCountry").val().toLowerCase();
    let searchState = $("#searchState").val().toLowerCase();
    let searchCity = $("#searchCity").val().toLowerCase();

    let filteredData = formDataArray.filter(item => 
        (searchFirstName === "" || item.firstName.toLowerCase().includes(searchFirstName)) &&
        (searchLastName === "" || item.lastName.toLowerCase().includes(searchLastName)) &&
        (searchMiddleName === "" || item.middleName.toLowerCase().includes(searchMiddleName)) &&
        (searchAddress === "" || item.address.toLowerCase().includes(searchAddress)) &&
        (searchPhone === "" || item.phone.toLowerCase().includes(searchPhone)) &&
        (searchGender === "" || item.gender.toLowerCase().includes(searchGender)) &&
        (searchCountry === "" || item.country.toLowerCase().includes(searchCountry)) &&
        (searchState === "" || item.state.toLowerCase().includes(searchState)) &&
        (searchCity === "" || item.city.toLowerCase().includes(searchCity))
    ); 

    displayTable(filteredData, 1); // Show filtered results from page 1
}

// Event listeners for the search input fields
$("#searchFirstName, #searchLastName, #searchMiddleName, #searchAddress, #searchPhone, #searchGender, #searchCountry, #searchState, #searchCity").on("input", function () {
    searchData(); // Apply search when input changes
});

// Function to filter data based on selected filters
function filterData() {
    let filterFirstName = $("#filterFirstName").val().toLowerCase();
    let filterLastName = $("#filterLastName").val().toLowerCase();
    let filterMiddleName = $("#filterMiddleName").val().toLowerCase();
    let filterAddress = $("#filterAddress").val().toLowerCase();
    let filterPhone = $("#filterPhone").val().toLowerCase();
    let filterGender = $("#filterGender").val().toLowerCase();
    let filterCountry = $("#filterCountry").val().toLowerCase();
    let filterState = $("#filterState").val().toLowerCase();
    let filterCity = $("#filterCity").val().toLowerCase();

    let filteredData = formDataArray.filter(item => 
        (filterFirstName === "" || item.firstName.toLowerCase().includes(filterFirstName)) &&
        (filterLastName === "" || item.lastName.toLowerCase().includes(filterLastName)) &&
        (filterMiddleName === "" || item.middleName.toLowerCase().includes(filterMiddleName)) &&
        (filterAddress === "" || item.address.toLowerCase().includes(filterAddress)) &&
        (filterPhone === "" || item.phone.toLowerCase().includes(filterPhone)) &&
        (filterGender === "" || item.gender.toLowerCase().includes(filterGender)) &&
        (filterCountry === "" || item.country.toLowerCase().includes(filterCountry)) &&
        (filterState === "" || item.state.toLowerCase().includes(filterState)) &&
        (filterCity === "" || item.city.toLowerCase().includes(filterCity))
    );

    displayTable(filteredData, 1); // Show filtered results from page 1
}

// Event listeners for the filter input fields
$("#filterFirstName, #filterLastName, #filterMiddleName, #filterAddress, #filterPhone, #filterGender, #filterCountry, #filterState, #filterCity").on("input", function () {
    filterData(); // Apply filter when input changes
});

// Function to display data in the table
function displayTable(data, page) {
    let tableBody = $("#dataTable tbody");
    tableBody.empty(); // Clear the table before adding new rows

    let startIndex = (page - 1) * rowsPerPage;
    let endIndex = startIndex + rowsPerPage;
    let paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((item, index) => {
        let row = `<tr data-index="${index}">
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.middleName}</td>
            <td>${item.address}</td>
            <td>${item.phone}</td>
            <td>${item.gender}</td>
            <td>${item.country}</td>
            <td>${item.state}</td>
            <td>${item.city}</td>
            <td><button class="deleteBtn">Delete</button></td>
        </tr>`;
        tableBody.append(row);
    });

    $(".deleteBtn").click(function () {
        let rowIndex = $(this).closest("tr").data("index");
        let confirmation = window.confirm("Are you sure you want to delete this record?");
        if (confirmation) {
            formDataArray.splice(rowIndex, 1);
            localStorage.setItem("formData", JSON.stringify(formDataArray));
            displayTable(formDataArray, currentPage);
        }
    });

    updatePagination(data.length, page);
}

// Function to update pagination controls
function updatePagination(totalItems, currentPage) {
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

// Function to change pages
function changePage(pageNumber) {
    currentPage = pageNumber;
    displayTable(formDataArray, currentPage);
}

// Initial display
displayTable(formDataArray, currentPage);

$(document).ready(function () {
    let input = document.querySelector("#phone");

    // Initialize intlTelInput plugin
    let iti = window.intlTelInput(input, {
        initialCountry: "in", // Set India as the default country
        separateDialCode: true,
        preferredCountries: ["in", "us"],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    // Update country code when country is selected
    $("#country").change(function () {
        let selectedCountry = $(this).val().toLowerCase(); // Get the selected country
        if (selectedCountry === "india") {
            iti.setCountry("in");  // Set country to India
        } else if (selectedCountry === "usa") {
            iti.setCountry("us");  // Set country to USA
        }
    });

    // Phone number validation (10-digit)
    $("#phone").on("input", function () {
        let phoneNumber = $(this).val();
        if (!/^\d{10}$/.test(phoneNumber)) {
            $("#phoneError").text("Phone number must be exactly 10 digits.");
        } else {
            $("#phoneError").text("");
        }
    });

    // Prevent non-numeric input in Phone Number field
    $("#phone").on("input", function () {
        this.value = this.value.replace(/\D/g, ""); // Removes non-numeric characters
    });
});



// Form Submit Event
$(document).ready(function () {
    // Check if data exists in localStorage and display it
    let storedData = localStorage.getItem("formData");
    if (storedData) {
        let formDataArray = JSON.parse(storedData);
        displayTable(formDataArray, 1);  // Display first page
    }

    // Handle form submission
    $("#myForm").submit(function (event) {
        event.preventDefault(); // Prevents the form from submitting traditionally (i.e., refreshing the page).

        if (!validateForm()) {
            return; //Calls a function validateForm(). If validation fails, it stops further execution.
        }

        // Retrieves values from the form fields using jQuery val().Gets the selected gender from the radio button.Stores all the values in variables.
        let firstName = $("#firstName").val();
        let middleName = $("#middleName").val();
        let lastName = $("#lastName").val();
        let address = $("#address").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let gender = $("input[name='gender']:checked").val();
        let country = $("#country").val();
        let state = $("#state").val();
        let city = $("#city").val();

        // Store form data in an object with separate first, middle, and last name
        let formData = {
            firstName,
            middleName,
            lastName,
            address,
            email,
            phone,
            gender,
            country,
            state,
            city,
        };

        // Retrieve existing form data from localStorage
        let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];

        // Append the new form data to the array
        formDataArray.push(formData);

        // Save the updated form data array back to localStorage
        localStorage.setItem("formData",JSON.stringify(formDataArray));

        // Display the table with all submitted information
        displayTable(formDataArray, 1);  // Display first page

        // Clear the form fields after submission
        $("#myForm")[0].reset(); // Reset form fields
        $(".error").text(""); // Clear error messages
         // Show success message
         showSuccessMessage("Data submitted successfully!");
         setTimeout(function () {
            $(".success-message").fadeOut();
        }, 2000);
        
    });

    // Prevent non-numeric input in Phone Number field
    $("#phone").on("input", function () {
        this.value = this.value.replace(/\D/g, ""); // Removes non-numeric characters
    });

    // Country-State-City Dropdown Logic
    const states = {
        India: ["Gujarat", "Maharashtra", "Rajasthan"],
        USA: ["California", "Texas", "New York"]
    };

    const cities = {
        Gujarat: ["Ahmedabad", "Surat", "Vadodara","Morbi"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
        California: ["Los Angeles", "San Francisco", "San Diego"],
        Texas: ["Houston", "Dallas", "Austin"],
        NewYork: ["New York City", "Buffalo", "Rochester"]
    };

    // Enable and populate state and city fields when country is selected
    $("#country").change(function () {
        let selectedCountry = $(this).val();
        $("#state").prop("disabled", false).empty().append('<option value="">Select State</option>');
        $("#city").prop("disabled", true).empty().append('<option value="">Select City</option>');

        if (selectedCountry in states) {
            states[selectedCountry].forEach(state => {
                $("#state").append(`<option value="${state}">${state}</option>`);
            });
        }
    });

    // Enable and populate city field when state is selected
    $("#state").change(function () {
        let selectedState = $(this).val();
        $("#city").prop("disabled", false).empty().append('<option value="">Select City</option>');

        if (selectedState in cities) {
            cities[selectedState].forEach(city => {
                $("#city").append(`<option value="${city}">${city}</option>`);
            });
        }
    });
    function showSuccessMessage(message) {
        // Create and display success message
        let successMessage = $('<div class="success-message" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background-color: #4CAF50; color: white; padding: 10px; border-radius: 5px; font-weight: bold;">' + message + '</div>');
        $("body").prepend(successMessage); // Add the success message at the top of the body
    }
});

// Function to display form data in a table format with pagination
function displayTable(formDataArray, currentPage) {
    if (!formDataArray || formDataArray.length === 0) {
        console.log("No data available.");
        return; // Prevent further execution if there's no data
    }

    const recordsPerPage = 3;  // Number of records per page
    const totalPages = Math.ceil(formDataArray.length / recordsPerPage);  // Calculate total pages

    // Ensure the current page is within bounds
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, formDataArray.length);

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
            <tbody>`;

    // Loop through the records for the current page
    for (let i = startIndex; i < endIndex; i++) {
        const formData = formDataArray[i];
        // Make sure formData is defined before accessing properties
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
                        <i class=" editBtn fa-solid fa-pen editIcon"></i>
                       
                        <i class=" deleteBtn fa-solid fa-trash deleteIcon"></i>
                    </td>
                </tr>`;
        }
    }

    tableHTML += `</tbody></table>`;

    // Add pagination controls
    tableHTML += `
        <div class="pagination">
            <button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        </div>`;

    $("#formContainer").html(tableHTML);

    // Pagination Button functionality
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

    // Edit Button functionality
    $(".editBtn").click(function () {
        let rowIndex = $(this).closest("tr").data("index");
        let formData = formDataArray[rowIndex];


        // Ensure formData exists before filling the form fields
        if (formData) {
            $("#firstName").val(formData.firstName);
            $("#middleName").val(formData.middleName);
            $("#lastName").val(formData.lastName);
            $("#address").val(formData.address);
            $("#email").val(formData.email);
            $("#phone").val(formData.phone);
            $("input[name='gender'][value='" + formData.gender + "']").prop("checked", true);
            $("#country").val(formData.country).trigger("change");
            $("#state").val(formData.state).trigger("change");
            $("#city").val(formData.city);
            $("#editIndex").val(rowIndex);
            
            formDataArray.splice(rowIndex, 1);
            
            localStorage.setItem("formData", JSON.stringify(formDataArray));
            displayTable(formDataArray, currentPage);
        }
     });

    // Delete Button functionality
   $(".deleteBtn").click(function () {
    let rowIndex = $(this).closest("tr").data("index");
     
    // Show confirmation dialog
    let confirmation = window.confirm("Are you sure you want to delete this record?");

    // If the user confirmed the deletion
    if (confirmation) {
        if (formDataArray[rowIndex]) {
            formDataArray.splice(rowIndex, 1);  // Remove the data
            showdeleteMessage("Data delete successfully!");
             setTimeout(function () {
            $(".delete-message").fadeOut();
            }, 2000);
            localStorage.setItem("formData", JSON.stringify(formDataArray)); // Update localStorage
            displayTable(formDataArray, currentPage);  // Re-display the table after deletion
        }
    }
    function showdeleteMessage(message) {
                // Create and display success message
                let successMessage = $('<div class="delete-message" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background-color: red; color: white; padding: 10px; border-radius: 5px; font-weight: bold;">' + message + '</div>');
                $("body").prepend(successMessage); // Add the success message at the top of the body
            }
});
$("#clearBtn").click(function () {
    // Reset form fields
    $("#myForm")[0].reset(); 

    // Clear error messages
    $(".error").text(""); 

    // Remove data from the form fields only, but keep it in localStorage
    $("#firstName, #middleName, #lastName, #address, #email, #phone, #country, #state, #city").val('');
    $("input[name='gender']").prop('checked', false);
});

}
$(document).ready(function () {
    $("input").attr("autocomplete", "off");
});
