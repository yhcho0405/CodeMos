const serverAddress = "http://13.114.181.168:8080"

var page = 0
var savedBoard

const urls = [
    "/api/ranking",
    "/leaderboard?pageno=",
    "/leaderboard/",
]
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
            leaderboards = data.content
            for(var i = 0; i < leaderboards.length; i++){
                leaderboards[i].score /= 100000 
            }
            savedBoard = leaderboards
            //data.sort((a,b) => a.score - b.score)
            console.log("Received data:")
            console.log(leaderboards)
            resolve(leaderboards)
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
                    details.innerHTML = `<td colspan = "4">
                    <p>Codes</p>
                    <pre><code class='language-javascript'>${result}</code></pre>
                    </td>`
                    /*var detail = document.createElement('td')
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
                    code.textContent = result.slice(1, -1);*/
                })
                
            })
            //detail 누르면 그 때 코드 받아오도록 하는 설정
        }        
    }
}
function loadBoard(urlOp, pageMoveBy){
    var apiUrl = urls[urlOp]
    if (urlOp == 1) {
        newPage = page + pageMoveBy
        if(newPage > 9 || newPage < 0) return
        apiUrl += String(newPage)
    }
    getBoard(apiUrl).then(result => {
        if (result.length == 0 && urlOp == 1){
            console.log('page is empty')
            return
        }
        page += pageMoveBy
        setBoard(result, true)
    })
    .catch(error => {
        console.log('Error', error)
    })   
}

loadBoard(page, 0)