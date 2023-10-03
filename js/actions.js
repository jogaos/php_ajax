function searchId(newId) {

    txtIdMessage = document.getElementById("idMessage");
    txtNewId = document.getElementById("id");
    btnSaveStudent = document.getElementById("sendStudentData");

    if (newId.length == 0) {
        txtNewId.innerHTML = "";
        txtIdMessage.innerHTML = "";
        btnSaveStudent.disabled = true;
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                response = JSON.parse(this.responseText);

                if (response.success) {
                    txtIdMessage.classList.add("warning");
                    txtIdMessage.classList.remove("success");
                    btnSaveStudent.disabled = true;
                } else {
                    txtIdMessage.classList.add("success");
                    txtIdMessage.classList.remove("warning");
                    btnSaveStudent.disabled = false;
                }
                txtIdMessage.innerHTML = response.message;
            }
        };
        xmlhttp.open("GET", "backend/searchNewId.php?newId=" + newId, true);
        xmlhttp.send();
    }

}

function sendData() {
    newId = document.getElementById("id").value;
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    type = document.getElementById("type").value;

    var data = {id: newId, firstName: firstName, lastName: lastName, type: type};

    mdlMessage = document.getElementById("messageModal");

    txtmdlMessage = document.getElementById("mdlMessage");
    txtmdlSuccess = document.getElementById("mdlSuccess");

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);

            txtmdlSuccess.value = response.success;
            txtmdlMessage.innerHTML = response.message;
        }
    };
    xmlhttp.open("POST", "process.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
}

function cleanData() {
    mdlSuccess = document.getElementById("mdlSuccess").value;
    type = document.getElementById("type").value;
    console.log(type);
    if (type == "1") {
        if (mdlSuccess == "true") {
            document.getElementById("idMessage").innerHTML = "";
            document.getElementById("id").value = "";
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
        }
    } else {
        location.href = "read.php";
    }
}