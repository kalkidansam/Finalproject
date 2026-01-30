(()=>{const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),
LS=(k,v)=>v==null?JSON.parse(localStorage.getItem(k)||"[]"):(localStorage.setItem(k,JSON.stringify(v)),v),
mail=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),pg=document.body.dataset.page;

$("#year")&&($("#year").textContent=new Date().getFullYear());
$$(".q").forEach(q=>q.onclick=()=>{const a=q.nextElementSibling,o=a.style.display=="block";
$$(".ans").forEach(x=>x.style.display="none"); $$(".q span").forEach(s=>s.textContent="+");
a.style.display=o?"none":"block"; q.querySelector("span").textContent=o?"+":"–";});

if(pg=="planner"){
  let T=LS("tasks"),L=$("#tList"),E=$("#tErr"),F=$("#tFilter"),R=_=>{
    const f=F.value,v=T.filter(x=>f=="all"||(f=="done"?x.d:!x.d));
    L.innerHTML=v.length?v.map(x=>`<li class="card" data-id="${x.id}"><b class="${x.d?'mut':''}">${x.tt}</b>
    <div class="row"><small class="mut">${x.p}</small><span>
    <button class="btn o" data-a="t" type="button">${x.d?"Open":"Done"}</button>
    <button class="btn o" data-a="x" type="button">Del</button></span></div></li>`).join(""):`<li class="mut">No tasks.</li>`;
    LS("tasks",T);
  };
  $("#tForm").onsubmit=e=>(e.preventDefault(),E.textContent="",tt=$("#tTitle").value.trim(),p=$("#tPri").value,
    tt.length<3?E.textContent="Title 3+":!p?E.textContent="Pick priority":(T=[{id:Date.now()+"",tt,p,d:0},...T],e.target.reset(),R()));
  L.onclick=e=>{const b=e.target.closest("button"); if(!b) return; const id=e.target.closest("li").dataset.id;
    b.dataset.a=="t"&&(T=T.map(x=>x.id==id?{...x,d:!x.d}:x));
    b.dataset.a=="x"&&(T=T.filter(x=>x.id!=id)); R();
  };
  F.onchange=R; $("#tClearDone").onclick=_=>(T=T.filter(x=>!x.d),R()); $("#tClearAll").onclick=_=>(T=[],R()); R();
}

if(pg=="contact"){
  let M=LS("msgs"),L=$("#cList"),E=$("#cErr"),O=$("#cOk"),R=_=>{
    L.innerHTML=M.length?M.slice(0,6).map(x=>`<li><b>${x.n}</b> <span class="mut">${x.e}</span></li>`).join(""):`<li class="mut">No messages.</li>`;
    LS("msgs",M);
  };
  $("#cForm").onsubmit=e=>(e.preventDefault(),E.textContent="",O.textContent="",
    n=$("#cName").value.trim(),em=$("#cEmail").value.trim(),msg=$("#cMsg").value.trim(),
    n.length<2?E.textContent="Name short":!mail(em)?E.textContent="Bad email":msg.length<10?E.textContent="Msg 10+":(M=[{n,e:em},...M],e.target.reset(),O.textContent="Saved.",R()));
  $("#cClear").onclick=_=>(M=[],O.textContent="Cleared.",E.textContent="",R()); R();
}
const listings = [
  {
    title: "Bole Apartment",
    info: "3 Bed · 2 Bath",
    price: "Br 35,000,000",
    img: "images/bole.jpg"
  },
  {
    title: "Kazanchis Condo",
    info: "2 Bed · 2 Bath",
    price: "Br 42,000,000",
    img: "images/kazanchis.jpg"
  },
  {
    title: "CMC Residence",
    info: "3 Bed · 2 Bath",
    price: "Br 51,000,000",
    img: "images/cmc.jpg"
  }
];

const cards = document.getElementById("cards");

cards.innerHTML = listings.map(l => `
  <article class="card">
    <img src="${l.img}" alt="${l.title}">
    <h4>${l.title}</h4>
    <p class="mut">${l.info}</p>
    <b>${l.price}</b>
  </article>
`).join("");
})();