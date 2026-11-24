const {$,$$,esc,toast,modal}=CP;
const F=['IMAX-style screen','Dolby Atmos','Recliner seats','Food court','Parking','Wheelchair access','Online tickets'];
const C=[
['Cinepax – Centaurus','Islamabad','Centaurus Mall, F-8 Markaz','Multi-screen cinema in a major city mall with a lively lobby and snack counters.',[1,2,3,4,5],8,1650,'Mall parking','Concessions and food court','Demo data'],
['Cinepax – Emporium','Lahore','Emporium Mall, Johar Town','Modern multiplex known for comfortable seating and a wide film lineup.',[0,1,3,4,5,6],7,1400,'Basement parking','Concessions and food court','Demo data'],
['Nueplex Cinemas','Karachi','Sea View / Defence area','Boutique-style cinema with premium lounges and Dolby sound.',[1,2,3,4,5],6,900,'Valet and open lot','Full snack menu','Demo data'],
['Cinegold Plex','Islamabad','Blue Area (sample listing)','Compact city-centre cinema ideal for after-work shows.',[3,4,6],4,520,'Street and plaza parking','Snack counter','Demo sample'],
['Universal Cinemas','Karachi','Dolmen Mall area (sample listing)','Large multiplex with several large-format screens.',[0,1,3,4,5],9,1900,'Mall parking','Concessions and food court','Demo sample'],
['Super Cinema Lounge','Rawalpindi','Bahria Town (sample listing)','Relaxed neighbourhood cinema with lounge seating.',[2,3,4,6],3,380,'Free parking','Snack bar and drinks','Demo sample']].map((c,i)=>({id:i,name:c[0],city:c[1],addr:c[2],desc:c[3],fac:c[4].map(x=>F[x]),screens:c[5],cap:c[6],park:c[7],food:c[8],tag:c[9],hue:[345,25,285,200,160,45][i]}));
const bg=h=>`background:linear-gradient(150deg,hsl(${h} 50% 30%),hsl(${h} 55% 9%))`;
$('#city').innerHTML='<option value="">All cities</option>'+[...new Set(C.map(c=>c.city))].map(c=>`<option>${c}</option>`).join('');
$('#fac').innerHTML='<option value="">Any facility</option>'+F.map(f=>`<option>${f}</option>`).join('');
function draw(){
 const q=$('#q').value.trim().toLowerCase(),ci=$('#city').value,fa=$('#fac').value;
 const l=C.filter(c=>(!q||(c.name+' '+c.city).toLowerCase().includes(q))&&(!ci||c.city===ci)&&(!fa||c.fac.includes(fa)));
 $('#cnt').textContent='('+l.length+')';
 $('#grid').innerHTML=l.length?l.map(c=>`<article class="card cc rv"><div class="im"><div class="ph" style="${bg(c.hue)}"><span>${esc(c.name)}</span></div></div><span class="pill">${c.tag}</span><h3>${esc(c.name)}</h3><p class="muted">${c.city} · ${esc(c.addr)}</p><p style="margin:10px 0">${esc(c.desc)}</p><div>${c.fac.map(f=>`<span class="pill">${f}</span>`).join('')}</div><p class="muted" style="font-size:.8rem;margin:10px 0">Contact: see the cinema's official website.</p><div class="row"><button class="btn sm" data-d="${c.id}">View Details</button><button class="btn ghost sm" data-s="${c.id}">View Shows</button></div></article>`).join(''):'<div class="empty"><h3>No cinemas found</h3><p class="muted" style="margin:8px 0 18px">Try another name, city or facility.</p><button class="btn sm" id="clr2">Clear filters</button></div>';
 CP.reveal();
}
function clear(){$('#q').value='';$('#city').value='';$('#fac').value='';draw()}
['q','city','fac'].forEach(i=>$('#'+i).addEventListener('input',draw));$('#clr').onclick=clear;
document.addEventListener('click',e=>{
 if(e.target.id==='clr2')clear();
 if(e.target.closest('[data-c]'))modal('md',false);
 const d=e.target.closest('[data-d]');if(d){const c=C[+d.dataset.d];$('#mb').innerHTML=`<div class="ph" style="${bg(c.hue)}"><span>${esc(c.name)}</span></div><h2 id="mt" style="margin:18px 0 4px">${esc(c.name)}</h2><p class="muted">${c.city} · ${esc(c.addr)}</p><div class="dl"><div><small>Screens</small>${c.screens}</div><div><small>Seating capacity (sample)</small>${c.cap.toLocaleString()}</div><div><small>Parking</small>${c.park}</div><div><small>Food</small>${c.food}</div></div><div>${c.fac.map(f=>`<span class="pill">${f}</span>`).join('')}</div><p class="muted" style="margin-top:14px;font-size:.85rem">${esc(c.desc)} This is demonstration data; verify facilities, contact details and showtimes with the cinema.</p>`;modal('md',true)}
 const s=e.target.closest('[data-s]');if(s){if(CP.showtimes.r)location.href=CP.showtimes.h;else toast('Showtimes page is not integrated yet. Set CP.showtimes.r in shared.js once it exists.',true)}
});
$('#gal').innerHTML=[['Luxury auditorium',345],['Recliner seating',25],['Main screen',285],['Grand lobby',200],['Premium lounge',160],['Dolby sound room',45]].map(g=>`<div class="ph rv" style="${bg(g[1])}"><span>${g[0]}</span></div>`).join('');
draw();
