!function(){var e=document.querySelector(".loader");function n(){e.style.display="none"}function t(){document.querySelector(".cat-info").innerHTML=""}fetch("https://api.thecatapi.com/v1/breeds").then((function(e){return e.json()})).then((function(e){return e.map((function(e){return{id:e.id,name:e.name}}))})).catch((function(e){return console.error("Error fetching cat breeds:",e),[]})).then((function(e){var t=document.querySelector(".breed-select");e.forEach((function(e){var n=document.createElement("option");n.value=e.id,n.textContent=e.name,t.appendChild(n)})),n()}));var r=document.querySelector(".breed-select"),c=document.querySelector(".cat-info");r.addEventListener("change",(function(){var o,a,i=r.value;i?(e.style.display="block",t(),(o=i,a="https://api.thecatapi.com/v1/images/search?breed_ids=".concat(o),fetch(a).then((function(e){return e.json()})).then((function(e){return e[0]})).catch((function(e){return console.error("Error fetching cat by breed:",e),null}))).then((function(e){if(e){var t=document.createElement("img");if(t.src=e.url,t.width=800,c.appendChild(t),e.breeds&&e.breeds.length>0){var r=document.createElement("div");r.innerHTML="\n            <h3>Name: ".concat(e.breeds[0].name,"</h3>\n            <p>Description: ").concat(e.breeds[0].description,"</p>\n            <p>Temperament: ").concat(e.breeds[0].temperament,"</p>\n          "),c.appendChild(r)}else{var o=document.createElement("p");o.textContent="Breed information not available.",c.appendChild(o)}}else c.textContent="Failed to fetch cat information.";n()}))):(t(),c.innerHTML="")}))}();
//# sourceMappingURL=index.f0ed0998.js.map