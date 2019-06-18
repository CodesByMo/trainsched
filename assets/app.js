$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyAPYc3TO7Fgaonq-9naNu_8MB5qVuSip2g",
        authDomain: "train-schedule-homework-33246.firebaseapp.com",
        databaseURL: "https://train-schedule-homework-33246.firebaseio.com",
        projectId: "train-schedule-homework-33246",
        storageBucket: "train-schedule-homework-33246.appspot.com",
        messagingSenderId: "785409389571",
        appId: "1:785409389571:web:f631a4c0aae3d595"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //////////////////////////////////////////////////////////////////
    // use array object to store inputs from input form, save in DB & populate currentTrains table. Add input val/text on submit to array as an object

    // var trainDiv = $("#trainInfo").append("#trainBody);

    var dbRecord;

    database.ref().on("child_added", function (snapshot) {
        var name = snapshot.name;
        // console.log(snapshot);

    });

    ;

    //////////////////////////////////////////////////////////////////


    $(".submitButton").on("click", function () {


        var name = $("#addTrainName").val();
        var destination = $("#trainDest").val();
        var nextArrival = $("#trainTime").val();
        var frequency = $("#trainFreq").val();

        console.log(name);
        console.log(destination);
        console.log(nextArrival);
        console.log(frequency);

        database.ref().push({
            name: name,
            destination: destination,
            nextArrival: nextArrival,
            frequency: frequency,
        });

        $("#addTrainName").val("");
        $("#trainDest").val("");
        $("#trainTime").val("");
        $("#trainFreq").val("");

        function populateTable() {
            // clear table
            $("#trainBody").empty();
            // loop through data

            // append <TR> to <TBODY>
            $("#trainBody").append("<td>" + name + "</td>");
            $("#trainBody").append("<td>" + destination + "</td>");
            $("#trainBody").append("<td>" + nextArrival + "</td>");
            $("#trainBody").append("<td>" + frequency + "</td>");

        }

        populateTable();


    });





    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    // use data to build info in database from input. 
    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function (snapshot) {

        // Then we console.log the value of snapshot
        // console.log(snapshot.val());

        var name = $("#addTrainName").val();
        var destination = $("#trainDest").val();
        var nextArrival = $("#trainTime").val();
        var frequency = $("#trainFreq").val();

        $("#trainBody").append("<td>" + name + "</td>");
        $("#trainBody").append("<td>" + destination + "</td>");
        $("#trainBody").append("<td>" + nextArrival + "</td>");
        $("#trainBody").append("<td>" + frequency + "</td>");

        // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
        // Again we could have named errorObject anything we wanted.
        console.log(snapshot);

    }, function (errorObject) {

        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
        database.ref().push(snapshot);

    });

})
