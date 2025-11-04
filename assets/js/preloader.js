// Simple preloader that hides when the page is fully loaded
(function(){
  function hidePreloader(){
    const p = document.getElementById('preloader');
    if(!p) return;
    p.style.opacity = '0';
    p.setAttribute('aria-hidden','true');
    setTimeout(()=>{ p.style.display='none'; },350);
  }
  // If page is already loaded (from cache), hide after small timeout
  if(document.readyState==='complete'){
    setTimeout(hidePreloader,250);
  } else {
    window.addEventListener('load', hidePreloader);
  }
})();