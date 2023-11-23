const serverAddress = "http://127.0.0.1:3000"

var page = 1
var getData

var board = document.getElementById("board");
var table = document.createElement('table');
table.style.width = "60%";
table.style.marginLeft = "auto"
table.style.marginRight = "auto"
board.appendChild(table)
var thead = document.createElement('thead')
var tbody = document.createElement('tbody')
table.appendChild(thead)
table.appendChild(tbody)

thead.innerHTML = "<tr><td>Rank</td><td>Name</td><td>Score</td><td>Time</td></tr>"

function getBoard(){
    var ret = fetch(serverAddress + "/api/ranking",{
        method: "GET",
        body: null
    })
    .then((response) => {
        if(!response.ok){
            throw new Error('Network error')
        }
        return response.json()
    })
    .then((data) => {
        data.sort((a,b) => a.rank - b.rank)
        console.log("Received data:")
        console.log(data)
        getData = data
    })
    .catch(() => {
        console.log('Network Error')
    })
    return ret
}
function setBoard(boardData){
    console.log("Process for: ")
    console.log(boardData)

    tbody.innerHTML = ""

    for(var i = 0; i < boardData.length; i++){
        var tr = document.createElement('tr')
        tr.style.cursor = 'pointer'
        tr.setAttribute('num', i)
        tr.classList.add('row')
        tbody.appendChild(tr)
        var td1 = document.createElement('td')
        tr.appendChild(td1)
        var td2 = document.createElement('td')
        tr.appendChild(td2)
        var td3 = document.createElement('td')
        tr.appendChild(td3)
        var td4 = document.createElement('td')
        tr.appendChild(td4)
        td1.textContent = boardData[i].rank
        td2.textContent = boardData[i].uid
        td3.textContent = boardData[i].score
        td4.textContent = boardData[i].time + " s"

        // show codes of each row
        if(boardData[i].rank > 10){
            var toggle = document.createElement('tr')
            toggle.classList.add('details')
            toggle.classList.add('details-hide')
            toggle.setAttribute('num', i)
            toggle.classList.add
            tbody.appendChild(toggle)
            var detail = document.createElement('td')
            toggle.appendChild(detail)
            detail.colSpan = 4
            var code = document.createElement('p')
            detail.appendChild(code)
            code.textContent = "Codes"
            var codes = document.createElement('p')
            code.appendChild(codes)
            codes.textContent = `${boardData[i].codes}`
            var date = document.createElement('p')
            detail.appendChild(date)
            date.textContent = `Date: ${boardData[i].date}`

            //detail.innerHTML = `<p>"Codes"<p>${getData[i].codes}</p></p>`
            //detail.innerHTML += `<p>Date: ${getData[i].date}`
            //var codes = document.querySelector("p p")
            //codes.style.margin = "0 20px"
            tr.addEventListener('click', function () {
                const details = this.nextElementSibling
                details.classList.toggle('details-hide')
            })
        }        
    }
}
function toLeft(){
    page--
    if(page <= 0) page = 1
    loadBoard()
}
function toRight(){
    page++
    if(page > 10) page = 10
    loadBoard()
}
function loadBoard(){
    var dd = getBoard()
    console.log(dd)
    setTimeout(() => {
        setBoard(getData)
    }, 100);
}

loadBoard()