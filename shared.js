/* CinePass shared module. Teammates: set r:true once a page exists in the project. */
const CP={
 nav:[{t:'Home',h:'index.html'},{t:'Movies',h:'movies.html'},{t:'Cinemas',h:'cinemas.html',r:1},{t:'Offers',h:'offers.html',r:1},{t:'My Tickets',h:'tickets.html'},{t:'My Profile',h:'profile.html',r:1}],
 showtimes:{h:'showtimes.html',r:false},
 movies:[['Dune: Prophecy Cut','Sci-Fi',8.6,265],['The Last Reel','Drama',8.1,350],['Midnight in Lahore','Thriller',7.9,10],['Laughter Lane','Comedy',7.4,40],['Skyfall Harbor','Action',8.0,200],['Monsoon Letters','Romance',7.7,330],['Orbit Zero','Sci-Fi',8.3,220],['Paper Kingdoms','Animation',8.4,150]].map((m,i)=>({id:i,title:m[0],genre:m[1],rating:m[2],hue:m[3]})),
 $:(s,r=document)=>r.querySelector(s),$$:(s,r=document)=>[...r.querySelectorAll(s)],
 get(k,d){try{const v=localStorage.getItem('cp_'+k);return v?JSON.parse(v):d}catch(e){return d}},
 set(k,v){try{localStorage.setItem('cp_'+k,JSON.stringify(v))}catch(e){}},
 pkr:n=>'PKR '+Math.round(n).toLocaleString('en-PK'),
 esc:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 poster:m=>`<div class="poster" style="background:linear-gradient(160deg,hsl(${m.hue} 55% 38%),hsl(${m.hue} 60% 12%))"><span>${CP.esc(m.title)}</span></div>`,
 toast(msg,bad){let t=CP.$('#toasts');const e=document.createElement('div');e.className='toast'+(bad?' bad':'');e.setAttribute('role',bad?'alert':'status');e.textContent=msg;t.append(e);setTimeout(()=>e.remove(),3200)},
 modal(id,open){const m=CP.$('#'+id);m.classList.toggle('open',open);m.setAttribute('aria-hidden',!open);document.body.style.overflow=open?'hidden':'';if(open){CP._f=document.activeElement;(CP.$('input,button',m)||m).focus()}else if(CP._f)CP._f.focus()},
 count(el,to,fmt=n=>n){if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=fmt(to);return}const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1200,1);el.textContent=fmt(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)},
 reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});CP.$$('.rv:not(.in)').forEach((e,i)=>{e.style.setProperty('--i',i%6);io.observe(e)})},
 soon(){CP.toast('That page is not integrated into this build yet.',true)}
};
document.documentElement.dataset.theme=CP.get('theme','dark');
document.addEventListener('DOMContentLoaded',()=>{
 const cur=location.pathname.split('/').pop()||'index.html';
 document.body.insertAdjacentHTML('afterbegin',`<a href="#main" class="btn sm" style="position:absolute;left:-999px" onfocus="this.style.left='8px'">Skip to content</a><header class="nav"><div class="wrap"><a class="logo" href="index.html" data-nav>Cine<b>Pass</b></a><button class="burger" aria-label="Toggle menu" aria-expanded="false">☰</button><nav aria-label="Main"><ul class="links">${CP.nav.map(n=>`<li><a href="${n.h}" ${n.h==cur?'aria-current="page"':''} ${n.r?'':'data-soon'}>${n.t}</a></li>`).join('')}</ul></nav></div></header>`);
 document.body.insertAdjacentHTML('beforeend','<div id="toasts" aria-live="polite"></div><footer><div class="wrap">CinePass — Your Movie. Your Seat. Your Experience.<br>University project · all cinemas, offers and bookings are demonstration data.</div></footer>');
 const b=CP.$('.burger'),l=CP.$('.links');b.onclick=()=>{b.setAttribute('aria-expanded',l.classList.toggle('open'))};
 CP.$$('[data-soon]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();CP.soon()}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')CP.$$('.modal.open').forEach(m=>CP.modal(m.id,false))});
 CP.$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)CP.modal(m.id,false)}));
 CP.reveal();
});
