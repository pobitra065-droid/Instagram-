// ================= GRID LOAD =================
function loadPosts(){
  let grid = document.getElementById("grid");

  let saved = localStorage.getItem("posts");

  if(saved){
    grid.innerHTML = saved;
  } else {
    for(let i=0;i<9;i++){
      let img = document.createElement("img");
      img.src = "https://via.placeholder.com/150";
      grid.appendChild(img);
    }
  }
}

// ================= SAVE =================
function savePosts(){
  localStorage.setItem("posts", document.getElementById("grid").innerHTML);
}

// ================= EDIT POPUP =================
function edit(element){
  let overlay = document.createElement("div");
  overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;";

  let box = document.createElement("div");
  box.style = "background:#1c1c1c;padding:20px;border-radius:10px;width:80%;";

  let input = document.createElement("input");
  input.value = element.innerText;
  input.style = "width:100%;padding:10px;margin-bottom:10px;";

  let btn = document.createElement("button");
  btn.innerText = "Save";

  btn.onclick = function(){
    element.innerText = input.value;
    document.body.removeChild(overlay);
  }

  box.appendChild(input);
  box.appendChild(btn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// ================= ADD POST =================
function addPost(){
  let input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*,video/*";

  input.onchange = function(){
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let grid = document.getElementById("grid");

    if(file.type.includes("video")){
      let video = document.createElement("video");
      video.src = url;
      video.controls = true;
      grid.appendChild(video);
    } else {
      let img = document.createElement("img");
      img.src = url;
      grid.appendChild(img);
    }

    savePosts();
  }

  input.click();
}

// ================= NAVIGATION =================
function goInsight(){
  window.location.href = "insight.html";
}

function goBack(){
  window.location.href = "index.html";
}

// ================= CHART =================
function loadChart(){
  let ctx = document.getElementById("lineChart");

  if(ctx){
    let data = JSON.parse(localStorage.getItem("chart")) || [100,300,800,6000];

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Day1","Day2","Day3","Day4"],
        datasets: [{
          data: data,
          borderColor: "white"
        }]
      }
    });
  }
}

// EDIT GRAPH
function editNumber(){
  let val = prompt("Enter views:");
  if(!val) return;

  document.getElementById("views").innerText = val;

  let newData = [100,200,500,val];
  localStorage.setItem("chart", JSON.stringify(newData));

  location.reload();
}

// ================= INIT =================
window.onload = function(){
  loadPosts();
  loadChart();
}