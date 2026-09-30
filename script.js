// images 폴더에 지정된 JPG를 넣으면 사진을 표시합니다. 로드 실패 시 이모지를 사용합니다.
const animals = [
  {name:"개구리",emoji:"🐸",image:"images/frog.jpg",habitat:"물과 땅",movement:"뛰기와 헤엄치기",features:["다리가 있어요"],observationHints:["다리는 몇 개인가요?", "날개가 있나요?", "물에서도 움직일 수 있을까요?"],type:"habitat",explanation:"개구리는 네 개의 다리가 있고, 물과 땅을 오가며 생활해요."},
  {name:"붕어",emoji:"🐟",image:"images/fish.jpg",habitat:"물",movement:"헤엄치기",features:["지느러미가 있어요"],observationHints:["다리가 있나요?", "지느러미는 어디에 있나요?", "몸은 무엇으로 덮여 있나요?"],type:"habitat",explanation:"붕어는 물에서 살아요. 지느러미와 꼬리를 움직여 헤엄쳐요."},
  {name:"나비",emoji:"🦋",image:"images/butterfly.jpg",habitat:"땅",movement:"날기",features:["날개가 있어요","다리가 있어요"],observationHints:["날개가 있나요?", "작은 다리는 어디에 있나요?", "몸은 몇 부분으로 나누어져 보이나요?"],type:"movement",explanation:"나비는 날개와 여섯 개의 다리가 있어요. 날개로 날아 꽃을 찾아가요."},
  {name:"참새",emoji:"🐦",image:"images/sparrow.jpg",habitat:"땅",movement:"날기",features:["날개가 있어요","다리가 있어요"],observationHints:["날개와 다리는 각각 몇 개인가요?", "몸을 덮은 깃털이 보이나요?", "부리는 어떤 모양인가요?"],type:"movement",explanation:"참새는 두 개의 다리와 날개가 있어요. 날개로 날고, 땅에서는 걷거나 뛰어요."},
  {name:"토끼",emoji:"🐰",image:"images/rabbit.jpg",habitat:"땅",movement:"걷기와 뛰기",features:["다리가 있어요"],observationHints:["귀는 어떤 모양인가요?", "앞다리와 뒷다리를 찾아보세요.", "몸을 덮은 털이 보이나요?"],type:"habitat",explanation:"토끼는 땅에서 살아요. 네 개의 다리로 걷거나 뛰어요. 긴 귀도 관찰해 보세요!"},
  {name:"강아지",emoji:"🐶",image:"images/dog.jpg",habitat:"땅",movement:"걷기와 뛰기",features:["다리가 있어요"],observationHints:["다리는 몇 개인가요?", "발과 꼬리를 찾아보세요.", "몸은 무엇으로 덮여 있나요?"],type:"movement",explanation:"강아지는 네 개의 다리로 걷고 뛰어요. 몸은 털로 덮여 있어요."},
  {name:"거북이",emoji:"🐢",image:"images/turtle.jpg",habitat:"물과 땅",movement:"걷기와 헤엄치기",features:["다리가 있어요"],observationHints:["단단한 등딱지가 보이나요?", "다리는 몇 개인가요?", "물에서 어떻게 움직일까요?"],type:"habitat",explanation:"이번 거북이는 연못에 사는 민물거북이에요. 물에서 헤엄치고 땅에서 쉬어요. 거북이는 종류마다 사는 곳이 달라요."},
  {name:"잠자리",emoji:"🪰",image:"images/dragonfly.jpg",habitat:"땅",movement:"날기",features:["날개가 있어요","다리가 있어요"],observationHints:["긴 몸을 찾아보세요.", "날개는 몇 쌍일까요?", "작은 다리는 어디에 있을까요?"],type:"movement",explanation:"다 자란 잠자리는 날개와 여섯 개의 다리가 있어요. 날개로 날아요. 어린 잠자리는 물에서 살아요.",note:"긴 몸과 두 쌍의 날개를 가진 잠자리를 떠올려 보세요. 이모지는 곤충을 나타내요."},
  {name:"고래",emoji:"🐋",image:"images/whale.jpg",habitat:"물",movement:"헤엄치기",features:["지느러미가 있어요"],observationHints:["지느러미는 어디에 있나요?", "꼬리는 어떤 모양인가요?", "다리가 보이나요?"],type:"habitat",explanation:"고래는 바다에서 지느러미와 꼬리로 헤엄쳐요. 물고기와 달리 물 위로 올라와 공기로 숨을 쉬어요."},
  {name:"다람쥐",emoji:"🐿️",image:"images/squirrel.jpg",habitat:"땅",movement:"걷기와 뛰기",features:["다리가 있어요"],observationHints:["꼬리는 어떤 모양인가요?", "다리는 몇 개인가요?", "몸의 줄무늬를 찾아보세요."],type:"movement",explanation:"다람쥐는 네 개의 다리로 걷고 뛰며 나무도 타요. 몸에 털이 있고 긴 꼬리가 있어요."}
];
const badges = [{name:"🔎 관찰왕",count:3},{name:"🐾 동물박사",count:6},{name:"🌿 생태탐험가",count:10}];
let pendingBadge = null;
let toastTimer;
let latestDiscovery = null;
const featureOptions = ["날개가 있어요","다리가 있어요","지느러미가 있어요"];
const habitatOptions = [{value:"땅",label:"🌳 땅"},{value:"물",label:"💧 물"},{value:"물과 땅",label:"🌿 물과 땅"}];
const movementOptions = [{value:"걷기와 뛰기",label:"🐾 걷거나 뛰어요"},{value:"헤엄치기",label:"🏊 헤엄쳐요"},{value:"날기",label:"🪽 날아요"}];
const app = document.getElementById("app");
const photoDialog = document.getElementById("photo-dialog");
function bindImageFallbacks(root){
  root.querySelectorAll("img[data-fallback]").forEach(img=>{
    const fallback=()=>{
      if(!img.isConnected)return;
      const span=document.createElement("span");span.className="animal-emoji";span.textContent=img.dataset.fallback;
      span.setAttribute("role","img");span.setAttribute("aria-label",img.alt);
      const zoom=img.closest(".photo-zoom");
      img.replaceWith(span);
      if(zoom){zoom.disabled=true;zoom.classList.add("photo-unavailable");zoom.setAttribute("aria-label",span.getAttribute("aria-label"));}
      const note=root.querySelector("[data-emoji-note]");if(note)note.hidden=false;
    };
    img.addEventListener("error",fallback,{once:true});
    // 캐시된 이미지의 로드 실패도 처리합니다.
    if(img.complete&&img.naturalWidth===0)fallback();
  });
}
function openPhoto(animal){
  document.getElementById("photo-title").textContent=`🔎 ${animal.name} 크게 관찰하기`;
  const content=document.getElementById("photo-content");content.innerHTML=picture(animal);
  bindImageFallbacks(content);photoDialog.showModal();document.body.classList.add("photo-open");
}
document.getElementById("photo-close").addEventListener("click",()=>photoDialog.close());
photoDialog.addEventListener("click",event=>{if(event.target===photoDialog)photoDialog.close();});
photoDialog.addEventListener("close",()=>{document.body.classList.remove("photo-open");document.getElementById("photo-content").replaceChildren();});
let state = {screen:"start",index:0,stage:0,score:0,discovered:[],awarded:new Set(),feedback:"",hint:false};
let bookReturn = "start";
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function picture(a){return a.image ? `<img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.name)}" data-fallback="${escapeHtml(a.emoji)}">` : `<span class="animal-emoji" role="img" aria-label="${escapeHtml(a.name)}">${a.emoji}</span>`;}
function award(stage){const key = `${state.index}-${stage}`;if(!state.awarded.has(key)){state.awarded.add(key);state.score+=10;}}
function badgeShelf(){return `<div class="badges" aria-label="탐험 배지">${badges.map(b=>`<span class="badge ${state.discovered.length>=b.count?'earned':'unearned'}" aria-label="${b.name}, ${state.discovered.length>=b.count?'획득':`${b.count}마리 발견하면 획득`}">${b.name}<small>${b.count}마리 ${state.discovered.length>=b.count?'✓':'발견'}</small></span>`).join('')}</div>`;}
function expeditionMap(){const stops=["🌳 숲","💧 연못","🌼 들판","🌊 바다","🏕 탐험 완료"];const current=Math.min(Math.floor(state.index/2),4);return `<nav class="expedition-map" aria-label="탐험 여정 지도">${stops.map((stop,i)=>`<div class="map-stop ${i===current?'current':i<current?'visited':''}" ${i===current?'aria-current="location"':''}><span>${stop}</span><span class="traveler" aria-hidden="true">${i===current?'🐾':'·'}</span></div>${i<4?'<span class="map-arrow" aria-hidden="true">→</span>':''}`).join('')}</nav>`;}
function header(){return `<div class="topbar"><span>🐾 탐험 ${Math.min(state.index+1,animals.length)} / ${animals.length}</span><span>⭐ ${state.score}점</span><button class="secondary" data-action="book">📖 동물 도감</button></div><div class="progress" role="progressbar" aria-label="발견한 동물" aria-valuenow="${state.discovered.length}" aria-valuemin="0" aria-valuemax="${animals.length}"><span style="width:${state.discovered.length/animals.length*100}%"></span></div>${expeditionMap()}${badgeShelf()}`;}
function render(focus = true){
  document.body.classList.add("compact-screen");
  document.body.dataset.screen = state.screen;
  document.body.dataset.stage = state.stage;
  document.body.classList.toggle("lesson-screen", ["explore","featureSuccess","classificationSuccess","discovery"].includes(state.screen));
  const a = animals[state.index];
  if(state.screen==="start") app.innerHTML=`<section class="panel start-panel"><div class="start-decoration" aria-hidden="true">☁️ <span>🍃</span></div><div class="eyebrow">숲속 과학 탐험 • 3학년</div><h1>🐾 동물 분류 탐험대</h1><div class="hero" aria-hidden="true">🐸 🦋 🐰</div><p>동물들의 특징을 관찰하고<br>알맞은 곳에 분류해 보세요!</p><button class="primary" data-action="guide">탐험 시작 →</button><button class="secondary" data-action="book">📖 동물 도감 보기</button></section>`;
  else if(state.screen==="guide") app.innerHTML=`<section class="panel"><div class="eyebrow">탐험 준비</div><h1>🔎 이렇게 탐험해요!</h1><p>① 동물의 모습을 자세히 관찰해요.<br>② 몸의 특징을 <b>모두</b> 골라요.<br>③ 사는 곳이나 이동 방법으로 분류해요.</p><div class="explanation">관찰 완료와 각 문제에 10점씩, 모두 300점이에요. 다시 골라도 점수는 줄지 않아요. 동물마다 한 번씩만 점수를 받아요!</div><button class="primary" data-action="begin">준비됐어요! 🌿</button></section>`;
  else if(state.screen==="explore"){
    const stages=["관찰하기","특징 찾기","분류하기"];
    let content="";
    if(state.stage===0) content=`<h2>🔎 자세히 관찰해 보세요!</h2>${a.note?`<p data-emoji-note ${a.image?'hidden':''}>${a.note}</p>`:''}<div class="observation-hints"><ul>${a.observationHints.map(h=>`<li>${escapeHtml(h)}</li>`).join('')}</ul></div><button class="primary" data-action="observed">관찰 완료 ✓</button>`;
    if(state.stage===1) content=`<h2 class="question" id="question">${a.name}의 특징으로 알맞은 것을<br>모두 골라보세요.</h2><form id="features"><div class="options" role="group" aria-labelledby="question">${featureOptions.map((f,i)=>`<label class="choice"><input type="checkbox" name="feature" value="${i}"><span>${f}</span></label>`).join("")}</div><div class="feedback" id="feedback" role="status"></div><button class="primary" type="submit">선택 완료 ✓</button></form>`;
    if(state.stage===2){const opts=a.type==="habitat"?habitatOptions:movementOptions;const labels={"땅":"🌳 땅에서 주로 생활해요","물":"💧 물에서 주로 생활해요","물과 땅":"🌿 물과 땅에서 생활해요"};content=`<h2 class="question">${a.name} 카드를 알맞은 상자에 넣어 주세요.</h2><p class="drag-help">상자를 누르거나 카드를 끌어 넣어요.</p><div class="options classification">${opts.map(o=>`<button class="choice classification-box" data-answer="${o.value}"><b>${labels[o.value]||o.label}</b></button>`).join("")}</div><div class="feedback" id="feedback" role="status"></div>`;}
    app.innerHTML=`${header()}<section class="panel activity-panel"><div class="steps">${stages.map((s,i)=>`<span class="step ${state.stage===i?"active":""}" ${state.stage===i?'aria-current="step"':''}>${i+1}. ${s}</span>`).join("")}</div><div class="activity-layout"><div class="activity-visual"><div class="animal ${state.stage===0?'observation-animal':''} ${state.stage===2?'drag-card':''}" ${state.stage===2?'draggable="true" data-animal-card="true" aria-label="분류할 동물 카드"':''}>${state.stage===0?`<button class="photo-zoom ${a.image?'':'photo-unavailable'}" ${a.image?'':'disabled'} data-action="zoom" aria-label="${escapeHtml(a.name)} 사진 크게 보기">${picture(a)}<span class="zoom-caption">🔎 사진을 누르면 크게 볼 수 있어요</span></button>`:picture(a)}</div></div><div class="activity-content"><h1>${a.name}</h1>${content}</div></div></section>`;
  }else if(["featureSuccess","classificationSuccess","discovery"].includes(state.screen)){
    const discovery=state.screen==="discovery";
    const explanation=state.screen==="featureSuccess"?`${a.name}의 몸에는 ${a.features.map(f=>f.replace("가 있어요","")).join(", ")}가 있어요.`:a.explanation;
    const action=state.screen==="featureSuccess"?"classify":discovery?"next":"discover";
    const label=action==="classify"?"이제 분류해 볼까요? →":action==="discover"?"동물 도감에 등록하기 📖":state.index===animals.length-1?"탐험 결과 보기 🏅":"다음 탐험으로 →";
    app.innerHTML=`${header()}<section class="panel celebration-panel"><div class="sparkles" aria-hidden="true">✨ ⭐ ✨</div><h1>${discovery?"🎉 새로운 동물을 발견했어요!":"🎉 잘했어요!"}</h1><div class="activity-layout"><div class="activity-visual"><div class="animal ${discovery?'discovery-animal':''}">${picture(a)}</div><h2>${a.name}</h2></div><div class="activity-content"><p>${discovery?`📖 ${a.name} 도감 등록 완료!`:"동물의 특징을 잘 관찰했어요!"}</p><div class="explanation">${explanation}</div>${discovery?`<div class="collection-preview" aria-label="물음표 카드가 발견한 동물로 바뀌어요"><span class="before">❓</span><span class="after">${picture(a)}<b>${a.name}</b></span></div>`:''}<button class="primary" data-action="${action}">${label}</button></div></div></section>`;
  }
  else if(state.screen==="book") app.innerHTML=`<section class="panel"><div class="eyebrow">나의 발견 기록</div><h1>📖 동물 도감</h1><p>${state.discovered.length} / ${animals.length} 발견</p><div class="progress" role="progressbar" aria-label="도감 수집 진행률" aria-valuenow="${state.discovered.length}" aria-valuemin="0" aria-valuemax="${animals.length}"><span style="width:${state.discovered.length/animals.length*100}%"></span></div>${badgeShelf()}<div class="book-grid">${animals.map((animal,i)=>state.discovered.includes(i)?`<button class="book-card ${i===latestDiscovery?'newly-collected':''}" data-detail="${i}" aria-label="${animal.name} 설명 보기">${picture(animal)}<b>${animal.name}</b></button>`:`<div class="book-card locked"><span class="animal-emoji">❓</span><b>아직 발견하지 못했어요</b></div>`).join("")}</div><button class="secondary" data-action="return">← 돌아가기</button></section>`;
  else if(state.screen==="detail"){const animal=animals[state.detail];app.innerHTML=`<section class="panel detail-panel"><h1>${animal.name}</h1><div class="activity-layout"><div class="activity-visual"><div class="animal">${picture(animal)}</div></div><div class="activity-content"><div class="explanation">${animal.explanation}</div><p>🌿 생활 장소: ${animal.habitat}<br>🐾 이동 방법: ${animal.movement}</p><button class="secondary" data-action="book">← 도감으로</button></div></div></section>`;}
  else if(state.screen==="result"){const stars=state.score>=250?3:state.score>=200?2:1;app.innerHTML=`<section class="panel"><div class="eyebrow">숲속 탐험대 인증</div><div class="hero">🏅</div><h1>🎉 탐험 완료!</h1><p>${animals.length}마리의 동물을 모두 발견했어요!</p><div class="stats"><div class="stat">최종 점수<strong>${state.score}점</strong></div><div class="stat">발견한 동물<strong>${state.discovered.length}마리</strong></div><div class="stat">획득한 별<strong aria-label="별 ${stars}개">${"⭐".repeat(stars)}</strong></div></div><p>축하합니다!<br>당신은 훌륭한 동물 탐험대원입니다!</p><button class="primary" data-action="book">동물 도감 보기</button><button class="secondary" data-action="restart">다시 탐험하기</button></section>`;}
  bindImageFallbacks(app);
  showBadgeToast();
  if(focus){const heading=app.querySelector("h1");heading.tabIndex=-1;heading.focus({preventScroll:true});window.scrollTo(0,0);}
}
function shake(element){if(!element)return;element.classList.remove("shake");void element.offsetWidth;element.classList.add("shake");}
function showBadgeToast(){
  clearTimeout(toastTimer);
  document.getElementById("badge-toast")?.remove();
  if(!pendingBadge)return;
  const toast=document.createElement("div");toast.id="badge-toast";toast.className="badge-toast";toast.setAttribute("role","status");toast.textContent=`새로운 배지를 획득했어요! ${pendingBadge.name}`;app.appendChild(toast);
  document.getElementById("announcement").textContent=toast.textContent;
  toastTimer=setTimeout(()=>{toast.remove();pendingBadge=null;},3000);
}
function checkClassification(value, element){
  if(state.screen!=="explore"||state.stage!==2)return;
  const a=animals[state.index];
  if(value===(a.type==="habitat"?a.habitat:a.movement)){award(2);state.screen="classificationSuccess";render();}
  else {feedback("조금만 더 관찰해 볼까요?");shake(element);}
}
// HTML 드래그와 버튼 선택은 같은 채점 함수를 사용합니다.
app.addEventListener("dragstart",event=>{
  const card=event.target.closest("[data-animal-card]");
  if(!card||state.screen!=="explore"||state.stage!==2){event.preventDefault();return;}
  event.dataTransfer.setData("text/plain",String(state.index));event.dataTransfer.effectAllowed="move";card.classList.add("dragging");
});
app.addEventListener("dragend",()=>{app.querySelectorAll(".dragging,.drag-over").forEach(el=>el.classList.remove("dragging","drag-over"));});
app.addEventListener("dragover",event=>{const box=event.target.closest("[data-answer]");if(box&&state.screen==="explore"&&state.stage===2){event.preventDefault();event.dataTransfer.dropEffect="move";box.classList.add("drag-over");}});
app.addEventListener("dragleave",event=>{const box=event.target.closest("[data-answer]");if(box&&!box.contains(event.relatedTarget))box.classList.remove("drag-over");});
app.addEventListener("drop",event=>{const box=event.target.closest("[data-answer]");if(!box)return;event.preventDefault();box.classList.remove("drag-over");if(event.dataTransfer.getData("text/plain")===String(state.index))checkClassification(box.dataset.answer,box);});
function feedback(message){const target=document.getElementById("feedback");target.textContent=message;target.classList.add("hint");}
app.addEventListener("submit",event=>{event.preventDefault();if(event.target.id!=="features")return;const picked=Array.from(new FormData(event.target).getAll("feature"),i=>featureOptions[Number(i)]);const expected=animals[state.index].features;if(picked.length===expected.length&&expected.every(f=>picked.includes(f))){award(1);state.screen="featureSuccess";render();}else {feedback("조금만 더 관찰해 볼까요? 알맞은 특징을 모두 골라요.");shake(event.target.querySelector(".options"));}});
app.addEventListener("click",event=>{
  const button=event.target.closest("button");if(!button)return;
  if(button.dataset.answer){checkClassification(button.dataset.answer,button);return;}
  if(button.dataset.detail!==undefined){state.detail=Number(button.dataset.detail);state.screen="detail";render();return;}
  switch(button.dataset.action){
    case "zoom":openPhoto(animals[state.index]);return;
    case "guide":state.screen="guide";break;
    case "begin":state.screen="explore";break;
    case "observed":award(0);state.stage=1;break;
    case "classify":state.screen="explore";state.stage=2;break;
    case "discover":
      if(state.screen!=="classificationSuccess")return;
      if(!state.discovered.includes(state.index)){
        state.discovered.push(state.index);latestDiscovery=state.index;
        pendingBadge=badges.find(b=>b.count===state.discovered.length)||null;
      }
      state.screen="discovery";break;
    case "next":if(state.index===animals.length-1)state.screen="result";else{state.index++;state.stage=0;state.screen="explore";}break;
    case "book":if(!["book","detail"].includes(state.screen))bookReturn=state.screen;state.screen="book";break;
    case "return":state.screen=bookReturn;break;
    case "restart":pendingBadge=null;latestDiscovery=null;state={screen:"guide",index:0,stage:0,score:0,discovered:[],awarded:new Set()};break;
    default:return;
  }render();
});
render(false);


