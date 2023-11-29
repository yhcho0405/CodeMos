const serverAddress = "http://13.114.181.168:8080"

var page = 1
var saved

const urls = [
    "/api/ranking",
    "/leaderboard?pageno="
    //코드 가져오기용 url
    //이름 검색용 url
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
            console.log('response:')
            console.log(response)
            return response.json()
        })
        .then((data) => {
            saved = data.content
            //data.sort((a,b) => a.score - b.score)
            console.log("Received data:")
            console.log(data.content)
            resolve(data.content)
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
        td1.textContent = i + 1
        td2.textContent = boardData[i].nickname
        td3.textContent = boardData[i].score / 100000
        //td4.textContent = boardData[i].time + " s"

        // show codes of each row
        if(boardData[i].rank > 10){
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
                /*getBoard(urls[2] + codeID).then(result => {
                    var detail = document.createElement('td')
                    details.appendChild(detail)
                    detail.colSpan = 4
                    var code = document.createElement('p')
                    detail.appendChild(code)
                    code.textContent = "Codes"
                    var codes = document.createElement('p')
                    code.appendChild(codes)
                    codes.textContent = `${result.codes}`
                    var date = document.createElement('p')
                    detail.appendChild(date)
                    date.textContent = `Date: ${result.date}` 
                })*/
                
            })
            //detail 누르면 그 때 코드 받아오도록 하는 설정
        }        
    }
}
function loadBoard(urlNum, pageV){
    var apiUrl = urls[urlNum]
    if (urlNum == 1) apiUrl += String(page + pageV)
    //if url 설정에 페이지 관련 있음 => 현재 페이지 맞춰서 apiUrl 새로 만들어 전달
    getBoard(apiUrl).then(result => {
        if (result.length == 0 && urlNum == 1){
            return
        }
        page += pageV
        //if result가 있고 url이 페이지 설정이면 페이지 값 증가/감소(url 값에 따라서), 없다면 페이지 값 그대로
        setBoard(result, true)
    })
    .catch(error => {
        console.log('Error', error)
    })   
}
function search(){
    var input = document.getElementById('search-box').value
    if (input === '' && saved != null){
        setBoard(saved, true)
        return
    } else if (input === ''){
        loadBoard(page, 0)
    }

    var url = urls[3] + input
    //loadBoard(url)
    //if input === '' && 현재 저장해둔 데이터 있음(typeof가 undefined가 아니거나 값이 null이 아니거나)
    // => 저장해둔 값 호출, 저장해둔 건 없다면 현재 페이지 loadboard(), return

    //var url = urls[] ~~~ + input
    //loadBoard(url)
    // 입력값을 urls[search 관련]과 합쳐서 loadBoard 호출
}

loadBoard(1, 0)