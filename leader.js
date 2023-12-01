serverAddress = "http://18.179.38.25:8080"

var page = 0
var savedBoard

const urls = [
    "/leaderboard?pageno=",
    "/leaderboard/",
]
var board = document.getElementById("board");
var table = document.createElement('table');
table.style.width = "500px";
table.style.marginLeft = "auto"
table.style.marginRight = "auto"
table.style.backgroundColor = "#0a0f1c"; // 어두운 네이비 색상
table.style.color = "#fff"; // 흰색 텍스트
table.style.borderRadius = "10px"; // 둥근 모서리
table.style.borderCollapse = "collapse"; // 테두리 겹침 방지
table.style.border = "1px solid white";

board.appendChild(table)
var thead = document.createElement('thead')
var tbody = document.createElement('tbody')
table.appendChild(thead)
table.appendChild(tbody)

thead.innerHTML = "<tr><td>순위</td><td>이름</td><td>점수</td><td>걸린 시간</td></tr>"
var ths = thead.getElementsByTagName("td");
for (var i = 0; i < ths.length; i++) {
    ths[i].style.border = "1px solid #2e9cca"; // 네온 스타일 테두리
    ths[i].style.backgroundColor = "#1c223a"; // 어두운 배경색
    ths[i].style.padding = "5px"; // 셀 패딩
}
loadBoard(0, 0)

document.addEventListener('DOMContentLoaded', function () {
    var currentPath = window.location.pathname
    history.replaceState(null, null, currentPath.replace('.html', ''))
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
            if(typeof(data) == 'string'){
                resolve(data)
            }
            leaderboards = data.content
            for(var i = 0; i < leaderboards.length; i++){
                leaderboards[i].score /= 100000 
            }
            savedBoard = leaderboards
            //data.sort((a,b) => a.score - b.score)
            resolve(leaderboards)
        })
        .catch((error) => {
            reject(error)
        })
    })
        
}
function setBoard(boardData){
    tbody.innerHTML = ""

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
        tr.style.border = "1px solid white";
        tbody.appendChild(tr)
        var td1 = document.createElement('td')
        td1.style.border = "1px solid #2e9cca"; // 네온 스타일 테두리
        td1.style.padding = "5px"; // 셀 패딩
        tr.appendChild(td1)
        var td2 = document.createElement('td')
        td2.style.border = "1px solid #2e9cca"; // 네온 스타일 테두리
        td2.style.padding = "5px"; // 셀 패딩
        tr.appendChild(td2)
        var td3 = document.createElement('td')
        td3.style.border = "1px solid #2e9cca"; // 네온 스타일 테두리
        td3.style.padding = "5px"; // 셀 패딩
        tr.appendChild(td3)
        var td4 = document.createElement('td')
        td4.style.border = "1px solid #2e9cca"; // 네온 스타일 테두리
        td4.style.padding = "5px"; // 셀 패딩
        tr.appendChild(td4)
        td1.textContent = (page) * 10 + i + 1
        td2.textContent = boardData[i].nickname
        td3.textContent = boardData[i].score
        td4.textContent = boardData[i].time + " s"

        // show codes of each row
        if((page) * 10 + i + 1 > 10){
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
                getBoard(urls[1] + codeID).then(result => {
                    details.innerHTML = `<td colspan = "4">
                    <p>코드</p>
                    <pre><code class='language-javascript'>${result}</code></pre>
                    </td>`
                })
                
            })
        }        
    }
}
function loadBoard(urlOp, pageMoveBy){
    var apiUrl = urls[urlOp]
    if (urlOp == 0) {
        newPage = page + pageMoveBy
        if(newPage > 9 || newPage < 0) return
        apiUrl += String(newPage)
    }
    getBoard(apiUrl).then(result => {
        if (result.length == 0 && urlOp == 0){
            console.log('page is empty')
            return
        }
        page += pageMoveBy
        setBoard(result)
    })
    .catch(error => {
        console.log('Error', error)
    })   
}

