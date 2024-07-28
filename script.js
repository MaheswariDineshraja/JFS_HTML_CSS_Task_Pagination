let refData = {
    pageData: [],
    page: 1,
    rows: 10
}

// H1
const h1Ele = document.createElement('h1');

h1Ele.innerText = 'Pagination';

h1Ele.id = 'title';

// paragraph
const pELe = document.createElement('p');

pELe.innerText = 'Paginating 100 data for easy readability';

pELe.id = 'description';

//Main Div
const mainSection = document.createElement("div");
mainSection.className = 'table-responsive';
mainSection.setAttribute("id","mainSection");

// table
const table = document.createElement("table");
table.className = 'table table-bordered';
table.id = 'table'

// thead
const  thead = document.createElement("thead");
thead.className = 'table table-bordered table-dark';
thead.id = 'thead-light';

// tr
const tr = document.createElement("tr");
const th1 = createElement("th","ID");
const th2 = createElement("th","NAME");
const th3 = createElement("th","EMAIL");
tr.append(th1,th2,th3);
thead.append(tr);
table.append(thead);

document.body.style.textAlign = 'center'
document.body.append(h1Ele, pELe,mainSection);
mainSection.append(table);

let jsonData = new XMLHttpRequest();

try {
    //jsonData.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",true);
    jsonData.open("GET","https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json",true);
    jsonData.send();
    let pageData = [];
    jsonData.onload = function(){
        let data = JSON.parse(this.response);
        for(let value of data){
            let curDetails = {};
            curDetails.id = value.id;
            curDetails.name = value.name;
            curDetails.email = value.email;
            pageData.push(curDetails);
        }
        refData.pageData = pageData;
        loadPagination(refData.pageData,refData.page,refData.rows,true);
    };
} 
catch (error) {
    console.log(error);
}

function loadPagination(pageData,page,rows,isLoadButton){
    let firstRecord = (page - 1) * rows;
    let lastRecord = page * rows;
    let curData = pageData.slice(firstRecord,lastRecord);
    loadTable(curData);
    if(isLoadButton){
        let buttonCount = Math.ceil(pageData.length/rows);
        loadButton(buttonCount);
    }
}

function loadTable(data){
    let tbody = createElement("tbody");
    tbody.setAttribute("id","tablebody");
    for(value of data){
        let tr = createElement("tr");
        let tdID = createElement("td",value.id);
        let tdName = createElement("td",value.name);
        let tdEmail = createElement("td",value.email);
        tr.append(tdID,tdName,tdEmail);
        tbody.append(tr);
    }
    table.append(tbody);
}

function loadButton(counts){
    const btnsDiv = document.createElement("div");
    btnsDiv.className = 'd-flex justify-content-center';
    btnsDiv.id = "buttons";

    let firstButton = createElement("button","First");
    firstButton.setAttribute("class","btn btn-primary");
    firstButton.addEventListener("click",()=>reload(1)); 
    btnsDiv.append(firstButton);

    let prevButton = createElement("button","Previous");
    prevButton.setAttribute("class","btn btn-primary");
    prevButton.addEventListener("click",()=>{
        if (refData.page === 1)
            reload(1);
        else
            reload(refData.page - 1);
    });
    btnsDiv.append(prevButton);

    for(let count = 1; count<= counts; count++){
        let button = createElement("button",count);
        button.setAttribute("class","btn btn-primary");
        button.addEventListener('click',()=>reload(count));
        btnsDiv.append(button);
    } 

    let nextButton = createElement("button","Next")
    nextButton.setAttribute("class","btn btn-primary");
    nextButton.addEventListener("click",()=>{
        if (refData.page === Math.ceil(refData.pageData.length/refData.rows))
            reload(refData.page);
        else
            reload(refData.page + 1);
    });
    btnsDiv.append(nextButton);
    
    let lastButton = createElement("button","Last")
    lastButton.setAttribute("class","btn btn-primary");
    lastButton.addEventListener("click",()=>reload(Math.ceil(refData.pageData.length/refData.rows))); 
    btnsDiv.append(lastButton);

    mainSection.append(btnsDiv);  
}

function createElement(elementName,value = ""){
    var element = document.createElement(elementName);
    element.innerHTML = value;
    return element;
}

function reload(count){
    refData.page = count;
    let tableBody = document.getElementById("tablebody");
    tableBody.remove();
    loadPagination(refData.pageData,refData.page,refData.rows,false);
}