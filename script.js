// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGVcQux9GmVmYqFDITaLT9tMqq5AIiPfo",
  authDomain: "movies-f2aee.firebaseapp.com",
  projectId: "movies-f2aee",
  storageBucket: "movies-f2aee.appspot.com",
  messagingSenderId: "166473880027",
  appId: "1:166473880027:web:d35a10860d32c4156257fe",
  measurementId: "G-6G5WTF8Q23",
};

firebase.initializeApp(firebaseConfig);

// Initialize Firestore
var db = firebase.firestore();

// Retrieve movie reviews from Firestore and display in table
async function getMovieReviews() {
  db.collection("movies")
    .get()
    .then((querySnapshot) => {
      let table = document.getElementById("moviesTable");
      table.innerHTML =
        "<tr><th>Movie Name</th><th>Rating Score</th><th>Director Name</th><th>Release Date</th><th><button type='button' class='btn btn-primary' onclick='getMovieReviews()'><i class='fas fa-sync'></i></button></th><th></th></tr>";
      let i = 0;
      querySnapshot.forEach((doc) => {
        let movieName = doc.data().movieName;
        let ratingScore = doc.data().ratingScore;
        let directorName = doc.data().directorName;
        let releaseDate = doc.data().releaseDate.toDate();
        releaseDate = releaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        let row = `<tr><td contenteditable id=movieName${i}>
          ${movieName}
          </td><td contenteditable id=ratingScore${i}>
          ${ratingScore}
          </td><td contenteditable id=directorName${i}>
          ${directorName}
          </td><td contenteditable id=releaseDate${i}>
          ${releaseDate} 
          </td></td>
          <td><button type='button' class='btn btn-warning' id='updateRow${i}' onclick=editMovieReview('${i}','${doc.id}')><i class='fas fa-pen'></i></button></td>
          <td><button type='button' class='btn btn-danger'id='deleteRow${i}' onclick=deleteMovieReview('${i}','${doc.id}')><i class='fas fa-trash'></i></button></td></tr>`;
        document.getElementById("moviesTable").innerHTML += row;
        i++;
      });
    });
}
//Function add MovieReview
async function addMovieReview(event) {
  //Disabling the Add Button to prevent overflow of requests
  document.getElementById(`addBtn`).setAttribute("disabled", true);
  document.getElementById(`addBtn`).textContent = "Adding....";
  //Preventing Default Behavior of the form
  event.preventDefault();
  //Extracting the values from the form input fields
  let movieName = document.getElementById("movieNameInput").value;
  let ratingScore = document.getElementById("ratingScoreInput").value;
  let directorName = document.getElementById("directorNameInput").value;
  let releaseDate = document.getElementById("releaseDateInput").value;
  //Adding the new movie review in collection movies
  db.collection("movies")
    .add({
      movieName: movieName,
      releaseDate: new Date(releaseDate),
      ratingScore: parseInt(ratingScore),
      directorName: directorName,
    })
    .then((docRef) => {
      //Console the success message and clear the input fields and re-fetch the new data
      console.log("Movie added with ID: ", docRef.id);
      document.getElementById("movieNameInput").value = "";
      document.getElementById("ratingScoreInput").value = "";
      document.getElementById("directorNameInput").value = "";
      document.getElementById("releaseDateInput").value = "";
      getMovieReviews();
    })
    .catch((error) => {
      //Console any errors and halt the process
      console.error("Error adding movie: ", error);
    });
  document.getElementById(
    `addBtn`
  ).innerHTML = `Add <i class="fas fa-plus"></i>`;
  document.getElementById(`addBtn`).removeAttribute("disabled");
}
//Function editMovieReview
async function editMovieReview(rowNumber, docID) {
  //Disabling the Edit Button to prevent overflow of requests
  document
    .getElementById(`updateRow${rowNumber}`)
    .setAttribute("disabled", true);
  //Extracting Details from the Table Rows which are editable
  let movieName = document
    .getElementById(`movieName${rowNumber}`)
    .textContent.trim();
  let ratingScore = document
    .getElementById(`ratingScore${rowNumber}`)
    .textContent.trim();
  let directorName = document
    .getElementById(`directorName${rowNumber}`)
    .textContent.trim();
  let releaseDate = new Date(
    document.getElementById(`releaseDate${rowNumber}`).textContent
  );
  console.log(movieName, ratingScore, releaseDate, directorName);
  //Updating the movie collection's document by matching it's id
  db.collection("movies")
    .doc(docID)
    .update({
      movieName: movieName,
      releaseDate: new Date(releaseDate),
      ratingScore: ratingScore,
      directorName: directorName,
    })
    .then(() => {
      //Console log success message and re-fetch the data
      console.log("Movie Review Updated");
      getMovieReviews();
    })
    .catch((error) => {
      //Console any errors and halt the process
      console.error("Error updating movie review:  ", error);
    });
  //Enabling the Edit Button
  document
    .getElementById(`updateRow${rowNumber}`)
    .setAttribute("disabled", false);
}
//Function deleteMovieReview
async function deleteMovieReview(rowNumber, docID) {
  //Disabling the Delete Button to prevent overflow of requests
  document
    .getElementById(`deleteRow${rowNumber}`)
    .setAttribute("disabled", true);
  //Delete the movie collection's document by matching it's id
  db.collection("movies")
    .doc(docID)
    .delete()
    .then(() => {
      //Console log success message and re-fetch the data
      console.log("Movie Review Deleted");
      getMovieReviews();
    })
    .catch((error) => {
      //Console any errors and halt the process
      console.error("Error deleting movie review:  ", error);
    });
  //Enabling the Delete Button to prevent overflow of requests
  document
    .getElementById(`deleteRow${rowNumber}`)
    .setAttribute("disabled", false);
}

