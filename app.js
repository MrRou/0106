async function loadLibrary(){
  try{
    const stored = localStorage.getItem('videoLibraryData');
    if(stored){
      const data = JSON.parse(stored);
      renderLibrary(data.videos || data);
      return;
    }
    const res = await fetch('videos.json');
    const data = await res.json();
    renderLibrary(data.videos);
  }catch(e){
    console.error('Failed to load videos.json',e);
    document.getElementById('library').innerText = 'Failed to load video list.';
  }
}

function renderLibrary(videos){
  const container = document.getElementById('library');
  container.innerHTML='';
  videos.forEach(v=>{
    const card = document.createElement('div');
    card.className='card';
    card.tabIndex=0;

    const thumb = document.createElement('img');
    thumb.className='thumb';
    if(v.type==='youtube'){
      thumb.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
      thumb.alt = v.title;
    } else if(v.type==='vimeo'){
      thumb.src = v.poster || `https://vimeo.com/api/v2/video/${v.id}.json`;
      thumb.alt = v.title;
      if(!v.poster) thumb.src = 'https://via.placeholder.com/480x270?text=Vimeo';
    } else if(v.type==='gdrive'){
      thumb.src = v.poster || 'https://via.placeholder.com/480x270?text=Google%20Drive';
      thumb.alt = v.title;

    body.appendChild(title);
    body.appendChild(meta);
    card.appendChild(thumb);
    card.appendChild(body);

    card.addEventListener('click',()=>openPlayer(v));
    card.addEventListener('keypress',e=>{ if(e.key==='Enter') openPlayer(v); });

    container.appendChild(card);
  });
}

function openPlayer(v){
  const modal = document.getElementById('playerModal');
  const container = document.getElementById('playerContainer');
  container.innerHTML='';
  if(v.type==='youtube'){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    container.appendChild(iframe);
  } else if(v.type==='vimeo'){
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${v.id}?autoplay=1`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-presentation');
    container.appendChild(iframe);
  } else if(v.type==='gdrive'){
    const iframe = document.createElement('iframe');
    iframe.src = `https://drive.google.com/file/d/${v.id}/preview`;
    iframe.allow = 'autoplay';
    container.appendChild(iframe);
  } else if(v.type==='mp4'){
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    const src = document.createElement('source');
    src.src = v.src;
    src.type = 'video/mp4';
    video.appendChild(src);
    container.appendChild(video);
  }
  modal.classList.remove('hidden');
}

function closePlayer(){
  const modal = document.getElementById('playerModal');
  const container = document.getElementById('playerContainer');
  container.innerHTML='';
  modal.classList.add('hidden');
}

document.getElementById('closeBtn').addEventListener('click',closePlayer);
document.getElementById('playerModal').addEventListener('click',e=>{ if(e.target.id==='playerModal') closePlayer(); });

function saveLibraryToLocal(videos){
  const payload = {videos};
  localStorage.setItem('videoLibraryData', JSON.stringify(payload));
  renderLibrary(videos);
}

function clearLocalLibrary(){
  localStorage.removeItem('videoLibraryData');
  loadLibrary();
}

window.saveLibraryToLocal = saveLibraryToLocal;
window.clearLocalLibrary = clearLocalLibrary;
window.loadLibrary = loadLibrary;

loadLibrary();
