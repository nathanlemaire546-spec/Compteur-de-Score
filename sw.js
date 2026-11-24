var V="score-v1";
var FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(function(hit){
    var net=fetch(e.request).then(function(r){var cp=r.clone();caches.open(V).then(function(c){c.put(e.request,cp)});return r}).catch(function(){return hit});
    return hit||net;
  }));
});
