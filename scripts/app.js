"use strict";

// Create a div element for the lightbox background
const lightboxBg = document.createElement('div');
lightboxBg.id = "lightboxBg";
document.body.appendChild(lightboxBg);

// Select all elements with the class 'zoom-img' and add click event listeners
const images = document.querySelectorAll('.zoom-img');
images.forEach(image => {
    image.addEventListener('click', e => {
        // When an image is clicked, add the 'active' class to the lightbox background
        lightboxBg.classList.add('active');

        // Create a new img element for the lightbox image
        const lightboxImg = document.createElement('img');
        lightboxImg.src = image.src;
        lightboxImg.id = "lightboxImg";

        // Remove any existing child elements from the lightbox background
        while (lightboxBg.firstChild) {
            lightboxBg.removeChild(lightboxBg.firstChild);
        }

        // Append the lightbox image to the lightbox background
        lightboxBg.appendChild(lightboxImg);
    });
});

// Add a click event listener to the lightbox background to remove the 'active' class
lightboxBg.addEventListener('click', e => {
    lightboxBg.classList.remove('active');
});
$(document).ready(function() {
    // Configuration for the Quotes API
    let apiUrl = 'https://api.api-ninjas.com/v1/quotes';
    let category = 'happiness';
    let apiKey = 'XNVban3XBdoDrykLaXpGQQ==zR3gTGPF9411J3cm';

    // Build the request URL
    let requestUrl = apiUrl + '?category=' + category;

    // Make the AJAX request
    $.ajax({
        method: 'GET', // HTTP method for the request
        url: requestUrl, // URL for the API request
        headers: { 'X-Api-Key': apiKey }, // API key for authentication
        contentType: 'application/json', // Specify JSON as the content type
        success: function(result) {
            // Callback function for a successful request
            displayQuote(result); // Display the quote using a custom function
        },
        error: function(jqXHR) {
            // Callback function for an error in the request
            console.error('Error: ', jqXHR.responseText); // Log the error in the console
        }
    });

    // Function to display the quote in the container
    function displayQuote(data) {
        let quoteContainer = $('#quote-container'); // Reference to the quote container element

        // Clear the container before adding new quotes
        quoteContainer.empty();

        // Check if there are results
        if (data.length > 0) {
            let quote = data[0]; // Extract the first quote from the data
            let quoteElement = $('<div class="quote">'); // Create a div element for the quote

            // Add the quote text to the quote element
            quoteElement.append('<p class="quote-label">"' + quote.quote + '"</p>');

            // Add the author information to the quote element
            quoteElement.append('<p class="author-label">Author: ' + quote.author + '</p>');

            // Uncomment the line below if you want to display the category as well
            // quoteElement.append('<p>Category: ' + quote.category + '</p>');

            // Append the quote element to the quote container
            quoteContainer.append(quoteElement);
        } else {
            // Display a message if no quotes are found in the specified category
            quoteContainer.append('<p>No se encontraron citas en la categoría especificada.</p>');
        }
    }
});
// Weather API configuration
let weatherApiUrl = 'https://api.api-ninjas.com/v1/weather';
let city = 'Oshawa'; // City for which weather data is requested
let apiKey = 'XNVban3XBdoDrykLaXpGQQ==zR3gTGPF9411J3cm'; // Replace with your actual API key

// Build the URL for the weather request
let weatherRequestUrl = weatherApiUrl + '?city=' + city;

// Make an AJAX request for weather data
$.ajax({
    method: 'GET', // HTTP method for the request
    url: weatherRequestUrl, // URL for the weather API request
    headers: { 'X-Api-Key': apiKey }, // API key for authentication
    contentType: 'application/json', // Specify JSON as the content type
    success: function(result) {
        // Callback function for a successful request
        console.log(result); // Log the result in the console
        displayWeather(result, city); // Display the weather using a custom function
    },
    error: function(jqXHR) {
        // Callback function for an error in the request
        console.error('Error: ', jqXHR.responseText); // Log the error in the console
    }
});

