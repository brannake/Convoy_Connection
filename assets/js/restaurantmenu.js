$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCYUONSm_e9oy0i8PJPaKIbA-cXEXHCqwk",
        authDomain: "convoyconnection.firebaseapp.com",
        databaseURL: "https://convoyconnection.firebaseio.com",
        projectId: "convoyconnection",
        storageBucket: "convoyconnection.appspot.com",
        messagingSenderId: "682523460431"
    };
    localStorage.setItem("firebase-config",JSON.stringify(config))
    firebase.initializeApp(JSON.parse(localStorage.getItem("firebase-config")));
    var database =firebase.database();

    function adjustTDMenu(key,menu){
        var item=""
        var food = Object.keys(menu[key])
        var price = Object.values(menu[key])
            item = "<td>"+food + "</td><td>" + price + "</td>"
        return item
    }


    $(".restaurants-collection").on("click", ".collapsible-header",function(){
        var max_columns=2
        var count=0
        var selector = "#menu-entries-"+ $(this).attr("res-id")
        $(selector).html("")
        database.ref( $(this).attr("res-id") +"/").on("value",function(menu) {
            if (!menu.val()){
                $('.menu-msg').html("Menu coming soon")
            }else{
                $('.menu-msg').html("")
                for(key in menu.val()){
                    var content = adjustTDMenu(key,menu.val())
                    if(count == max_columns || !$(selector).children().length){
                        $(selector).append("<tr>")
                        count=0
                    }
                    if(count!=max_columns){
                        $(selector+" tr:last").append(content)
                        count++
                    }else{
                        $(selector+" tr:first").append(content)
                        count++
                    }
                }
            }
        })
    })
})
