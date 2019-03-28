// Was trying to dynamically create options for dropdown based on array

// var monthsObject = {
//     ValueA : 'January',
//     ValueB : 'February',
//     ValueC : 'March',
//     ValueD : 'April',
//     ValueE : 'May',
//     ValueF : 'June',
//     ValueG : 'July',
//     ValueH : 'August',
//     ValueI : 'September',
//     ValueJ : 'October',
//     ValueK : 'November',
//     ValueL : 'December'
// };

// var select = document.getElementById("months");
// for (index in monthsObject) {
//     select.option[select.option.length] = new Option(monthsObject[index], index);
// }

// var select = document.getElementById("months");
// var options = ["1", "2", "3", "4", "5"];
// for(var i = 0; i < options.length; i++) {
//     var opt = options[i];
//     console.log(opt);
//     var el = document.createElement("option");
//     el.textContent = opt;
//     // el.value = opt;
//     // select.appendChild(el);
// }

// var options = ["1", "2", "3", "4", "5"];
// $('#select').empty();
// $.each(options, function(i, p) {
//     $('#select').append($('<option></option>').val(p).html(p));
// });

$(document).ready(function(){

    var confirmationNumber = Math.floor(Math.random() * 1000000000);

    $("#purchase-card").css("display", "none");
    $("#submitted-card").css("display", "none");

    $("#pay-btn").on("click",function(){
        console.log("Button Pressed");
        $("#pay-btn").fadeOut(2000);
        setTimeout(function(){
            $("#purchase-card").fadeIn(2000);
        }, 2000);
        console.log(confirmationNumber);
    });

    $("#submit").on("click", function(e){
        e.preventDefault();
        $("#purchase-card").fadeOut(2000);
        setTimeout(function(){
            $("#submitted-card").fadeIn(2000);
        }, 2000);
        console.log("Payment Submitted")
        $("#confirmation-number").text("Confirmation Number: " + confirmationNumber);
    });
});
