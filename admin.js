async function loadData(){
  const stored = localStorage.getItem('videoLibraryData');
  if(stored){
    const data = JSON.parse(stored);
    return data.videos || data;
  }
  const res = await fetch('videos.json');
  const data = await res.json();
  return data.videos;
}

function renderList(videos){
  const list = document.getElementById('list');
  list.innerHTML='';
  videos.forEach((v,i)=>{
    const card = document.createElement('div');
    card.className='card';
    const thumb = document.createElement('img');
    thumb.className='thumb';
    thumb.src = v.type==='youtube' ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : (v.poster || 'https://via.placeholder.com/480x270?text=Video');
    const body = document.createElement('div');
    body.className='card-body';
    const title = document.createElement('h3');
    title.className='title';
    title.innerText = v.title;
    const meta = document.createElement('div');
    meta.className='meta';
    meta.innerText = v.duration || '';
    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.addEventListener('click',()=>{ videos.splice(i,1); renderList(videos); });

    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(remove);
    card.appendChild(thumb);
    card.appendChild(body);
    list.appendChild(card);
  });
}

function downloadJSON(videos){
  const blob = new Blob([JSON.stringify({videos},null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'videos.json';
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const form = document.getElementById('addForm');
  const typeSelect = form.elements['type'];
  const idLabel = document.getElementById('idLabel');
  const srcLabel = document.getElementById('srcLabel');

  let videos = await loadData();
  renderList(videos);

  const embedLabel = document.getElementById('embedLabel');
  
  function updateLabels(){
    const type = typeSelect.value;
    
    if(type==='youtube'){
      idLabel.textContent='YouTube ID';
      idLabel.style.display='block';
      srcLabel.style.display='none';
      embedLabel.style.display='none';
    } else if(type==='vimeo'){
      idLabel.textContent='Vimeo ID';
      idLabel.style.display='block';
      srcLabel.style.display='none';
      embedLabel.style.display='none';
    } else if(type==='gdrive'){
      idLabel.textContent='Google Drive File ID';
      idLabel.style.display='block';
      srcLabel.style.display='none';
      embedLabel.style.display='none';
    } else if(type==='mp4'){
      idLabel.style.display='none';
      srcLabel.style.display='block';
      embedLabel.style.display='none';
    } else if(type==='embed'){
      idLabel.style.display='none';
      srcLabel.style.display='none';
      embedLabel.style.display='block';
    }
  }
  
  typeSelect.addEventListener('change', updateLabels);
  updateLabels();

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const f = e.target.elements;
    const entry = { type: f['type'].value, title: f['title'].value };
    if(['youtube','vimeo','gdrive'].includes(entry.type)) entry.id = f['id'].value;
    if(entry.type==='mp4') entry.src = f['src'].value;
    if(entry.type==='embed') entry.code = f['embed'].value;
    if(f['poster'].value) entry.poster = f['poster'].value;
    if(f['duration'].value) entry.duration = f['duration'].value;
    videos.push(entry);
    renderList(videos);
    form.reset();
    updateLabels();
  });

  document.getElementById('saveLocal').addEventListener('click',()=>{
    localStorage.setItem('videoLibraryData', JSON.stringify({videos}));
    alert('Saved to localStorage. The public site will use this data when present.');
  });

  document.getElementById('downloadJson').addEventListener('click',()=> downloadJSON(videos));

  document.getElementById('clearLocal').addEventListener('click',()=>{
    if(confirm('Clear local saved library?')){
      localStorage.removeItem('videoLibraryData');
      alert('Local library cleared.');
    }
  });
});
