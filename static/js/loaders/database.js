

function Get_Data(){
    console.log($("#money").attr("value"));
    console.log($("#level").attr("value"));
}

function Send_Data(){
    $(document).ready(function(){
        POSTInWebRefresh("")
        //$("#save").click();
    });
}

//https://stackoverflow.com/questions/52895738/how-to-comunicate-python-mysql-and-js-with-ajax
//https://www.footmark.info/programming-language/php/ajax-javascript-jquery-example-php/

//得到數據
function GETInWebRefresh(url) {
    $.ajax({
        type: "GET",
        url: url,
        data: JSON.stringify(Adata),
        dataType: "html",
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
        },
        error: function (jqXHR) {
            alert("發生錯誤: " + jqXHR.status);
        }
    });
}
//存檔數據
function POSTInWebRefresh(url) {
    Adata = {
            "money": $("#money").attr("value"),
            "level": $("#level").attr("value")          
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(Adata),
        dataType: "html",
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
        },
        error: function (jqXHR) {
            alert("發生錯誤: " + jqXHR.status);
        }
    });
}
