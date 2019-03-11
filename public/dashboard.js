fetch('/data')
.then((resp) => resp.json()) // Transform the data into json
.then(function(data) {
document.getElementById("first").innerText=data.hamada
    
    })