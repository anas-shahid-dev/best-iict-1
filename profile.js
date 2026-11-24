const {$,$$,get,set,esc,toast,modal,count,pkr,movies,poster}=CP;
const defUser={name:'Anas Shahid',email:'anas.shahid@example.com',phone:'03001234567',city:'Islamabad',tier:'Gold',since:'2026-10-24'};
if(!get('bookings'))set('bookings',[{movie:'The Last Reel',status:'watched',total:1800,date:'2026-10-30'},{movie:'Orbit Zero',status:'watched',total:2400,date:'2026-11-08'},{movie:'Skyfall Harbor',status:'watched',total:1500,date:'2026-11-15'},{movie:'Paper Kingdoms',status:'upcoming',total:2100,date:'2026-12-02'}]);
let user=get('user',defUser),favs=get('favs',[0,6]),prefs=get('prefs',{remind:true,offers:false});
function render(){
 $('#av').textContent=user.name.split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase();
 $('#hn').textContent=user.name;$('#he').textContent=user.email;$('#hm').textContent=user.tier+' Member';
 $('#since').textContent=new Date(user.since).toLocaleDateString('en-GB',{month:'long',year:'numeric'});
 $('#info').innerHTML=[['Full name',user.name],['Email',user.email],['Phone',user.phone],['City',user.city],['Membership',user.tier]].map(r=>`<div><small>${r[0]}</small>${esc(r[1])}</div>`).join('');
 const b=get('bookings',[]),s=[['Movies Watched',b.filter(x=>x.status==='watched').length],['Upcoming Bookings',b.filter(x=>x.status==='upcoming').length],['Favourite Movies',favs.length],['Total Amount Spent',b.reduce((a,x)=>a+x.total,0),pkr]];
 $('#stats').innerHTML=s.map(x=>`<div class="card stat rv"><span class="muted">${x[0]}</span><b data-v="${x[1]}">0</b></div>`).join('');
 $$('#stats b').forEach((e,i)=>count(e,s[i][1],s[i][2]||(n=>Math.round(n))));
 const card=(m,fav)=>`<article class="card fav rv" style="padding:12px">${poster(m)}<h3>${esc(m.title)}</h3><p class="muted" style="font-size:.8rem">${m.genre} · ★ ${m.rating}</p><button class="btn ${fav?'ghost':''} sm" data-f="${m.id}" style="margin-top:8px">${fav?'Remove':'Add to favourites'}</button></article>`;
 $('#favs').innerHTML=favs.length?movies.filter(m=>favs.includes(m.id)).map(m=>card(m,1)).join(''):'<div class="empty">No favourites yet — add some below.</div>';
 $('#more').innerHTML=movies.filter(m=>!favs.includes(m.id)).map(m=>card(m,0)).join('')||'<div class="empty">Everything is in your favourites.</div>';
 CP.reveal();
}
document.addEventListener('click',e=>{
 const f=e.target.closest('[data-f]');if(f){const id=+f.dataset.f;favs=favs.includes(id)?favs.filter(x=>x!==id):[...favs,id];set('favs',favs);toast(favs.includes(id)?'Added to favourites':'Removed from favourites');render()}
 const c=e.target.closest('[data-c]');if(c)modal(c.dataset.c,false);
 const o=e.target.closest('[data-o]');if(o)openM(o.dataset.o);
});
function openM(w){if(w==='pw'){$('#pf').reset();$('#pe').textContent='';modal('m-pw',true)}else{$('#fn').value=user.name;$('#fe').value=user.email;$('#fp').value=user.phone;$('#fc').value=user.city;$('#fm').value=user.tier;$$('[data-e]').forEach(x=>x.textContent='');modal('m-edit',true)}}
$('#edit').onclick=()=>openM('edit');
$('#f').onsubmit=e=>{e.preventDefault();const v={fn:$('#fn').value.trim(),fe:$('#fe').value.trim(),fp:$('#fp').value.trim().replace(/[\s-]/g,''),fc:$('#fc').value.trim()};
 const er={fn:v.fn.length<3?'Enter your full name (3+ characters).':'',fe:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.fe)?'':'Enter a valid email address.',fp:/^(\+92|0)3\d{9}$/.test(v.fp)?'':'Use a Pakistani mobile number like 03001234567.',fc:v.fc.length<2?'Enter your city.':''};
 $$('[data-e]').forEach(x=>x.textContent=er[x.dataset.e]);if(Object.values(er).some(Boolean))return;
 user={...user,name:v.fn,email:v.fe,phone:v.fp,city:v.fc,tier:$('#fm').value};set('user',user);modal('m-edit',false);render();toast('Profile updated successfully')};
$('#pf').onsubmit=e=>{e.preventDefault();const a=$('#p1').value,b=$('#p2').value,c=$('#p3').value;
 const m=!a?'Enter your current password.':b.length<8?'New password must be at least 8 characters.':b!==c?'Passwords do not match.':'';
 $('#pe').textContent=m;if(m)return;modal('m-pw',false);toast('Password updated (simulated)')};
$$('[data-n]').forEach(c=>{c.checked=!!prefs[c.dataset.n];c.onchange=()=>{prefs[c.dataset.n]=c.checked;set('prefs',prefs);toast('Notification preference saved')}});
$('#th').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;set('theme',t);toast(t+' appearance on')};
$('#lo').onclick=()=>{set('session',false);$('#app').hidden=true;$('#out').hidden=false;toast('Logged out')};
$('#in').onclick=()=>{set('session',true);$('#app').hidden=false;$('#out').hidden=true;render()};
if(get('session',true)===false){$('#app').hidden=true;$('#out').hidden=false}
render();