// Function to display weather information in the container
function displayWeather(data, cityName) {
    let weatherContainer = $('#weather-container'); // Reference to the weather container element

    // Clear the container before adding new weather information
    weatherContainer.empty();

    // Check if there are results and if the expected properties are present
    if (data) {
        let weatherElement = $('<div class="weather-info">'); // Create a div element for weather information

        // Add the city name to the weather element
        weatherElement.append('<p><span class="info-label">City:</span> ' + cityName + '</p>');

        // Add various weather information to the weather element
        weatherElement.append('<p><span class="info-label">Cloud Percentage:</span> ' + data.cloud_pct + '%</p>');
        weatherElement.append('<p><span class="info-label">Temperature: </span> ' + data.temp + ' °C</p>');
        weatherElement.append('<p><span class="info-label">Feels Like:</span> ' + data.feels_like + ' °C</p>');
        weatherElement.append('<p><span class="info-label">Humidity:</span> ' + data.humidity + '%</p>');
        weatherElement.append('<p><span class="info-label">Min Temperature:</span> ' + data.min_temp + ' °C</p>');
        weatherElement.append('<p><span class="info-label">Max Temperature:</span> ' + data.max_temp + ' °C</p>');
        weatherElement.append('<p><span class="info-label">Wind Speed:</span> ' + data.wind_speed + ' m/s</p>');
        weatherElement.append('<p><span class="info-label">Wind Degrees:</span> ' + data.wind_degrees + '°</p>');
        weatherElement.append('<p><span class="info-label">Sunrise:</span> ' + new Date(data.sunrise * 1000) + '</p>');
        weatherElement.append('<p><span class="info-label">Sunset:</span> ' + new Date(data.sunset * 1000) + '</p>');

        // Append the weather element to the weather container
        weatherContainer.append(weatherElement);
    } else {
        // Display a message if no weather information is found for the specified city
        weatherContainer.append('<p>The weather information for the specified city could not be found.</p>');
    }
}


// Wait for the document to be ready before executing the code
$(document).ready(function() {

    // Use AJAX to fetch event data from a JSON file or an external API
    $.ajax({
        url: "./data/events.json", // Change this to the actual path or API endpoint
        dataType: 'json',
        success: function(data) {
            // Call the displayEvents function with the retrieved event data
            displayEvents(data.events);
        },
        error: function(error) {
            // Log an error message if there's an issue fetching events
            console.error('Error fetching events:', error);
        }
    });

    // Function to display events in the events list
    function displayEvents(events) {
        // Reference to the events list container
        let eventsList = $('#events-list');

        // Iterate through each event and create an HTML element for it
        events.forEach(function(event) {
            // Create a list item for the event with a class of 'event-item'
            let eventItem = $('<li class="event-item">');

            // Append event details to the event item
            eventItem.append('<h2>' + event.title + '</h2>');
            eventItem.append('<p><strong>Date:</strong> ' + event.date + '</p>');
            eventItem.append('<p><strong>Location:</strong> ' + event.location + '</p>');
            eventItem.append('<p>' + event.description + '</p>');

            // Append the event item to the events list
            eventsList.append(eventItem);
        });
    }
});
// Function to fetch a random dog image from the Dog API
function get_random_dog() {
    // API endpoint for a random dog image
    let urlDog = "https://dog.ceo/api/breeds/image/random";

    // Fetch data from the API
    fetch(urlDog)
        .then(function(response) {
            // Parse the response as JSON
            return response.json();
        })
        .then(function(data) {
            // Call the display_image function with the retrieved image URL
            display_image(data.message);
        })
        .catch(function(error) {
            // Log an error message if there's an issue with the fetch operation
            console.log("Error: " + error);
        });
}

// Function to display a dog image on the webpage
function display_image(image_urlDog) {
    // Set the source of the dog image element to the retrieved image URL
    document.getElementById("dog-image").src = image_urlDog;
}

