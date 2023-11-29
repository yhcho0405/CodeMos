const serverAddress = "http://13.114.181.168:8080"

var page = 0
var saved

const urls = [
    "/api/ranking",
    "/leaderboard?pageno=",
    "/leaderboard/",
]

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

document.addEventListener('DOMContentLoaded', function () {
    var currentPath = window.location.pathname
    history.pushState(null, null, currentPath.replace('.html', ''))
})

function getBoard(url){
    return new Promise((resolve, reject) => {
        fetch(serverAddress + url,{
            method: "GET",
            body: null
        })
        .then((response) => {
            if(!response.ok){
                throw new Error(response.status)
            }
            const contentType = response.headers.get('Content-Type');
            console.log('response:')
            console.log(contentType)
            //console.log(response.text())
            if(!contentType){
                throw new Error('no content type')
            } else if (contentType.includes('application/json')){
                return response.json()
            } else if (contentType.includes('text/plain')){
                return response.text()
            } else {
                throw new Error('cannot handle response')
            } 
        })
        .then((data) => {
            console.log(typeof(data))
            if(typeof(data) == 'string'){
                resolve(data)
            }
            leaderBoards = data.content
            for(var i = 0; i < leaderBoards.length; i++){
                leaderBoards[i].score /= 100000 
            }
            saved = leaderBoards
            //data.sort((a,b) => a.score - b.score)
            console.log("Received data:")
            console.log(leaderBoards)
            resolve(leaderBoards)
        })
        .catch((error) => {
            reject(error)
        })
    })
        
}
function setBoard(boardData, reset){
    console.log("Process for: ")
    console.log(boardData)

    if(reset) tbody.innerHTML = ""

    if(boardData.length == 0){
        var tr = document.createElement('tr')
        table.appendChild(tr)
        var td = document.createElement('td')
        tr.appendChild(td)
        td.colSpan = 4
        td.style.height = "200px"
        td.textContent = "No Results"
        return
    }

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
        td1.textContent = (page) * 10 + i + 1
        td2.textContent = boardData[i].nickname
        td3.textContent = boardData[i].score
        td4.textContent = boardData[i].time + " s"

        // show codes of each row
        if((page) * 10 + i + 1 > 0){
            var toggle = document.createElement('tr')
            toggle.classList.add('details')
            toggle.classList.add('details-hide')
            toggle.setAttribute('id', boardData[i].id)
            toggle.classList.add
            tbody.appendChild(toggle)
            tr.addEventListener('click', function () {
                const details = this.nextElementSibling
                details.classList.toggle('details-hide')
                codeID = details.getAttribute('id')
                if(details.children.length > 0){
                    return
                }
                getBoard(urls[2] + codeID).then(result => {
                    var detail = document.createElement('td')
                    details.appendChild(detail)
                    detail.colSpan = 4
                    var codeTitle = document.createElement('p')
                    detail.appendChild(codeTitle)
                    codeTitle.textContent = "Codes"
                    var codes = document.createElement('pre')
                    detail.appendChild(codes)
                    var code = document.createElement('code')
                    codes.appendChild(code)
                    code.classList.add('language-javascript')
                    code.textContent = result.slice(1, -1);
                })
                
            })
            //detail 누르면 그 때 코드 받아오도록 하는 설정
        }        
    }
}
function loadBoard(urlNum, pageV){
    var apiUrl = urls[urlNum]
    if (urlNum == 1) {
        num = page + pageV
        if(num > 9) num = 9
        if(num < 0) num = 0
        apiUrl += String(num)
    }
    //if url 설정에 페이지 관련 있음 => 현재 페이지 맞춰서 apiUrl 새로 만들어 전달
    getBoard(apiUrl).then(result => {
        if (result.length == 0 && urlNum == 1){
            console.log('page is empty')
            return
        }
        page += pageV
        if(page > 9) page = 9
        if(page < 0) page = 0
        //if result가 있고 url이 페이지 설정이면 페이지 값 증가/감소(url 값에 따라서), 없다면 페이지 값 그대로
        setBoard(result, true)
    })
    .catch(error => {
        console.log('Error', error)
    })   
}

loadBoard(page, 0)