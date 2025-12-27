const container=document.createElement("div");
let arL=["أ","ا","ب" , "ت","ة" , "ث","ج" , "ح" , "خ","د" , "ذ","ر" , "ز","س" , "ش","ص" , "ض","ط" , "ظ","ع" , "غ","ف" , "ق",
"ك" ,"ل","م" , "ن" , "ه","و" , "ي","ى","ء"];
const logo=document.createElement("div");
const logoimg=document.createElement("img");
const logoa=document.createElement("a");
logoimg.setAttribute("src","Images/logo.png");
logoimg.setAttribute("alt","Ayoub Oufaddoul Logo");
logoimg.style.width="25px";
logoa.setAttribute("href","https://oufaddoul.com/");
logoa.setAttribute("title","Ayoub Oufaddoul");
logo.textContent="Made in Morocco by";
logoa.appendChild(logoimg);
logo.appendChild(logoa);
logo.style=`
    position:fixed;
    font-weight:800;
    right:0;
    bottom:0;
    padding:10px;
    color:#2f3957;
    background-color:white;
    border-top-left-radius: 10px;
    display:flex;
    align-items:center;
    justify-content: space-between;
    gap: 5px;
`;
let isMale=true;
document.body.style=`
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:#2f3957;
    font-family: Arial, Helvetica, sans-serif;
`;
let w=Math.floor((window.innerWidth*0.90));
if(window.innerHeight < window.innerWidth){
    w=600;
}
container.style=`
    width:${w}px;
    background-color:#242c43;
    display:flex;
    flex-direction:column;
    gap:10px;
    padding:10px;
    border-radius:5px;
    margin-bottom:50px;
`;
const title=document.createElement("h1");
title.textContent="Guessing Your Arabian Name";
title.style=`
    width:${w}px;
    color:white;
`;
document.body.appendChild(title);
const label1=document.createElement("label");
label1.textContent="Choose the first letter of your name";
label1.style=`
    color:white;
    font-weight:600;
`;
label1.setAttribute("for","fl");
const select=document.createElement("select");
select.setAttribute("id","fl");
for(let i=65;i<=90;i++)
    select.innerHTML+=`<option value='${String.fromCharCode(i)}'>${String.fromCharCode(i)}</option>`;
const label2=document.createElement("label");
label2.textContent="Choose the last letter of your name in Arabic";
label2.style=`
    color:white;
    font-weight:600;
`;
label2.setAttribute("for","ll");
const selectL=document.createElement("select");
selectL.setAttribute("id","ll");
for(let i=0;i<arL.length;i++)
    selectL.innerHTML+=`<option value='${arL[i]}'>${arL[i]}</option>`;
select.type="text";
select.placeholder="Write the first letter of your name";
select.style=`
    padding:5px;
    background-color:white;
    border-radius:5px;
    border:none;
    font-weight:600;
`;
selectL.style=`
    padding:5px;
    background-color:white;
    border-radius:5px;
    border:none;
    font-weight:600;
`;
const label3=document.createElement("label");
label3.textContent="Write the count of letter in your name";
label3.style=`
    color:white;
    font-weight:600;
`;
label3.setAttribute("for","nl");
const n=document.createElement("input");
n.setAttribute("id","nl");
n.type="number";
n.placeholder="Write the number of characther in your name (Example: the name Ayoub has 5 characthers)"
n.style=`
    padding:5px;
    background-color:white;
    border-radius:5px;
    border:none;
    font-weight:600;
`;
n.min="2";
n.value="2";
const F=document.createElement("div");
F.textContent="Female";

F.style=`
    width:100px;
    height:100px;
    color:white;
    background-color:#D9255D;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    cursor: pointer;
`;
F.addEventListener("click",()=>{isMale=false;F.style.outline="2px solid white";M.style.outline="none";});
const gend=document.createElement("div");
gend.style=`
    display:flex;
    justify-content:center;
    gap:20px;
`;
const M=document.createElement("div");
M.textContent="Male";
M.style=`
    width:100px;
    height:100px;
    color:white;
    background-color:blue;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    cursor: pointer;
    outline:2px solid white;
`;
M.addEventListener("click",()=>{isMale=true;F.style.outline="none";M.style.outline="2px solid white";});
gend.appendChild(M);
gend.appendChild(F);
const res=document.createElement("div");
res.style=`
    color:white;
    display:flex;
    flex-direction:column;
    gap:5px;
    flex-wrap:wrap;
`;
const btn=document.createElement("button");
btn.textContent="Guess";
btn.style=`
    padding:5px;
    background-color:#2f3957;
    color:white;
    border-radius:5px;
    border:none;
    font-weight:600;
`;
btn.addEventListener("click",()=>{
    fetch(`https://oufaddoul.com/Guessing-Your-Arabian-Name/get/json/${select.value}65${(isMale ? "M":"F")}.json`).then((d)=>{
        return d.json();
    }).then((data)=>{
        res.innerHTML="";
        let isF=false;
        data.forEach(v => {
            if(v.enName.replace(/\d/,"").trim().length === Number(n.value) && v.arName.slice(-1) == selectL.value){
                const lp=(v.info === "Alternate transcription of ")?"":`<p style="font-style: italic;">${v.info}</p>`
                res.innerHTML+=`
                    <div style="padding:7px;background-color:white;border-radius:5px;color:black;display:flex;flex-direction:column;align-items:center;gap:7px;">
                        <p style="font-weight:600;margin:0;">${v.enName} | ${v.arName}</p>
                        <p style="margin:0;">${v.source}</p>
                        <p style="margin:0;font-style: italic;">${v.info.replace(/^Alternate transcription of $/,("Alternate transcription of  "+v.source+" "+v.arName)).replace(/^Means (.*) in $/,("Means $1 in "+v.source)).replace(/^From $/,"")}</p>
                    </div>
                `;
                isF=true;
            }
        });
        
        if(!isF){
            res.innerHTML="<div style='font-weight:600;'>We couldn't guess any name.</div>";
        }
    });
});
container.appendChild(label1);
container.appendChild(select);
container.appendChild(label3);
container.appendChild(n);
container.appendChild(label2);
container.appendChild(selectL);
container.appendChild(gend);
container.appendChild(btn);
container.appendChild(res);
document.body.appendChild(container);

document.body.appendChild(logo);



