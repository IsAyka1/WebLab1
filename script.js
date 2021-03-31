$(document).ready(function () {

    async function GetStuff() {
        // отправляет запрос и получаем ответ
        const response = await fetch("/stuff", {
            method: "GET",
            headers: {"Accept": "application/json"}
        });
        // если запрос прошел нормально
        if (response.ok === true) {
            // получаем данные
            const stuff = await response.json();
            let rows = document.querySelector("tbody");
            stuff.forEach(one => {
                // добавляем полученные элементы в таблицу
                rows.append(row(one));
            });
        }
    }

    async function GetOne(id) {
        const response = await fetch("/stuff/" + id, {
            method: "GET",
            headers: {"Accept": "application/json"}
        });
        if (response.ok === true) {
            const one = await response.json();
            const form = document.forms["userForm"];
            form.elements["id"].value = one.id;
            form.elements["name"].value = one.name;
            form.elements["price"].value = one.price;
        }
    }

    async function CreateOne(stuffName, stuffPrice) {
        alert("here");
        const response = await fetch("/stuff", {
            method: "POST",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({
                name: stuffName,
                price: parseInt(stuffPrice, 10)
            })
        });
        if (response.ok === true) {
            const one = await response.json();
            reset();
            document.querySelector("tbody").append(row(one));
        }
    }

    async function EditOne(stuffId, stuffName, stuffPrice) {
        const response = await fetch("/stuff", {
            method: "PUT",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({
                id: stuffId,
                name: stuffName,
                price: parseInt(stuffPrice, 10)
            })
        });
        if (response.ok === true) {
            const one = await response.json();
            reset();
            document.querySelector("tr[data-rowid='" + one.id + "']").replaceWith(row(one));
        }
    }

    async function DeleteOne(id) {
        const response = await fetch("/stuff/" + id, {
            method: "DELETE",
            headers: {"Accept": "application/json"}
        });
        if (response.ok === true) {
            const one = await response.json();
            document.querySelector("tr[data-rowid='" + one.id + "']").remove();
        }
    }

// создание строки для таблицы
    function row(one) {

        const tr = document.createElement("tr");
        tr.setAttribute("data-rowid", one.id);

        const idTd = document.createElement("td");
        idTd.append(one.id);
        tr.append(idTd);

        const nameTd = document.createElement("td");
        nameTd.append(one.name);
        tr.append(nameTd);

        const ageTd = document.createElement("td");
        ageTd.append(one.price);
        tr.append(ageTd);

        const linksTd = document.createElement("td");

        const editLink = document.createElement("a");
        editLink.setAttribute("data-id", one.id);
        editLink.setAttribute("style", "cursor:pointer;padding:15px;");
        editLink.append("Изменить");
        editLink.addEventListener("click", e => {

            e.preventDefault();
            GetOne(one.id);
        });
        linksTd.append(editLink);

        const removeLink = document.createElement("a");
        removeLink.setAttribute("data-id", one.id);
        removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
        removeLink.append("Удалить");
        removeLink.addEventListener("click", e => {

            e.preventDefault();
            DeleteOne(one.id);
        });

        linksTd.append(removeLink);
        tr.appendChild(linksTd);

        return tr;
    }

// сброс значений формы
    $("#reset").click(function (e) {
    alert("here");
        e.preventDefault();
        reset();
    })

// сброс формы
    function reset() {
        const form = document.forms["stuffForm"];
        form.reset();
        form.elements["id"].value = 0;
    }

// отправка формы
    document.forms["stuffForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["stuffForm"];
        const id = form.elements["id"].value;
        const name = form.elements["name"].value;
        const price = form.elements["price"].value;
        if (id == 0)
            CreateOne(name, price);
        else
            EditOne(id, name, price);
    });

    GetStuff();
});
