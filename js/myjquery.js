function getData() {
    $.ajax({
        url: "http://localhost:49300/api/ForwardRate/GetForwardRate",
        async: false,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        cache: false,
        success: function (result) {
            $("#ForwardRateMaster").empty();
            $.each(result, function (key, item) {
                $("#ForwardRateMaster").append("<tr><td>" + item.SNo + "</td><td>" + item.ForwardRateTo + "</td><td>"
                    + item.CityName + "</td><td>"
                    + item.ZipCode + "</td><td>" + item.CommodityName + "</td><td>" + item.RefNo + "</td><td>" + item.ValidTo + "</td><td>" + item.ValidFrom +
                    "</td><td>  <button id='edit' onclick='EditRecord(" + item.SNo + ")'>Edit</button> <button id='delete'  onclick='DeleteRecord(" + item.SNo + ")'>Delete</button> </td></tr>")

            });

        }
    })
}



//clear
function clear() {
    $("#myForm").click(function () {
        $("#myForm").reset();
    });
}

//Edit
function EditRecord(item) {
    $.ajax({
        url: "http://localhost:49300/api/ForwardRate/GetForwardRates/" + item,
        type: "Get",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {

            Sno = data.SNo;
            $("#txtCityName").val(data.CityName);

            $("input[name='radioName'][value=" + data.ForwardRateTo + "]").prop('checked', true);
            $("#txtCommmodityName").val(data.CommodityName);
            $("#txtZipCode").val(data.ZipCode);
            $("#txtRefNo").val(data.RefNo);
           // debugger
            $('#dateinput1').val(data.ValidTo);
            $('#dateinput').val(data.ValidFrom);
            getData();
            //console.log(data);
        },
        error: function (msg) {
            alert(msg);
        }
    })
}

//delete
function DeleteRecord(SNo) {
    if (confirm("SNo " + SNo + " " + "is deleted?")) {
        $.ajax({
            url: "http://localhost:49300/api/ForwardRate/DeleteForwardRate/" + SNo,
            type: "Delete",
            dataType: "json",
            success: function () {
                getData();
            }
        })
    }
    else {
        alert("SNo " + SNo + " is not deleted?")
    }
}