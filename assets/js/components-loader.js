// Load external component HTML files and inject into the page
(function(){
  async function loadComponent(id, url){
    const el = document.getElementById(id);
    if(!el) return;
    try {
      const res = await fetch(url);
      if(!res.ok) return;
      const html = await res.text();
      el.innerHTML = html;

      // Adjust paths dynamically
      fixHeaderLinks();

      // After injecting header, wire nav interactions if present
      if(id === 'site-header') attachNavHandlers();
    } catch(e) {
      console.warn('component load failed', url, e);
    }
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

    // Close mobile nav on link click
    navList.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
      navList.classList.remove('show');
      if(navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Fix links depending on where the page is located
  function fixHeaderLinks(){
    const isSubpage = window.location.pathname.includes('/pages/');
    const prefix = isSubpage ? '../' : '';

    // Fix logo
    const logo = document.getElementById('site-logo');
    if(logo){
      logo.src = `${prefix}assets/images/logo/sceneflickslogo.png`;
    }

    // Fix nav links
    document.querySelectorAll('.nav-list a').forEach(link => {
      const href = link.getAttribute('href');
      if(!href) return;
      if(!href.startsWith('http') && !href.startsWith(prefix)){
        link.setAttribute('href', prefix + href.replace(/^\/+/,''));
      }
    });
  }

  // Detect path depth (root or /pages/)
  const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';

  // Mount components with correct paths
  loadComponent('site-header', `${pathPrefix}components/header.html`);
  loadComponent('site-footer', `${pathPrefix}components/footer.html`);
})();

// Inject favicon (works both root & pages)
(function(){
  if (!document.querySelector('link[rel="icon"]')) {
    const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
    const link16 = document.createElement('link');
    link16.rel = 'icon';
    link16.type = 'image/png';
    link16.sizes = '16x16';
    link16.href = `${pathPrefix}assets/icons/favicon.png`;
    document.head.appendChild(link16);

    const link32 = document.createElement('link');
    link32.rel = 'icon';
    link32.type = 'image/png';
    link32.sizes = '32x32';
    link32.href = `${pathPrefix}assets/icons/favicon.png`;
    document.head.appendChild(link32);

    const theme = document.createElement('meta');
    theme.name = 'theme-color';
    theme.content = '#cd8510ff';
    document.head.appendChild(theme);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const baseURL = window.location.origin + "/sceneflicksservices";
  document.querySelectorAll("header a, footer a").forEach(link => {
    let href = link.getAttribute("href");
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
      link.setAttribute("href", baseURL + href.replace("..", ""));
    }
  });
});

