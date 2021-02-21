$(document).ready(function () {
    $("#button").click(function () {
        $(".toDelete").remove();
        var limit = $("#limit").val();
        var type = $('input[name="type"]:checked').val();
        var score = $("#score").val();
        $.get("https://api.jikan.moe/v3/search/manga?type=" + type + "&limit=" + limit + "&score=" + score, function(data) {
            console.log(data);
            use(data, data.results.length);
        }, "json");
    })

    function use(data, count) {
        for(let i = 1; i <= count; i++){
            $( "ul" ).append("<li class='toDelete' id=" + i + "></li>");
            $( "#" + i).append("<label class='text'>Название на японском</label><br>");
            $( "#" + i).append("<label>" + data.results[i-1].title + "</label><br>");
            $( "#" + i).append("<img src=" + data.results[i-1].image_url + "><br>");
            $( "#" + i).append("<label class='text'>Оценка читателей</label><br>");
            $( "#" + i).append("<label>" + data.results[i-1].score + "</label><br>");
            $( "#" + i).append("<label class='text'>Количество глав</label><br>");
            $( "#" + i).append("<label>" + data.results[i-1].chapters + "</label><br>");
            $( "#" + i).append("<p><a href=" + data.results[i-1].url + ">Купить</a></p>");
        }
        $("#title_english1").text(data.title);
    }
})