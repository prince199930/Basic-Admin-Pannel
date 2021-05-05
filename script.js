async function getData() {
    const f = await fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
    const data = await f.json()
    console.log(data);
    var tb = document.getElementById("tbody");
    function putData(i) {
        search_data[data[i].firstName.toLowerCase()] = i;

        var data_row = document.createElement("tr");
        data_row.className = "data-row";
        data_row.setAttribute("id", i);
        data_row.addEventListener("click", (e) => description(e.target.id));
        data_row.addEventListener("click", (e) => activedata(e));
        var data_id = document.createElement("td");
        data_id.className = "column1";
        data_id.innerHTML = data[i].id;
        data_id.setAttribute("id", i);
        var data_FirstName = document.createElement("td");
        data_FirstName.className = "column2";
        data_FirstName.innerHTML = data[i].firstName;
        data_FirstName.setAttribute("id", i);
        var data_LastName = document.createElement("td");
        data_LastName.className = "column3";
        data_LastName.innerHTML = data[i].lastName;
        data_LastName.setAttribute("id", i);
        var data_Email = document.createElement("td");
        data_Email.className = "column4";
        data_Email.innerHTML = data[i].email;
        data_Email.setAttribute("id", i);
        var data_Phone = document.createElement("td");
        data_Phone.className = "column8";
        data_Phone.innerHTML = data[i].phone;
        data_Phone.setAttribute("id", i);
        data_row.appendChild(data_id);
        data_row.appendChild(data_FirstName);
        data_row.appendChild(data_LastName);
        data_row.appendChild(data_Email);
        data_row.appendChild(data_Phone);
        tb.appendChild(data_row);

    }
    let search_data = {}
    for (var i in data) {
        putData(i);
    }

    const description = (i) => {
        let desc_data = data[i]
        var user_selected = document.getElementById("user_sel");
        user_selected.innerHTML = `<b>UserSelected : </b>  ${data[i].firstName}  ${data[i].lastName}`;
        var user_desc = document.getElementById("txt");
        user_desc.innerHTML = `${data[i].description}`
        var address = document.getElementById("address");
        address.innerHTML = `<b>Address : </b> ${data[i].address.streetAddress}`
        var city = document.getElementById("city");
        city.innerHTML = `<b>city : </b>  ${data[i].address.city}`
        var ziy = document.getElementById("ziy");
        ziy.innerHTML = `<b>Ziy : </b>'  ${data[i].address.zip}`;
        var state = document.getElementById("state");
        state.innerHTML = `<b>State : ${data[i].address.state}`


    }
    function activedata(e) {
        e.target.parentNode.style.backgroundColor = "#d4c0e5";
        removeBackgroundColor(e.target);
    }

    var removeBackgroundColor = function (elem) {
        var all = elem.parentNode.parentNode.children;

        for (var j in all) {
            var x = all[j]
            if (x != elem.parentNode) {
                x.style.backgroundColor = '';
            }
        }
    }

    document.getElementById("search-box").addEventListener("keyup", (e) => searchfucn(e.target.value.toLowerCase()));
   
    function searchfucn(d) {
        var searchRow = Object.keys(search_data).filter((k) => k.includes(d) === true)
        tb.innerHTML = ""
        for (i of searchRow) {
            putData(search_data[i])
        }
    }

    
}
getData();