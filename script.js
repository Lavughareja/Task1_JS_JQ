let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
let currentPage = 1;
const rowsPerPage = 3;
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
        $("#gender").last().after('<div class="error-msg">⚠ Please select your gender.</div>');
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
$("input, textarea, select").on("input change", function() {
    
    $(this).siblings(".error-msg").remove();
});
$("input[name='gender']").on("change", function() {
    $("#gender").next(".error-msg").remove();
});


$(".terms-check input[type='checkbox']").on("change", function() {
    $(".terms-check").next(".error-msg").remove();
});


function displayTable(formDataArray, currentPage) {
    if (!formDataArray || formDataArray.length === 0) {
        console.log("No data available.");
        return; 
    }

    const recordsPerPage = 3;  
    const totalPages = Math.ceil(formDataArray.length / recordsPerPage); 

 
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

   
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
                        <i class=" editBtn fa-solid fa-pen editIcon"></i>
                       
                        <i class=" deleteBtn fa-solid fa-trash deleteIcon"></i>
                    </td>
                </tr>`;
        }
    }

    tableHTML += `</tbody></table>`;

   
    tableHTML += `
        <div class="pagination">
            <button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        </div>`;

    $("#formContainer").html(tableHTML);

   
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

    
    $(".editBtn").click(function () {
        let rowIndex = $(this).closest("tr").data("index");
        let formData = formDataArray[rowIndex];


        
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

   
   $(".deleteBtn").click(function () {
    let rowIndex = $(this).closest("tr").data("index");
     
    
    let confirmation = window.confirm("Are you sure you want to delete this record?");

    
    if (confirmation) {
        if (formDataArray[rowIndex]) {
            formDataArray.splice(rowIndex, 1); 
            showdeleteMessage("Data delete successfully!");
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
$("#clearBtn").click(function () {
    
    $("#myForm")[0].reset(); 

    
    $(".error-msg").remove();  
    $("input, select").removeClass("error");  

   
    $("#firstName, #middleName, #lastName, #address, #email, #phone, #country, #state, #city").val('');
    $("input[name='gender']").prop('checked', false); 
});
}

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

function changePage(pageNumber) {
    currentPage = pageNumber;
    displayTable(formDataArray, currentPage);
}
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

$("#filterFirstName, #filterLastName, #filterMiddleName, #filterAddress, #filterPhone, #filterGender, #filterCountry, #filterState, #filterCity").on("input", function () {
    filterData(); 
});

displayTable(formDataArray, currentPage);



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


    $("#myForm").submit(function (event) {
        event.preventDefault();
    
       
        if (!validateForm()) return;
    
       
        let formData = {
            firstName: $("#firstName").val(),
            middleName: $("#middleName").val(),
            lastName: $("#lastName").val(),
            address: $("#address").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            gender: $("input[name='gender']:checked").val(),
            country: $("#country").val(),
            state: $("#state").val(),
            city: $("#city").val(),
        };
    
        
        let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
        formDataArray.push(formData);
        localStorage.setItem("formData", JSON.stringify(formDataArray));
    
        
        $("#myForm")[0].reset();
        $(".error-msg").remove();
        showSuccessMessage("Data submitted successfully!");
        
        displayTable(formDataArray, 1);
    });
    function showSuccessMessage(message) {
        let successMessage = $('<div class="success-message" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background-color: #4CAF50; color: white; padding: 10px; border-radius: 5px; font-weight: bold;">' + message + '</div>');
        $("body").prepend(successMessage);
        setTimeout(() => $(".success-message").fadeOut(), 2000);
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
        $("#state").prop("disabled", false).empty().append('<option value="">Select State</option>');
        $("#city").prop("disabled", true).empty().append('<option value="">Select City</option>');
        states[selectedCountry]?.forEach(state => $("#state").append(`<option value="${state}">${state}</option>`));
    });

    $("#state").change(function () {
        let selectedState = $(this).val();
        $("#city").prop("disabled", false).empty().append('<option value="">Select City</option>');
        cities[selectedState]?.forEach(city => $("#city").append(`<option value="${city}">${city}</option>`));
    });

   

    function showSuccessMessage(message) {
        let successMessage = $('<div class="success-message" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background-color: #4CAF50; color: white; padding: 10px; border-radius: 5px; font-weight: bold;">' + message + '</div>');
        $("body").prepend(successMessage);
        setTimeout(() => $(".success-message").fadeOut(), 2000);
    }
});
