$(document).ready(function(){

    $('.modal').modal();
    $('.carousel').carousel();
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav();
    $('.onload-div').on("click",function(){
        $('.hide-on-load').show()
        $(this).hide(function(){
            $('body').css("background-image", "url('https://static.pexels.com/photos/87390/chilli-pepper-sharp-spices-laos-87390.jpeg')");


        })

    })


});
