# Movies App with Firebase CRUD

This is a simple Movies app that uses Firebase for CRUD operations. It allows you to add, update, delete, and view movies. The app is built using basic HTML, CSS, and JavaScript, and it uses the Firebase CDN for Firebase functionality in its JavaScript file.

Technologies Used:
HTML
CSS
JavaScript
Firebase

Functionality:
The Movies app allows you to perform the following CRUD operations:

Create: Add a new movie to the database by providing the movie's title, director name, release date, and rating (out of 5).
Read: View a list of all movies in the database.
Update: Edit the details of an existing movie by providing the updated movie's title, director name, release date, and rating (out of 5).
Delete: Remove a movie from the database by clicking the delete button next to the movie in the list.

Database:
The app uses Firestore, a NoSQL document-based database, to store and retrieve movie data. Each movie is stored as a document in the movies collection, with fields for title, director, releaseDate, description, and rating.

Usage:
To use the Movies app, simply open the 1ndex. htmi file in your web browser. The app will load and connect to the Firebase database. You can then add, view, update, and delete movies using the simple user interface.
Deployment
The Movies app can be deployed to any web hosting platform that supports basic HTML, CSS, and JavaScript files. Simply upload the app files to your hosting provider, and the app will be accessible from any web browser.

Google Firebase steps:
Create collection:

![image](https://github.com/masbts/firebase/assets/124617295/69a18c05-4670-4332-b88a-08318b694a98)


Add document then saving.

 ![image](https://github.com/masbts/firebase/assets/124617295/b5de10d7-92e9-4051-85fe-bd1c53241470)

Add our firebase details into JS file
// Initialize Firebase const firebaseConfig = {   apiKey: "AIzaSyCGVcQux9GmVmYqFDITaLT9tMqq5AIiPfo",   authDomain: "movies-f2aee.firebaseapp.com",   projectId: "movies-f2aee",   storageBucket: "movies-f2aee.appspot.com",   messagingSenderId: "166473880027",   appId: "1:166473880027:web:d35a10860d32c4156257fe",   measurementId: "G-6G5WTF8Q23", };
Runing local host and add movies:

![image](https://github.com/masbts/firebase/assets/124617295/7170e86a-dc7a-42f1-96b1-c5f3a4722140)


  Movie added
![image](https://github.com/masbts/firebase/assets/124617295/019c9ce0-65d4-4b5c-9a4b-15f867b36119)

Ability to delete movie

![image](https://github.com/masbts/firebase/assets/124617295/a35d6f4c-ca15-46ca-91fb-6ad4df142483)



Conclusion
The Movies app is a simple yet powerful example of how to use Firebase for CRUD operations in a web application. It demonstrates how easy it is to create a robust database-backed app with basic web technologies and Firebase.