(function () {

    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`)
        }

        $("#logout").on("click", function (){
            sessionStorage.clear();
            location.href = "login.html";
        });
    }

    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }

    function LoadFooter(html_data){
        $("footer").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }

    function AjaxRequest(method, url, callback){

        // Step 1: instantiate an XHR object
        let xhr = new XMLHttpRequest();

        // Step 2: Open a connection to the server
        xhr.open(method, url);

        // Step 3: Add event listener for readystatechange event
        // The readysate event is being triggered when the
        // state of the document being fetched changes
        xhr.addEventListener("readystatechange", () => {

            if(xhr.readyState === 4 && xhr.status === 200){

                // Response succeeded - data is available in here only
                if(typeof callback == "function"){
                    callback(xhr.responseText);
                }else{
                    console.error("ERROR: callback not a function");
                }
            }
        });
        // Step 4: send the request
        xhr.send();
    }

    function ContactFormValidation(){
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First and Last Name");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Contact Number");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address");
    }

    /**
     * This function validates input for text field
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */

    function ValidateField(input_field_id, regular_expression, error_message){

        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function () {
            // Fail Validation
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                // pattern fails
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                // Pass Validation
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
        let AboutUsButton = document.getElementById("AboutUsBtn")

        AboutUsButton.addEventListener("click", function () {
            location.href = "team.html";
        });

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");

        let DocumentBody = document.body;
        let Article = document.createElement("article");
        DocumentBody.appendChild(Article);
    }

    let slideIndex = 0;

    function showSlides() {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" dot-active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " dot-active";

        setTimeout(showSlides, 4000); // Change the time to 4000 milliseconds (4 seconds)
    }

    document.addEventListener("DOMContentLoaded", function () {
        showSlides(); // Start the slideshow when the page loads
    });

    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const advice = data.slip.advice;
            console.log(`Advice: ${advice}`);
        });

    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage()");
        const services = [
            {
                id:"daycamps",
                name:"Day Camps",
                img:"images/kids-vacations.jpg",
                desc: "Endless fun meets meaningful experiences! Our day camp is a\n " +
                    "vibrant haven for young adventurers, providing a dynamic mix of engaging activities, interactive\n" +
                    " workshops, and outdoor adventures. With flexible scheduling options, your child is invited to embark on a summer\n " +
                    "journey filled with excitement, laughter, and cherished memories.",
            },
            {
                id:"workshops",
                name:"Workshops",
                img:"images/workshops.jpg",
                desc:"Where Creativity Takes Center Stage!\n +" +
                    "Our workshops offer a unique and immersive experience for individuals eager to explore their\n                    artistic passions. Led by skilled instructors, participants will delve into a variety of hands-on\n                    activities, from fine arts and crafts to digital design and beyond. Whether you're a beginner or an\n                    experienced artist and unleash your creativity in an environment that celebrates individuality and artistic growth.",
            },
            {
                id:"iceskate",
                name:"Ice Skate",
                img:"images/ice-skate.jpg",
                desc:"Our ice skating sessions offer a frosty escape where individuals of all\n                    ages can experience the thrill of gliding on the ice. Join us for open skate sessions, take part in\n                    lessons to hone your skills, or celebrate special occasions with a unique ice skating party.\n                   Cool memories await—come, skate, and create winter magic with us!",
            },
            {
                id:"recreationalactivities",
                name:"Recreational Activities",
                img:"images/table-games.jpg",
                desc:"Our recreational activities are designed to bring people together for\n                    laughter, relaxation, and a healthy dose of fun. From energetic team sports like volleyball and\n                    basketball to more laid-back pursuits like board games and yoga, our center offers a diverse range\n                    of activities to cater to every interest and age group. Join us and embrace the spirit of\n                    recreation, where each moment is an opportunity to create lasting memories with friends and family. ",
            },
            {
                id:"dancingclases",
                name:"Recreational Activities",
                img:"images/dancing.jpg",
                desc:"Unleash the rhythm within and join our vibrant dance classes at the Community Center! Whether you're a beginner or a seasoned dancer, our inclusive and energetic classes cater to all levels. Discover the joy of movement, enhance your skills, and embrace the artistry of dance. Our experienced instructors create a supportive environment where you can learn various dance styles, from salsa to hip-hop. Come dance with us and let the beats guide you on a journey of self-expression and fun. Step into the rhythm, step into the community!",
            },
            {
                id:"dancingclases",
                name:"Recreational Activities",
                img:"images/elder.jpg",
                desc:"Experience the camaraderie of board games designed for seniors at our Community Center! Join our engaging sessions tailored for the elderly, where laughter and strategy come together. Rediscover the joy of play and make lasting memories. Board games, good company, and smiles await you. Embrace the fun – join us!",
            },
        ];
        let card = document.getElementById("card-template");

        services.map(x=>{
            card.innerHTML +=`
                <div class="service1">
                    <div class="card-img">
                        <span class="overlay"></span>
                        <img src="${x.img}" alt="${x.name}"/>
                    </div>
    
                    <div class="card-content">
                    <h3 class="portfolio-name">${x.name}</h3>
                    <p class="portfolio-content">${x.desc}</p>
                    </div>
                </div>`;
        });
    }

    function DisplayServicesPage() {
        console.log("Called DisplayServicesPage()");
    }

    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage()");
    }

    function DisplayBlogPage() {
        console.log("Called DisplayBlogPage()");
    }
    function DisplayEventsPage() {
        console.log("Called DisplayeventsPage()");
    }

    function DisplayGalleryPage() {
        console.log("Called DisplayGalleryPage()");
    }

    function DisplayContactPage() {
        console.log("Called DisplayContactPage()");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function() {
            if(subscribeCheckbox.checked) {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage() {
        console.log("Called DisplayContactListPage()");

        if (localStorage.length > 0) {

            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;

            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th> 
                         <td>${contact.fullName}</td>
                         <td>${contact.contactNumber}</td>
                         <td>${contact.emailAddress}</td>
                         <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm"> Edit</i>                         
                            </button>
                         </td>
                         <td class="text-center">
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fas fa-trash-alt fa-sm"> Delete</i>                         
                            </button>
                         </td>                            
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }

        $("#addButton").on("click", () => {
            location.href = "edit.html#add";
        });

        $("button.edit").on("click", function () {
            location.href = "edit.html#" + $(this).val();
        });

        $("button.delete").on("click", function () {
            if (confirm("Delete Contact? Please confirm")){
                localStorage.removeItem($(this).val());
            }
            location.href = "contact-list.html";
        });
    }


    function DisplayEditPage(){
        console.log("DisplayEdit Page Called ...");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page){
            case "add":
                // add contact chosen
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"/> Add`);

                $("#editButton").on("click", (event)=> {
                    // prevent form submission
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", ()=> {
                    location.href = "contact-list.html";
                });
                break;

            default:
                // edit contact chosen
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                // Pre-populate form
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event) => {
                    // prevent from submission
                    event.preventDefault();
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break
        }
    }

    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function (data) {

                for(const user of data.users){

                    console.log(user);
                    if(username.value === user.Username && password.value === user.Password){
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }

                if (success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contactus.html";
                }else{

                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });

        $("#cancelButton").on("click", function(){
            document.forms[0].reset();
            location.href = "index.html";
        });
    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");
    }

    function Start() {
        console.log("App Started");

        AjaxRequest("GET", "header.html", LoadHeader);
        AjaxRequest("GET", "footer.html", LoadFooter);

        switch (document.title) {
            case "Home":
                DisplayHomePage();
                break;
            case "Portfolio":
                DisplayPortfolioPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "Our Team":
                DisplayTeamPage();
                break;
            case "Blog":
                DisplayBlogPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                break;
        }
    }
    window.addEventListener("load", Start);
})()