//Sorting Functions here, by MovieName,Release Date, Rating Score, Director Name

function sortMovieReviewsByMovieName() {
  // Access the "movies" collection in the Firestore database
  db.collection("movies")
    // Sort the reviews by movie name in ascending order
    .orderBy("movieName", "asc")
    // Get the sorted reviews as a query snapshot
    .get()
    // Once the data is retrieved, do the following:
    .then((querySnapshot) => {
      // Get the HTML table element
      let table = document.getElementById("moviesTable");
      // Create the table header row with column names and a button to refresh the data
      table.innerHTML =
        "<tr><th>Movie Name</th><th>Rating Score</th><th>Director Name</th><th>Release Date</th><th><button type='button' class='btn btn-primary' onclick='getMovieReviews()'><i class='fas fa-sync'></i></button></th><th></th></tr>";
      // Use a counter variable to create unique IDs for each table row element
      let i = 0;
      // Loop through each review in the query snapshot
      querySnapshot.forEach((doc) => {
        // Get the movie name, rating score, director name, and release date from the review data
        let movieName = doc.data().movieName;
        let ratingScore = doc.data().ratingScore;
        let directorName = doc.data().directorName;
        let releaseDate = doc.data().releaseDate.toDate();
        // Format the release date as a localized string with month, day, and year
        releaseDate = releaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        // Create an HTML table row with editable cells for the review data and buttons to edit or delete the review
        let row = `<tr><td contenteditable id=movieName${i}>
          ${movieName}
          </td><td contenteditable id=ratingScore${i}>
          ${ratingScore}
          </td><td contenteditable id=directorName${i}>
          ${directorName}
          </td><td contenteditable id=releaseDate${i}>
          ${releaseDate} 
          </td></td>
          <td><button type='button' class='btn btn-warning' id='updateRow${i}' onclick=editMovieReview('${i}','${doc.id}')><i class='fas fa-pen'></i></button></td>
          <td><button type='button' class='btn btn-danger'id='deleteRow${i}' onclick=deleteMovieReview('${i}','${doc.id}')><i class='fas fa-trash'></i></button></td></tr>`;
        // Add the row to the table
        document.getElementById("moviesTable").innerHTML += row;
        // Increment the counter variable
        i++;
      });
    });
}

