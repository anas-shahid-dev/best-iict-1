const {$,$$,esc,toast,pkr,count}=CP;
const CATS=['All Offers','Student Deals','Weekend Deals','Family Packages','Exclusive Rewards'];
const OFFERS=[
{t:'Weekend Special',d:'Fridays to Sundays on any standard screening.',c:'WEEKEND20',p:20,x:'2026-12-31',k:'Weekend Deals'},
{t:'Student Discount',d:'Show a valid student ID at the counter.',c:'STUDENT15',p:15,x:'2026-12-31',k:'Student Deals'},
{t:'Family Movie Package',d:'Four tickets with a family-size snack bundle.',c:'FAMILY25',p:25,x:'2027-01-15',k:'Family Packages'},
{t:'Buy 2 Get 1 Free',d:'Third ticket free, applied as one-third off.',c:'B2G1',p:33,x:'2026-12-20',k:'Weekend Deals'},
{t:'Movie Night Combo',d:'Ticket plus popcorn and a drink.',c:'COMBO12',p:12,x:'2026-12-31',k:'Family Packages'},
{t:'Exclusive Member Rewards',d:'For Gold and Platinum members only.',c:'CINE10',p:10,x:'2027-03-31',k:'Exclusive Rewards'}];
const ALL=[...OFFERS,{c:'EARLY50',p:50,x:'2026-10-31'}]; /* EARLY50 is an expired test code */
let cat=CATS[0];
const expired=o=>new Date(o.x+'T23:59:59')<new Date();
const fmtD=s=>new Date(s).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
$('#tabs').innerHTML=CATS.map(c=>`<button class="btn ghost sm" aria-pressed="${c===cat}" data-k="${c}">${c}</button>`).join('');
function draw(){
 const l=OFFERS.filter(o=>cat===CATS[0]||o.k===cat);
 $('#grid').innerHTML=l.map(o=>`<article class="card of rv"><span class="tag">Demo offer${expired(o)?' · Expired':''}</span><span class="eyebrow">${o.k}</span><div class="big" data-p="${o.p}">0%</div><h3>${o.t}</h3><p class="muted">${o.d}</p><span class="code">${o.c}</span><p class="muted" style="font-size:.8rem">Expires ${fmtD(o.x)}</p><div class="row"><button class="btn sm" data-copy="${o.c}">Copy code</button><button class="btn ghost sm" data-apply="${o.c}">Apply</button></div></article>`).join('');
 $$('[data-p]').forEach(e=>count(e,+e.dataset.p,n=>Math.round(n)+'%'));CP.reveal();
}
$('#tabs').onclick=e=>{const b=e.target.closest('[data-k]');if(!b)return;cat=b.dataset.k;$$('#tabs button').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()};
async function copy(code){try{await navigator.clipboard.writeText(code)}catch(e){const t=document.createElement('textarea');t.value=code;document.body.append(t);t.select();try{document.execCommand('copy')}catch(_){}t.remove()}toast('Code '+code+' copied')}
function apply(raw){
 const code=raw.trim().toUpperCase(),amt=parseFloat($('#amt').value),r=$('#res');
 if(!(amt>0)){r.textContent='Enter an order total greater than zero.';toast('Invalid order total',true);return}
 const o=ALL.find(x=>x.c===code);
 if(!code||!o){r.textContent='"'+raw.trim()+'" is not a valid promo code.';toast('Invalid promo code',true);return}
 if(expired(o)){r.textContent=code+' expired on '+fmtD(o.x)+'.';toast('That coupon has expired',true);return}
 const d=Math.round(amt*o.p)/100;
 r.innerHTML=`${esc(code)} applied: <b>${o.p}% off</b>. Subtotal ${pkr(amt)} − discount ${pkr(d)} = <b>${pkr(amt-d)}</b>`;toast(code+' applied — you save '+pkr(d));
}
document.addEventListener('click',e=>{const c=e.target.closest('[data-copy]');if(c)copy(c.dataset.copy);const a=e.target.closest('[data-apply]');if(a){$('#cc').value=a.dataset.apply;apply(a.dataset.apply);$('#coupon').scrollIntoView({behavior:'smooth'})}});
$('#cf').onsubmit=e=>{e.preventDefault();apply($('#cc').value)};
draw();
