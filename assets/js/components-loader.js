// Load external component HTML files and inject into the page
(function(){
  async function loadComponent(id, url){
    const el = document.getElementById(id);
    if(!el) return;
    try{
      const res = await fetch(url);
      if(!res.ok) return;
      const html = await res.text();
      el.innerHTML = html;
      // after injecting header, wire nav interactions if present
      if(id==='site-header') attachNavHandlers();
    }catch(e){console.warn('component load failed',url,e)}
  }
  function attachNavHandlers(){
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    if(!navToggle || !navList) return;
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
    // close mobile nav on link click
    navList.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
      navList.classList.remove('show');
      if(navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // mount components
  loadComponent('site-header','components/header.html');
  loadComponent('site-footer','components/footer.html');
})();

// Inject favicon
if (!document.querySelector('link[rel="icon"]')) {
  const link16 = document.createElement('link');
  link16.rel = 'icon';
  link16.type = 'image/png';
  link16.sizes = '16x16';
  link16.href = '../assets/icons/favicon.png';
  document.head.appendChild(link16);

  const link32 = document.createElement('link');
  link32.rel = 'icon';
  link32.type = 'image/png';
  link32.sizes = '32x32';
  link32.href = '../assets/icons/favicon.png';
  document.head.appendChild(link32);

  const theme = document.createElement('meta');
  theme.name = 'theme-color';
  theme.content = '#ff8800';
  document.head.appendChild(theme);
}
