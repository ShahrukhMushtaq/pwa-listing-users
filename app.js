if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(function (res) {
            console.log('serviceWoker registered successfully', res.scope);
        })
        .catch(function (err) {
            console.log("serviceWorker not supported", err);
        })
}

function getUsers() {
    fetch('https://api.github.com/users')
        .then(function (result) {
            console.log(result);
            return result.json();
        })
        .then(function (user) {
            console.log(user);
            var table = document.getElementById("myTable");
            for (var i = 0; i < user.length; i++) {
                var row = table.insertRow(i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);

                cell1.innerHTML = user[i].id;
                cell2.innerHTML = user[i].login;
                cell3.innerHTML = user[i].node_id;
                cell4.innerHTML = user[i].followers_url;
                cell5.innerHTML = user[i].type;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}