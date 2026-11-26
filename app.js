/* WHO AM I ONLINE? — Original student digital story.
   No analytics. No backend. No HTML injection from user-controlled strings.
   GSAP + Lenis are optional progressively-enhanced dependencies. */
(() => {
  'use strict';
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const isReduced = () => Boolean(prefersReducedMotion?.matches);
  const announce = (message) => { const node = $('#announcer'); if (node) node.textContent = message; };
  const bind = (element, eventName, handler, options) => element?.addEventListener(eventName, handler, options);
  const clamp = (number, minimum, maximum) => Math.min(maximum, Math.max(minimum, number));
  const make = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; };
  let soundOn = false;
  let audioContext = null;
  let lenis = null;
  let gsap = null;

  // Aural mode only after a real user gesture. No autoplay, recordings or streams.
  function tone(frequency = 330) {
    if (!soundOn || isReduced()) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioContext ??= new AudioContextClass();
      if (audioContext.state === 'suspended') void audioContext.resume();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * .78, audioContext.currentTime + .12);
      gain.gain.setValueAtTime(.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.045, audioContext.currentTime + .01);
      gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .17);
      oscillator.connect(gain); gain.connect(audioContext.destination);
      oscillator.start(); oscillator.stop(audioContext.currentTime + .19);
    } catch { soundOn = false; updateSoundButton(); }
  }
  function updateSoundButton() {
    const button = $('#sound-button');
    button?.setAttribute('aria-pressed', String(soundOn));
    button?.setAttribute('aria-label', soundOn ? 'Turn interface sounds off' : 'Turn interface sounds on');
    const label = $('.sound-status'); if (label) label.textContent = soundOn ? 'SOUND ON' : 'SOUND OFF';
  }
  bind($('#sound-button'), 'click', () => { soundOn = !soundOn; updateSoundButton(); tone(523); announce(soundOn ? 'Interface sounds enabled' : 'Interface sounds disabled'); });

  // Original spoken narration is an accessible, opt-in alternative to reading the intro.
  const narrateButton = $('#narrate-button');
  let narrationActive = false;
  const introNarration = 'Who am I online? The internet knows your highlights. But does it know you? What gets posted is a choice. What gets left out is a life. This interactive story is about identity, relationships, and the person behind the screen.';
  function setNarration(active) {
    narrationActive = active;
    narrateButton?.setAttribute('aria-pressed', String(active));
    if (narrateButton) narrateButton.textContent = active ? '■ STOP NARRATION' : '▶ HEAR THE INTRO';
  }
  bind(narrateButton, 'click', () => {
    const engine = window.speechSynthesis;
    if (!engine || typeof window.SpeechSynthesisUtterance !== 'function') { announce('Spoken narration is not supported in this browser. You can read the same introduction on the page.'); return; }
    try {
      if (narrationActive) { engine.cancel(); setNarration(false); return; }
      engine.cancel();
      const utterance = new window.SpeechSynthesisUtterance(introNarration);
      utterance.lang = 'en-AU'; utterance.rate = .95; utterance.pitch = 1;
      utterance.onend = () => setNarration(false);
      utterance.onerror = () => { setNarration(false); announce('Narration unavailable. The written story remains available.'); };
      setNarration(true);engine.speak(utterance);
    } catch {setNarration(false);announce('Narration unavailable. Please read the text on the page.');}
  });
  const menuButton = $('#menu-button'); const menu = $('#mobile-menu');
  function setMenu(open) {
    if (!menu || !menuButton) return;
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  bind(menuButton, 'click', () => { const open = menu?.hidden ?? true; setMenu(open); tone(400); });
  $$('#mobile-menu a').forEach(link => bind(link, 'click', () => setMenu(false)));
  bind(document, 'keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  // Mirror: a native range control provides pointer + touch + full keyboard support.
  const mirrorSlider = $('#mirror-slider'); const mirrorStage = $('#mirror-stage');
  function updateMirror(value) {
    const percent = clamp(Number(value) || 0, 0, 100);
    mirrorStage?.style.setProperty('--split', `${percent}%`);
    mirrorSlider?.setAttribute('aria-valuetext', `${percent}% curated view revealed`);
  }
  bind(mirrorSlider, 'input', (event) => { updateMirror(event.target.value); tone(190 + Number(event.target.value) * 2); });
  updateMirror(mirrorSlider?.value || 50);
  const takeaway = $('#thought-answer');
  bind($('#thought-reveal'), 'click', (event) => {
    const open = takeaway?.hidden;
    if (!takeaway) return;
    takeaway.hidden = !open;
    event.currentTarget.setAttribute('aria-expanded', String(open));
    const glyph = event.currentTarget.querySelector('span'); if (glyph) glyph.textContent = open ? '−' : '+';
    tone(open ? 510 : 330);
  });

  // The feed uses explicit, authored data; content never depends on a real account.
  const posts = Object.freeze([
    {id:'stage',tag:'TRENDING / FICTIONAL',title:'THE BIG MOMENT',caption:'A polished clip. A hundred invisible retakes.',icon:'✳',art:'stage',attention:100,connection:17,creativity:63},
    {id:'night',tag:'FRIENDS / FICTIONAL',title:'JUST CHECKING IN',caption:'One quiet message after a long day.',icon:'☾',art:'night',attention:12,connection:100,creativity:15},
    {id:'ball',tag:'HOBBY / FICTIONAL',title:'MISSED. TRIED AGAIN.',caption:"A practice session that wasn't perfect.",icon:'◉',art:'ball',attention:37,connection:67,creativity:85},
    {id:'notes',tag:'MADE BY A FRIEND / FICTIONAL',title:'A SMALL IDEA',caption:'Making something because it feels good.',icon:'✍',art:'notes',attention:42,connection:53,creativity:100}
  ]);
  const modes = Object.freeze({
    attention:{title:'The attention lens.',copy:'Big reactions move to the front. The most visible thing is not always the most meaningful.'},
    connection:{title:'The connection lens.',copy:'Shared moments and checking in rise to the top. Connection can look quieter than popularity.'},
    creativity:{title:'The creative lens.',copy:'Original ideas get priority. A feed can be a place to make things, not just perform.'}
  });
  function renderFeed(mode='attention') {
    const data = modes[mode]; if (!data) return;
    $$('.feed-filter').forEach(button => { const selected = button.dataset.mode === mode; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected)); });
    const name = $('#feed-lens-name'); const copy = $('#feed-lens-copy');
    if (name) name.textContent = data.title;
    if (copy) copy.textContent = data.copy;
    const grid = $('#post-grid'); if (!grid) return;
    const fragment = document.createDocumentFragment();
    posts.slice().sort((a,b) => b[mode] - a[mode]).forEach((post, index) => {
      const card = make('article', 'post-card'); card.dataset.postId = post.id;
      const art = make('div','post-art'); art.setAttribute('aria-hidden','true');
      const graphic = make('div',`graphic art-${post.art}`,post.icon); art.append(graphic);
      const tag = make('span','post-tag',`${String(index+1).padStart(2,'0')} / ${post.tag}`);
      const bottom = make('div','post-bottom');
      bottom.append(make('span','',`FEED ITEM ${String(index+1).padStart(2,'0')}`),make('strong','',post.title),make('p','',post.caption));
      card.append(art,tag,bottom);fragment.append(card);
    });
    grid.replaceChildren(fragment);
    if (!isReduced() && gsap) {
      try { gsap.fromTo($$('.post-card'),{opacity:0,y:18,scale:.97},{opacity:1,y:0,scale:1,duration:.7,stagger:.08,ease:'power3.out',clearProps:'transform,opacity'}); } catch { /* CSS + native DOM remains */ }
    }
    announce(`${data.title} Four fictional posts reordered.`);
  }
  $$('.feed-filter').forEach(button => bind(button,'click',() => { renderFeed(button.dataset.mode); tone(button.dataset.mode==='attention'?350:button.dataset.mode==='connection'?440:530); }));
  renderFeed();

  // Conversation outcomes are illustrative, not promises about interpersonal reactions.
  const conversations = Object.freeze({
    silence:{
      person:'Jordan',
      messages:[{who:'theirs',text:'hey, did you see my message about the project?'},{who:'mine',text:'yeah! I sent all the slides just now'},{who:'theirs',text:'k.'}],
      choices:[
        {label:'“Are you annoyed at me?”',reply:'Are you annoyed at me?',response:'No, sorry 😭 on the bus. I meant thanks!',heading:'You checked—but started with an assumption.',note:'It opened a conversation, although it could sound accusatory. A neutral question often leaves more room.'},
        {label:'“All good? Just checking.”',reply:'All good? Just checking.',response:'Yep! Sorry that was so short, I was rushing.',heading:'You asked without deciding what it meant.',note:'A neutral check-in can prevent a misunderstanding. A short reply might just mean someone is busy.'},
        {label:'“No worries, talk later.”',reply:'No worries, talk later.',response:'thanks! I’ll look properly when I get home.',heading:'You left space for another explanation.',note:'Not every short reply needs an immediate answer. Giving someone time can also be respectful.'}
      ]
    },
    photo:{
      person:'Sam',
      messages:[{who:'theirs',text:'hey you posted that group pic right?'},{who:'mine',text:'yeah from yesterday! why?'},{who:'theirs',text:'can you take it down? I don’t want it online.'}],
      choices:[
        {label:'“Of course. I’ll remove it.”',reply:'Of course. I’ll remove it.',response:'thank you, I appreciate it.',heading:"You respected the person's boundary.",note:'Someone can change their mind about being in a post. Asking permission before posting is even better.'},
        {label:'“But everyone else liked it.”',reply:'But everyone else liked it.',response:'I get that, but I’m not comfortable being there.',heading:'Popularity is not the same as permission.',note:"Likes from other people don't override someone's preference about their own image."},
        {label:'“Can we crop you out instead?”',reply:'Can we crop you out instead?',response:'maybe, but please remove the original first.',heading:'You tried a compromise.',note:'A compromise can be useful, but remove the unwanted post first and only upload a revision with consent.'}
      ]
    }
  });
  let currentScenario = 'silence'; let answeredChoice = -1;
  function makeBubble(message) { const bubble = make('div',`message-bubble${message.who === 'mine' ? ' mine' : ''}`,message.text); return bubble; }
  function renderScenario(scenario) {
    if (!conversations[scenario]) return;
    currentScenario = scenario; answeredChoice = -1;
    const data = conversations[scenario];
    const person = $('#chat-person'); if (person) person.textContent = data.person;
    const avatar = $('.chat-avatar'); if (avatar) avatar.textContent = data.person[0];
    const messages = $('#chat-messages'); if (messages) { messages.replaceChildren(make('div','message-caption','TODAY / FICTIONAL CONVERSATION'),...data.messages.map(makeBubble)); }
    const buttons = $('#chat-buttons'); if (buttons) {
      const fragment = document.createDocumentFragment();
      data.choices.forEach((choice, index) => {
        const button = make('button','chat-choice',choice.label); button.type='button';
        const arrow=make('span','', '↗'); arrow.setAttribute('aria-hidden','true'); button.append(arrow);
        bind(button,'click',()=>pickChoice(index)); fragment.append(button);
      }); buttons.replaceChildren(fragment);
    }
    const feedback = $('#chat-feedback');if (feedback) {feedback.hidden=true;feedback.replaceChildren();}
    const reset = $('#chat-reset');if (reset) reset.hidden=true;
    const controls=$('#chat-choices');if(controls) controls.hidden=false;
    $$('.scenario-tab').forEach(button=>{const active=button.dataset.scenario===scenario;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  }
  function pickChoice(index) {
    if (answeredChoice !== -1) return;
    const result = conversations[currentScenario]?.choices[index];if(!result)return;
    answeredChoice=index;
    const messages=$('#chat-messages');if(messages)messages.append(makeBubble({who:'mine',text:result.reply}),makeBubble({who:'theirs',text:result.response}));
    const feedback=$('#chat-feedback');if(feedback){feedback.replaceChildren(make('b','',result.heading),make('span','',result.note));feedback.hidden=false;}
    const controls=$('#chat-choices');if(controls)controls.hidden=true;
    const reset=$('#chat-reset');if(reset)reset.hidden=false;
    tone(490);
    announce(`${result.heading} ${result.note}`);
  }
  $$('.scenario-tab').forEach(button=>bind(button,'click',()=>{renderScenario(button.dataset.scenario);tone(410);}));
  bind($('#chat-reset'),'click',()=>{renderScenario(currentScenario);tone(320);});
  renderScenario('silence');

  // Personal manifesto: select exactly three fixed, safe principles, export offline SVG.
  const selectedRules = new Set(); const MAX_RULES = 3;
  function updatePrinciples() {
    const options=$$('.principle');
    options.forEach(button=>{const active=selectedRules.has(button.dataset.rule);button.setAttribute('aria-pressed',String(active));button.classList.toggle('selected',active);});
    const count=$('#selected-count'); if(count)count.textContent=String(selectedRules.size);
    const help=$('#code-help');if(help)help.textContent=selectedRules.size===MAX_RULES?'Manifesto ready. Copy it or save your original poster.':`Choose ${MAX_RULES-selectedRules.size} more ${MAX_RULES-selectedRules.size===1?'habit':'habits'} to complete your manifesto.`;
    const lines=$('#manifesto-rules');if(lines){const selected=[...selectedRules];lines.replaceChildren(...[0,1,2].map(i=>make('span','',selected[i]?`${String(i+1).padStart(2,'0')} / ${selected[i].toUpperCase()}`:`${String(i+1).padStart(2,'0')} / YOUR ${['FIRST','SECOND','THIRD'][i]} RULE GOES HERE`)));}
    for(const id of ['copy-code','download-code']){const button=$(`#${id}`);if(button)button.disabled=selectedRules.size!==MAX_RULES;}
  }
  $$('.principle').forEach(button=>bind(button,'click',()=>{
    const value=button.dataset.rule;if(!value)return;
    if(selectedRules.has(value))selectedRules.delete(value);
    else if(selectedRules.size < MAX_RULES)selectedRules.add(value);
    else {announce('Maximum three rules. Remove one to choose another.');return;}
    updatePrinciples();tone(selectedRules.size===3?590:390);
  }));
  updatePrinciples();
  function codeText(){return `MY DIGITAL CODE — WHO AM I ONLINE?\n\n${[...selectedRules].map((rule,i)=>`${i+1}. ${rule}`).join('\n')}\n\nI am more than my feed.\nCreated with WHO AM I ONLINE? — A student digital story by Avi.`;}
  bind($('#copy-code'),'click',async()=>{
    if(selectedRules.size!==MAX_RULES)return;
    try {if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(codeText());announce('Your digital code copied to the clipboard.');const button=$('#copy-code');if(button){const old=button.firstChild; if(old&&old.nodeType===3){old.textContent='COPIED! ';window.setTimeout(()=>{old.textContent='COPY MY CODE ';},1900);}}tone(620);}
    catch{announce('Clipboard access is unavailable here. Use Save as SVG instead.');}
  });
  const xmlEscape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
  function posterSvg(){
    const lines=[...selectedRules].map((rule,i)=>`<text x="64" y="${675+i*59}" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#191916">${xmlEscape(String(i+1).padStart(2,'0')+' / '+rule)}</text><line x1="64" x2="730" y1="${691+i*59}" y2="${691+i*59}" stroke="#191916"/>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#EA4B2B"/><g fill="none" stroke="#191916" opacity=".18">${[170,280,390,500,610].map(r=>`<circle cx="710" cy="210" r="${r}"/>`).join('')}</g><text x="64" y="75" font-family="Arial,sans-serif" font-size="18" font-weight="700">PERSONAL FIELD GUIDE — 001</text><path d="M64 95H740" stroke="#191916"/><g font-family="Arial Black,Arial,sans-serif" font-size="125" letter-spacing="-8" font-weight="900" fill="#191916"><text x="54" y="250">I AM</text><text x="54" y="372">MORE</text><text x="54" y="494">THAN</text><text x="54" y="616">MY FEED.</text></g>${lines}<path d="M64 911H740" stroke="#191916"/><text x="64" y="955" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#191916">WHO AM I ONLINE? / MADE BY ME. NOT AN ALGORITHM.</text></svg>`;
  }
  bind($('#download-code'),'click',()=>{
    if(selectedRules.size!==MAX_RULES)return;
    try{const blob=new Blob([posterSvg()],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='my-digital-code.svg';document.body.append(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),2000);tone(630);announce('Your digital manifesto SVG download has been prepared.');}
    catch{announce('Your browser could not create the poster. Try copying the text instead.');}
  });

  // Progress, controlled progressive animation, and defensive optional engines.
  let scrollScheduled=false;
  function updateProgress(){
    scrollScheduled=false;
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const percent=clamp(Math.round(window.scrollY/max*100),0,100);
    const fill=$('#reading-fill');if(fill)fill.style.width=`${percent}%`;
    $('#reading-track')?.setAttribute('aria-valuenow',String(percent));
  }
  bind(window,'scroll',()=>{if(!scrollScheduled){scrollScheduled=true;window.requestAnimationFrame(updateProgress);}},{passive:true});
  let resizeTimer;
  bind(window,'resize',()=>{window.clearTimeout(resizeTimer);resizeTimer=window.setTimeout(updateProgress,160);},{passive:true});
  updateProgress();
  try{
    if('IntersectionObserver'in window){
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
      }),{threshold:.15});
      $$('.stat-card').forEach(node=>observer.observe(node));
    }else{$$('.stat-card').forEach(node=>node.classList.add('is-visible'));}
  }catch{$$('.stat-card').forEach(node=>node.classList.add('is-visible'));}
  // Prevent below-the-fold content from being hidden without script / unsupported observers.
  try{
    if(!isReduced()&&'IntersectionObserver'in window){
      const targets=$$('.chapter .big-heading,.mirror-device,.conversation-lab,.statistics,.code-builder');
      const show=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('ready');show.unobserve(entry.target);}}),{rootMargin:'0px 0px 60px 0px',threshold:.05});
      targets.forEach(node=>{node.classList.add('reveal');show.observe(node);});
    }
  }catch{/* readable native layout is retained */}
  try{
    if(!isReduced()&&typeof window.gsap !== 'undefined'){
      gsap=window.gsap;
      gsap.fromTo('.hero-h1-line',{opacity:0,y:55},{opacity:1,y:0,duration:1.35,stagger:.14,ease:'power3.out',clearProps:'all'});
      gsap.fromTo('.hero-art-frame',{opacity:0,rotate:13,scale:.88},{opacity:1,rotate:5,scale:1,duration:1.4,delay:.18,ease:'power3.out',clearProps:'opacity,scale'});
    }
  }catch{gsap=null;}
  try{
    if(!isReduced()&&typeof window.Lenis==='function'){
      lenis=new window.Lenis({duration:1.05,easing:t=>1-Math.pow(1-t,4),smoothWheel:true,touchMultiplier:1,autoRaf:true});
    }
  }catch{lenis=null;}
  bind(prefersReducedMotion,'change',()=>{if(isReduced()){try{lenis?.destroy();}catch{}lenis=null;}else if(!lenis&&typeof window.Lenis==='function'){try{lenis=new window.Lenis({duration:1.05,autoRaf:true});}catch{}}});
  // Magnetic effects use transform only; disabled on touch and for reduced motion.
  if(window.matchMedia?.('(hover:hover) and (pointer:fine)').matches){
    $$('.magnetic').forEach(element=>{
      bind(element,'pointermove',event=>{if(isReduced())return;const bounds=element.getBoundingClientRect();const x=(event.clientX-bounds.left-bounds.width/2)*.12;const y=(event.clientY-bounds.top-bounds.height/2)*.12;element.style.transform=`translate3d(${x}px,${y}px,0)`;});
      bind(element,'pointerleave',()=>{element.style.transform='';});
    });
  }
  bind(document,'visibilitychange',()=>{if(document.hidden&&soundOn){soundOn=false;updateSoundButton();}});
  bind(window,'pagehide',()=>{try{lenis?.destroy();}catch{}try{audioContext?.close();}catch{}try{window.speechSynthesis?.cancel();}catch{}});
})();
