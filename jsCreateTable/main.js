var data = [
    ["xy", 1, 2, 3],
    ["as", 4, 5, 6]
];

var database = {
    className: ["name", "math", "chinese", "english"],
    data:data

}

function createTable(database) {
    //<table>
    var table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "500px";
    table.style.textAlign = "center";

    //<tr><th>
    var thead = document.createElement("tr");
    for (var i in database.className) {
        var th = document.createElement("th");
        th.style.padding = "20px 0";
        th.style.color = "#fff";
        th.style.background = "#555";
        th.style.border = "2px solid #ddd";
        var text = document.createTextNode("" + database.className[i]);
        th.appendChild(text);
        thead.appendChild(th);
    }
    table.appendChild(thead);

    //<tr><td>
    for (var i in database.data) {
        var tr = document.createElement("tr");
        for (var j in database.data[i]) {
            var td = document.createElement("td");
            td.style.padding = "10px 0";
            td.style.border = "2px solid #ddd";
            var text = document.createTextNode("" + database.data[i][j]);
            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    

    document.getElementById("container").appendChild(table);
}

//createTable(database);
console.log(database.data[1][2]);