function sortMovieReviewsByRatingScore() {
  // Access the "movies" collection in the Firestore database
  db.collection("movies")
    // Sort the reviews by rating score in descending order
    .orderBy("ratingScore", "desc")
    // Get the sorted reviews as a query snapshot
    .get()
    // Once the data is retrieved, do the following:
    .then((querySnapshot) => {
      // Get the HTML table element
      let table = document.getElementById("moviesTable");
      // Create the table header row with column names and a button to refresh the data
      table.innerHTML =
        "<tr><th>Movie Name</th><th>Rating Score</th><th>Director Name</th><th>Release Date</th><th><button type='button' class='btn btn-primary' onclick='getMovieReviews()'><i class='fas fa-sync'></i></button></th><th></th></tr>";
      // Use a counter variable to create unique IDs for each table row element
      let i = 0;
      // Loop through each review in the query snapshot
      querySnapshot.forEach((doc) => {
        // Get the movie name, rating score, director name, and release date from the review data
        let movieName = doc.data().movieName;
        let ratingScore = doc.data().ratingScore;
        let directorName = doc.data().directorName;
        let releaseDate = doc.data().releaseDate.toDate();
        // Format the release date as a localized string with month, day, and year
        releaseDate = releaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        // Create an HTML table row with editable cells for the review data and buttons to edit or delete the review
        let row = `<tr><td contenteditable id=movieName${i}>
          ${movieName}
          </td><td contenteditable id=ratingScore${i}>
          ${ratingScore}
          </td><td contenteditable id=directorName${i}>
          ${directorName}
          </td><td contenteditable id=releaseDate${i}>
          ${releaseDate} 
          </td></td>
          <td><button type='button' class='btn btn-warning' id='updateRow${i}' onclick=editMovieReview('${i}','${doc.id}')><i class='fas fa-pen'></i></button></td>
          <td><button type='button' class='btn btn-danger'id='deleteRow${i}' onclick=deleteMovieReview('${i}','${doc.id}')><i class='fas fa-trash'></i></button></td></tr>`;
        // Add the row to the table
        document.getElementById("moviesTable").innerHTML += row;
        // Increment the counter variable
        i++;
      });
    });
}
function sortMovieReviewsByDirectorName() {
  // Access the "movies" collection in the Firestore database
  db.collection("movies")
    // Sort the reviews by director name in ascending order
    .orderBy("directorName", "asc")
    // Get the sorted reviews as a query snapshot
    .get()
    // Once the data is retrieved, do the following:
    .then((querySnapshot) => {
      // Get the HTML table element
      let table = document.getElementById("moviesTable");
      // Create the table header row with column names and a button to refresh the data
      table.innerHTML =
        "<tr><th>Movie Name</th><th>Rating Score</th><th>Director Name</th><th>Release Date</th><th><button type='button' class='btn btn-primary' onclick='getMovieReviews()'><i class='fas fa-sync'></i></button></th><th></th></tr>";
      // Use a counter variable to create unique IDs for each table row element
      let i = 0;
      // Loop through each review in the query snapshot
      querySnapshot.forEach((doc) => {
        // Get the movie name, rating score, director name, and release date from the review data
        let movieName = doc.data().movieName;
        let ratingScore = doc.data().ratingScore;
        let directorName = doc.data().directorName;
        let releaseDate = doc.data().releaseDate.toDate();
        // Format the release date as a localized string with month, day, and year
        releaseDate = releaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        // Create an HTML table row with editable cells for the review data and buttons to edit or delete the review
        let row = `<tr><td contenteditable id=movieName${i}>
          ${movieName}
          </td><td contenteditable id=ratingScore${i}>
          ${ratingScore}
          </td><td contenteditable id=directorName${i}>
          ${directorName}
          </td><td contenteditable id=releaseDate${i}>
          ${releaseDate} 
          </td></td>
          <td><button type='button' class='btn btn-warning' id='updateRow${i}' onclick=editMovieReview('${i}','${doc.id}')><i class='fas fa-pen'></i></button></td>
          <td><button type='button' class='btn btn-danger'id='deleteRow${i}' onclick=deleteMovieReview('${i}','${doc.id}')><i class='fas fa-trash'></i></button></td></tr>`;
        // Add the row to the table
        document.getElementById("moviesTable").innerHTML += row;
        // Increment the counter variable
        i++;
      });
    });
}

function sortMovieReviewsByReleaseDate() {
  // Access the "movies" collection in the Firestore database
  db.collection("movies")
    // Sort the reviews by release date in ascending order
    .orderBy("releaseDate", "asc")
    // Get the sorted reviews as a query snapshot
    .get()
    // Once the data is retrieved, do the following:
    .then((querySnapshot) => {
      // Get the HTML table element
      let table = document.getElementById("moviesTable");
      // Create the table header row with column names and a button to refresh the data
      table.innerHTML =
        "<tr><th>Movie Name</th><th>Rating Score</th><th>Director Name</th><th>Release Date</th><th><button type='button' class='btn btn-primary' onclick='getMovieReviews()'><i class='fas fa-sync'></i></button></th><th></th></tr>";
      // Use a counter variable to create unique IDs for each table row element
      let i = 0;
      // Loop through each review in the query snapshot
      querySnapshot.forEach((doc) => {
        // Get the movie name, rating score, director name, and release date from the review data
        let movieName = doc.data().movieName;
        let ratingScore = doc.data().ratingScore;
        let directorName = doc.data().directorName;
        let releaseDate = doc.data().releaseDate.toDate();
        // Format the release date as a localized string with month, day, and year
        releaseDate = releaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        // Create an HTML table row with editable cells for the review data and buttons to edit or delete the review
        let row = `<tr><td contenteditable id=movieName${i}>
          ${movieName}
          </td><td contenteditable id=ratingScore${i}>
          ${ratingScore}
          </td><td contenteditable id=directorName${i}>
          ${directorName}
          </td><td contenteditable id=releaseDate${i}>
          ${releaseDate} 
          </td></td>
          <td><button type='button' class='btn btn-warning' id='updateRow${i}' onclick=editMovieReview('${i}','${doc.id}')><i class='fas fa-pen'></i></button></td>
          <td><button type='button' class='btn btn-danger'id='deleteRow${i}' onclick=deleteMovieReview('${i}','${doc.id}')><i class='fas fa-trash'></i></button></td></tr>`;
        // Add the row to the table
        document.getElementById("moviesTable").innerHTML += row;
        // Increment the counter variable
        i++;
      });
    });
}

window.addEventListener("DOMContentLoaded", function () {
  getMovieReviews();
});
