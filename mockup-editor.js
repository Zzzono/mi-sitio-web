(function(){
'use strict';

// ── STATE ──
var selectedMockup = 'negro-espalda';
var designDataURL = null;
var designNatW = 0, designNatH = 0;
var isFlipped = false;
var isDragging = false;
var dragStartX = 0, dragStartY = 0, elStartX = 0, elStartY = 0;
var pinchStartDist = 0, pinchStartSize = 0;

// ── DOM ──
var mockupDisplay = document.getElementById('mockup-display');
var designEl = document.getElementById('design-el');
var designDisplay = document.getElementById('design-display');
var previewFrame = document.getElementById('preview-frame');
var inputDesign = document.getElementById('input-design');
var uploadInner = document.getElementById('upload-inner');
var lblDesign = document.getElementById('lbl-design');
var designLoaded = document.getElementById('design-loaded');
var designFilename = document.getElementById('design-filename');
var bgLoading = document.getElementById('bg-loading');
var btnRemove = document.getElementById('btn-remove');
var btnRemoveBg = document.getElementById('btn-remove-bg');
var btnCenter = document.getElementById('btn-center');
var btnFlip = document.getElementById('btn-flip');
var btnResetPos = document.getElementById('btn-reset-pos');
var btnDownload = document.getElementById('btn-download');
var btnWhatsapp = document.getElementById('btn-whatsapp');
var slSize = document.getElementById('sl-size');
var slOpacity = document.getElementById('sl-opacity');
var slRotate = document.getElementById('sl-rotate');
var valSize = document.getElementById('val-size');
var valOpacity = document.getElementById('val-opacity');
var valRotate = document.getElementById('val-rotate');
var toastEl = document.getElementById('toast');
var mobileHint = document.getElementById('mobile-hint');

function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(function(){ toastEl.classList.remove('show'); }, 2500);
}

// ── MOCKUP SELECTOR ──
var thumbs = document.querySelectorAll('.me-mockup-thumb');
for(var i=0; i<thumbs.length; i++){
  thumbs[i].addEventListener('click', function(){
    for(var j=0; j<thumbs.length; j++) thumbs[j].classList.remove('active');
    this.classList.add('active');
    selectedMockup = this.getAttribute('data-mockup');
    mockupDisplay.src = 'assets/mockup-' + selectedMockup + '.jpg.jpg';
  });
}

// ── DESIGN UPLOAD — NO auto bg removal ──
inputDesign.addEventListener('change', function(e){
  if(e.target.files[0]) handleFile(e.target.files[0]);
});

lblDesign.addEventListener('dragover', function(e){ e.preventDefault(); uploadInner.style.borderColor='rgba(255,255,255,.4)'; });
lblDesign.addEventListener('dragleave', function(){ uploadInner.style.borderColor=''; });
lblDesign.addEventListener('drop', function(e){
  e.preventDefault(); uploadInner.style.borderColor='';
  if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});

function handleFile(file){
  var reader = new FileReader();
  reader.onload = function(e){
    designDataURL = e.target.result;
    var img = new Image();
    img.onload = function(){
      designNatW = img.naturalWidth;
      designNatH = img.naturalHeight;
      showDesign(file.name);
      toast('Diseno cargado');
    };
    img.src = designDataURL;
  };
  reader.readAsDataURL(file);
}

function showDesign(name){
  designDisplay.src = designDataURL;
  designEl.style.display = 'block';
  designLoaded.style.display = 'flex';
  designFilename.textContent = name;
  lblDesign.style.display = 'none';
  isFlipped = false;
  slRotate.value = 0; valRotate.textContent = '0';
  slOpacity.value = 100; valOpacity.textContent = '100%';
  slSize.value = 35; valSize.textContent = '35%';
  applyDesignTransform();
  centerDesign();
  // Show mobile hint briefly
  if(mobileHint){
    mobileHint.style.opacity = '1';
    setTimeout(function(){ mobileHint.style.opacity = '0'; }, 3000);
  }
}

// ── REMOVE DESIGN ──
btnRemove.addEventListener('click', function(){
  designEl.style.display = 'none';
  designLoaded.style.display = 'none';
  designDataURL = null;
  lblDesign.style.display = '';
  inputDesign.value = '';
});

// ── REMOVE BACKGROUND (manual button) ──
btnRemoveBg.addEventListener('click', function(){
  if(!designDataURL) return;
  btnRemoveBg.textContent = 'Procesando...';
  btnRemoveBg.disabled = true;

  var img = new Image();
  img.onload = function(){
    var c = document.createElement('canvas');
    var cx = c.getContext('2d');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    cx.drawImage(img, 0, 0);
    var data = cx.getImageData(0, 0, c.width, c.height);
    var d = data.data;

    // Sample edges for bg color
    var rS=0,gS=0,bS=0,cnt=0;
    var sw=Math.min(15, Math.floor(c.width/4));
    var sh=Math.min(15, Math.floor(c.height/4));
    for(var y=0;y<sh;y++) for(var x=0;x<sw;x++){
      var corners = [
        (y*c.width+x)*4,
        (y*c.width+(c.width-1-x))*4,
        ((c.height-1-y)*c.width+x)*4,
        ((c.height-1-y)*c.width+(c.width-1-x))*4
      ];
      for(var ci=0;ci<4;ci++){
        var idx=corners[ci];
        rS+=d[idx]; gS+=d[idx+1]; bS+=d[idx+2]; cnt++;
      }
    }
    var rA=Math.round(rS/cnt), gA=Math.round(gS/cnt), bA=Math.round(bS/cnt);

    var tol=42;
    for(var p=0;p<d.length;p+=4){
      var dr=d[p]-rA, dg=d[p+1]-gA, db=d[p+2]-bA;
      var dist=Math.sqrt(dr*dr+dg*dg+db*db);
      if(dist<tol) d[p+3]=0;
      else if(dist<tol+18) d[p+3]=Math.min(d[p+3], Math.round(((dist-tol)/18)*255));
    }
    cx.putImageData(data, 0, 0);

    designDataURL = c.toDataURL('image/png');
    designDisplay.src = designDataURL;
    designNatW = c.width;
    designNatH = c.height;
    btnRemoveBg.textContent = 'Fondo removido';
    btnRemoveBg.style.borderColor = 'rgba(0,200,100,.4)';
    btnRemoveBg.style.color = '#0c8';
    toast('Fondo removido');
  };
  img.src = designDataURL;
});

// ── APPLY TRANSFORM ──
function applyDesignTransform(){
  var frameW = previewFrame.offsetWidth;
  var pct = slSize.value / 100;
  var dw = frameW * pct;
  var aspect = designNatH / designNatW;
  var dh = dw * aspect;
  designEl.style.width = dw + 'px';
  designEl.style.height = dh + 'px';
  var rot = slRotate.value;
  var scaleX = isFlipped ? -1 : 1;
  designDisplay.style.transform = 'rotate(' + rot + 'deg) scaleX(' + scaleX + ')';
  designDisplay.style.opacity = slOpacity.value / 100;
}

// ── SLIDERS ──
slSize.addEventListener('input', function(){
  valSize.textContent = this.value + '%';
  var oldCX = designEl.offsetLeft + designEl.offsetWidth/2;
  var oldCY = designEl.offsetTop + designEl.offsetHeight/2;
  applyDesignTransform();
  designEl.style.left = (oldCX - designEl.offsetWidth/2) + 'px';
  designEl.style.top = (oldCY - designEl.offsetHeight/2) + 'px';
});
slOpacity.addEventListener('input', function(){
  valOpacity.textContent = this.value + '%';
  applyDesignTransform();
});
slRotate.addEventListener('input', function(){
  valRotate.textContent = this.value + '\u00b0';
  applyDesignTransform();
});

// ── CENTER ──
function centerDesign(){
  var fw = previewFrame.offsetWidth;
  var fh = previewFrame.offsetHeight;
  designEl.style.left = ((fw - designEl.offsetWidth)/2) + 'px';
  designEl.style.top = ((fh - designEl.offsetHeight)/2) + 'px';
}
btnCenter.addEventListener('click', function(){ centerDesign(); toast('Centrado'); });

// ── FLIP ──
btnFlip.addEventListener('click', function(){
  isFlipped = !isFlipped;
  applyDesignTransform();
});

// ── RESET ──
btnResetPos.addEventListener('click', function(){
  slSize.value = 35; valSize.textContent = '35%';
  slOpacity.value = 100; valOpacity.textContent = '100%';
  slRotate.value = 0; valRotate.textContent = '0';
  isFlipped = false;
  applyDesignTransform();
  centerDesign();
  toast('Reiniciado');
});

// ──────────────────────────────────────
// ── TOUCH & MOUSE: DRAG + PINCH ZOOM ──
// ──────────────────────────────────────

function getPtr(e){
  if(e.touches && e.touches.length > 0) return {x:e.touches[0].clientX, y:e.touches[0].clientY};
  return {x:e.clientX, y:e.clientY};
}

function getPinchDist(e){
  var dx = e.touches[0].clientX - e.touches[1].clientX;
  var dy = e.touches[0].clientY - e.touches[1].clientY;
  return Math.sqrt(dx*dx + dy*dy);
}

// Mouse drag
designEl.addEventListener('mousedown', function(e){
  e.preventDefault();
  isDragging = true;
  designEl.classList.add('dragging');
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  elStartX = designEl.offsetLeft;
  elStartY = designEl.offsetTop;
});

document.addEventListener('mousemove', function(e){
  if(!isDragging) return;
  designEl.style.left = (elStartX + e.clientX - dragStartX) + 'px';
  designEl.style.top = (elStartY + e.clientY - dragStartY) + 'px';
});

document.addEventListener('mouseup', function(){
  isDragging = false;
  designEl.classList.remove('dragging');
});

// Touch: 1 finger = drag, 2 fingers = pinch zoom
designEl.addEventListener('touchstart', function(e){
  e.preventDefault();
  if(e.touches.length === 1){
    // Single finger drag
    isDragging = true;
    designEl.classList.add('dragging');
    dragStartX = e.touches[0].clientX;
    dragStartY = e.touches[0].clientY;
    elStartX = designEl.offsetLeft;
    elStartY = designEl.offsetTop;
  } else if(e.touches.length === 2){
    // Pinch start
    isDragging = false;
    pinchStartDist = getPinchDist(e);
    pinchStartSize = parseInt(slSize.value);
  }
}, {passive:false});

document.addEventListener('touchmove', function(e){
  if(e.touches.length === 1 && isDragging){
    e.preventDefault();
    designEl.style.left = (elStartX + e.touches[0].clientX - dragStartX) + 'px';
    designEl.style.top = (elStartY + e.touches[0].clientY - dragStartY) + 'px';
  } else if(e.touches.length === 2 && pinchStartDist > 0){
    e.preventDefault();
    var currentDist = getPinchDist(e);
    var scale = currentDist / pinchStartDist;
    var newSize = Math.round(pinchStartSize * scale);
    newSize = Math.max(5, Math.min(90, newSize));

    // Keep centered while resizing
    var oldCX = designEl.offsetLeft + designEl.offsetWidth/2;
    var oldCY = designEl.offsetTop + designEl.offsetHeight/2;

    slSize.value = newSize;
    valSize.textContent = newSize + '%';
    applyDesignTransform();

    designEl.style.left = (oldCX - designEl.offsetWidth/2) + 'px';
    designEl.style.top = (oldCY - designEl.offsetHeight/2) + 'px';
  }
}, {passive:false});

document.addEventListener('touchend', function(e){
  if(e.touches.length < 2) pinchStartDist = 0;
  if(e.touches.length === 0){
    isDragging = false;
    designEl.classList.remove('dragging');
  }
});

// ── CORNER RESIZE HANDLES (PC) ──
var isHandleResize = false;
var handleDir = '';
var handleStartX = 0, handleStartW = 0, handleStartH = 0, handleStartL = 0, handleStartT = 0;

var handles = document.querySelectorAll('.me-handle');
for(var hi=0; hi<handles.length; hi++){
  handles[hi].addEventListener('mousedown', function(e){
    e.preventDefault();
    e.stopPropagation();
    isHandleResize = true;
    handleDir = this.getAttribute('data-dir');
    handleStartX = e.clientX;
    handleStartW = designEl.offsetWidth;
    handleStartH = designEl.offsetHeight;
    handleStartL = designEl.offsetLeft;
    handleStartT = designEl.offsetTop;
  });
}

document.addEventListener('mousemove', function(e){
  if(!isHandleResize) return;
  var dx = e.clientX - handleStartX;
  var aspect = designNatW / designNatH;
  var newW, newH;

  if(handleDir === 'br' || handleDir === 'tr'){
    newW = Math.max(30, handleStartW + dx);
  } else {
    newW = Math.max(30, handleStartW - dx);
  }
  newH = newW / aspect;

  designEl.style.width = newW + 'px';
  designEl.style.height = newH + 'px';

  if(handleDir === 'tl'){
    designEl.style.left = (handleStartL + handleStartW - newW) + 'px';
    designEl.style.top = (handleStartT + handleStartH - newH) + 'px';
  } else if(handleDir === 'bl'){
    designEl.style.left = (handleStartL + handleStartW - newW) + 'px';
  } else if(handleDir === 'tr'){
    designEl.style.top = (handleStartT + handleStartH - newH) + 'px';
  }

  // Sync slider
  var pct = Math.round((newW / previewFrame.offsetWidth) * 100);
  slSize.value = Math.max(5, Math.min(90, pct));
  valSize.textContent = slSize.value + '%';
});

document.addEventListener('mouseup', function(){
  isHandleResize = false;
});

// ── MOUSE WHEEL ZOOM (PC) ──
previewFrame.addEventListener('wheel', function(e){
  if(!designDataURL || designEl.style.display === 'none') return;
  e.preventDefault();
  var delta = e.deltaY > 0 ? -2 : 2;
  var newSize = Math.max(5, Math.min(90, parseInt(slSize.value) + delta));

  var oldCX = designEl.offsetLeft + designEl.offsetWidth/2;
  var oldCY = designEl.offsetTop + designEl.offsetHeight/2;

  slSize.value = newSize;
  valSize.textContent = newSize + '%';
  applyDesignTransform();

  designEl.style.left = (oldCX - designEl.offsetWidth/2) + 'px';
  designEl.style.top = (oldCY - designEl.offsetHeight/2) + 'px';
}, {passive:false});

// ── DOWNLOAD ──
btnDownload.addEventListener('click', function(){
  if(!designDataURL){ toast('Sube un diseno primero'); return; }
  exportMockup(function(dataURL){
    var a = document.createElement('a');
    a.download = 'bravd-mockup-' + selectedMockup + '-' + Date.now() + '.png';
    a.href = dataURL;
    a.click();
    toast('Descargando...');
  });
});

function exportMockup(callback){
  toDataURL(mockupDisplay.src, function(mockupData){
    var mImg = new Image();
    mImg.onload = function(){
      var c = document.createElement('canvas');
      var cx = c.getContext('2d');
      c.width = mImg.naturalWidth;
      c.height = mImg.naturalHeight;
      cx.drawImage(mImg, 0, 0, c.width, c.height);

      var scaleX = c.width / previewFrame.offsetWidth;
      var scaleY = c.height / previewFrame.offsetHeight;

      var dLeft = designEl.offsetLeft * scaleX;
      var dTop = designEl.offsetTop * scaleY;
      var dW = designEl.offsetWidth * scaleX;
      var dH = designEl.offsetHeight * scaleY;

      var dImg = new Image();
      dImg.onload = function(){
        cx.globalAlpha = slOpacity.value / 100;
        var rot = parseFloat(slRotate.value) * Math.PI / 180;
        var flip = isFlipped ? -1 : 1;
        cx.save();
        cx.translate(dLeft + dW/2, dTop + dH/2);
        cx.rotate(rot);
        cx.scale(flip, 1);
        cx.drawImage(dImg, -dW/2, -dH/2, dW, dH);
        cx.restore();
        callback(c.toDataURL('image/png'));
      };
      dImg.src = designDataURL;
    };
    mImg.src = mockupData;
  });
}

function toDataURL(url, cb){
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    var reader = new FileReader();
    reader.onloadend = function(){ cb(reader.result); };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

// ── WHATSAPP — MODAL FLOW ──
var waModal = document.getElementById('wa-modal');
var waModalClose = document.getElementById('wa-modal-close');
var waSend = document.getElementById('wa-send');
var waNotas = document.getElementById('wa-notas');
var waPriceUnit = document.getElementById('wa-price-unit');
var waPriceTotal = document.getElementById('wa-price-total');
var waPriceTier = document.getElementById('wa-price-tier');
var waTotalQty = document.getElementById('wa-total-qty');
var szInputs = document.querySelectorAll('.sz-input');

function getPrice(qty){
  if(qty >= 12) return 350;
  if(qty >= 3) return 400;
  return 500;
}

function getTotalQty(){
  var total = 0;
  for(var i=0; i<szInputs.length; i++){
    total += parseInt(szInputs[i].value) || 0;
  }
  return total;
}

function updatePricing(){
  var qty = getTotalQty();
  waTotalQty.textContent = qty;
  if(qty < 1){
    waPriceUnit.textContent = 'C$ 500';
    waPriceTotal.textContent = 'C$ 0';
    waPriceTier.textContent = 'Agrega al menos 1 camisa';
    return;
  }
  var unit = getPrice(qty);
  var total = unit * qty;
  waPriceUnit.textContent = 'C$ ' + unit;
  waPriceTotal.textContent = 'C$ ' + total.toLocaleString();
  if(qty >= 12) waPriceTier.textContent = '12+ camisas: C$350 c/u — Mejor precio';
  else if(qty >= 3) waPriceTier.textContent = '3-11 camisas: C$400 c/u';
  else waPriceTier.textContent = '1-2 camisas: C$500 c/u — Pedi 3+ para mejor precio';
}

for(var si=0; si<szInputs.length; si++){
  szInputs[si].addEventListener('input', updatePricing);
}

// Open modal
btnWhatsapp.addEventListener('click', function(){
  if(!designDataURL){ toast('Sube un diseno primero'); return; }
  updatePricing();
  waModal.style.display = 'flex';
});

// Close modal
waModalClose.addEventListener('click', function(){ waModal.style.display = 'none'; });
waModal.addEventListener('click', function(e){
  if(e.target === waModal) waModal.style.display = 'none';
});

// Send
waSend.addEventListener('click', function(){
  var qty = getTotalQty();
  if(qty < 1){ toast('Agrega al menos 1 camisa'); return; }

  exportMockup(function(dataURL){
    var a = document.createElement('a');
    a.download = 'bravd-mockup.png';
    a.href = dataURL;
    a.click();
  });

  var colorMap = {'negro-espalda':'Negra','negro-frente':'Negra','blanco-frente':'Blanca','blanco-espalda':'Blanca'};
  var sideMap = {'negro-espalda':'Espalda','negro-frente':'Frente','blanco-frente':'Frente','blanco-espalda':'Espalda'};
  var unit = getPrice(qty);
  var total = unit * qty;

  // Build sizes list
  var tallasText = '';
  for(var i=0; i<szInputs.length; i++){
    var q = parseInt(szInputs[i].value) || 0;
    if(q > 0) tallasText += szInputs[i].getAttribute('data-size') + ': ' + q + '  ';
  }

  var parts = [
    'Hola Bravd Studios!','',
    '*Mi pedido:*',
    'Camisa: ' + (colorMap[selectedMockup]||selectedMockup),
    'Vista: ' + (sideMap[selectedMockup]||''),
    'Tallas: ' + tallasText.trim(),
    'Total: ' + qty + ' camisas',
    'Precio: C$' + unit + ' c/u = C$' + total + ' total'
  ];

  var notas = waNotas.value.trim();
  if(notas) parts.push('Notas: ' + notas);

  parts.push('');
  parts.push('_Adjunto mi mockup como referencia._');

  var msg = parts.join('\n');
  waModal.style.display = 'none';

  setTimeout(function(){
    window.open('https://wa.me/50576292240?text=' + encodeURIComponent(msg), '_blank');
  }, 600);
  toast('Abriendo WhatsApp - adjunta la imagen descargada');
});

// ── NAV ──
var navbar = document.getElementById('navbar');
if(navbar) window.addEventListener('scroll', function(){ navbar.classList.toggle('scrolled', window.scrollY>30); });
var menuToggle = document.getElementById('menu-toggle');
var navLinks = document.getElementById('nav-links');
if(menuToggle) menuToggle.addEventListener('click', function(){ navLinks.classList.toggle('open'); menuToggle.classList.toggle('open'); });

})();