function DisplayNewPage() {
    console.log("Called DisplayNewPage()");
    const addPage = [
        {
            id: "careers",
            name: "Careers",
            link: "careers.html",
        }
    ];
    let page = document.querySelector(".navbar-nav.ms-auto.mb-2.mb-lg-0");

    // addPage.map(x=>{
    page.innerHTML += `
                <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="${addPage[0].link}">${addPage[0].name}</a>
                </li>`;
}
document.addEventListener("DOMContentLoaded", function () {
    DisplayNewPage(); // Start the slideshow when the page loads
});


// Get the list of <a> elements within the <ul>
let navLinks = document.querySelectorAll('#navbarSupportedContent ul.navbar-nav li.nav-item a');

// Iterate through the links and change the name of the desired page
navLinks.forEach(function(link) {
    if (link.href.endsWith('blog.html')) {
        // Change the link text to your new name
        link.textContent = 'News';
    }
});

const articles = [
    {
        title: 'Article 1',
        summary: 'This is the summary of Article 1. It provides a brief overview of the content.',
        content: 'The full content of Article 1 goes here.'
    },
    {
        title: 'Article 2',
        summary: 'Summary for Article 2. It gives readers a glimpse of what the article is about.',
        content: 'Full content for Article 2 is included in this section.'
    },
];

function createBlogPost(article) {
    const blogContainer = document.getElementById('blog-container');

    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    const titleElement = document.createElement('h2');
    titleElement.textContent = article.title;

    const summaryElement = document.createElement('p');
    summaryElement.textContent = article.summary;

    const readMoreLink = document.createElement('a');
    readMoreLink.href = '#'; // Add the actual link here
    readMoreLink.textContent = 'Read More';
    readMoreLink.classList.add('read-more');

    articleDiv.appendChild(titleElement);
    articleDiv.appendChild(summaryElement);
    articleDiv.appendChild(readMoreLink);

    blogContainer.appendChild(articleDiv);
}

// Populate the blog with articles
articles.forEach(createBlogPost);

const carousel = document.querySelector(".carousel");
let firstImg;
firstImg = carousel.querySelectorAll("img")[0];
let arrowIcons;
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // Showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // Getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // Getting first img width & adding 14 margin value
        // If clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff); // Making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // Getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) { // If user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // If user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // Updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // Scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

// Dynamic footer positioning on scroll
window.addEventListener('scroll', function () {
    const footer = document.getElementById('footer');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    // If the content is shorter than the viewport, fix the footer at the bottom
    if (bodyHeight < windowHeight) {
        footer.style.position = 'fixed';
        footer.style.bottom = '0';
    } else {
        // Otherwise, dynamically set the position based on scroll
        if (scrollPosition + windowHeight >= bodyHeight) {
            footer.style.position = 'absolute';
            footer.style.bottom = '0';
        } else {
            footer.style.position = 'sticky';
            footer.style.bottom = 'initial';
        }
    }
});

function toggleAccordion(servicesId) {
    const servicesContent = document.getElementById(servicesId);
    servicesContent.style.display = (servicesContent.style.display === 'none' || servicesContent.style.display === '') ? 'block' : 'none';
}

const postsTemplate = document.querySelector("[data-posts-template]")
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        const posts = postsTemplate.content.cloneNode(true)
        console.log(posts)
    })

document.getElementById("icon-menu").addEventListener("click", mostrar_menu);

function mostrar_menu(){

    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
}


