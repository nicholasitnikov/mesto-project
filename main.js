(()=>{"use strict";var e=function(e){var t,r;t=document.querySelector(e.formSelector),(r=t.querySelectorAll(e.inputSelector)).forEach((function(o){o.addEventListener("input",(function(){var n;(function(t,r){r.validity.valid||""===r.value?function(t,r){var o=t.querySelector("".concat(e.inputErrorClass,"-").concat(r.id));o.textContent=r.validationMessage,o.classList.remove(e.errorClass)}(t,r):function(t,r){var o=t.querySelector("".concat(e.inputErrorClass,"-").concat(r.id));o.textContent=r.validationMessage,o.classList.add(e.errorClass)}(t,r)})(t,o),n=r,Array.from(n).some((function(e){return!e.validity.valid}))?function(t){t.querySelector(e.submitButtonSelector).setAttribute("disabled",!0)}(t):function(t){t.querySelector(e.submitButtonSelector).removeAttribute("disabled")}(t)}))}))},t=document.querySelectorAll(".popup"),r=function(e){e.classList.add("popup_opened")},o=function(e){e.classList.remove("popup_opened")},n=document.querySelector(".popup_role_image"),c=n.querySelector(".popup__close"),l=document.querySelector(".places"),p=document.querySelector("#placeTemplate").content,u=function(e,t){var o=p.querySelector(".place").cloneNode(!0);return o.querySelector(".place__image").style.backgroundImage="url(".concat(t,")"),o.querySelector(".place__heading").textContent=e,o.querySelector(".place__like").addEventListener("click",(function(e){e.target.classList.toggle("place__like_active")})),o.querySelector(".place__delete").addEventListener("click",(function(e){return function(e){e.target.parentElement.remove()}(e)})),o.querySelector(".place__image").addEventListener("click",(function(){return function(e,t){r(n),n.querySelector(".popup__image").src=t,n.querySelector(".popup__caption").textContent=e}(e,t)})),o},i=function(e,t){t?l.prepend(e):l.append(e)},a=document.querySelector(".profile__edit"),s=document.querySelector(".popup_role_edit"),d=document.querySelector(".profile__heading"),_=document.querySelector(".profile__description"),f=s.querySelector(".popup__field_name_username"),m=s.querySelector(".popup__field_name_description"),y=s.querySelector(".form_type_useredit"),v=s.querySelector(".popup__close"),S=function(){o(s)},q=document.querySelector(".popup_role_add"),k=q.querySelector(".popup__field_name_placename"),g=q.querySelector(".popup__field_name_placelink"),E=q.querySelector(".form_type_addplace"),L=q.querySelector(".popup__close"),b=document.querySelector(".profile__add-place"),C=function(){o(q)};e({formSelector:".form_type_useredit",inputSelector:".popup__field",submitButtonSelector:".popup__button",inputErrorClass:".popup__field-error",errorClass:"popup__field-error_visible"}),e({formSelector:".form_type_addplace",inputSelector:".popup__field",submitButtonSelector:".popup__button",inputErrorClass:".popup__field-error",errorClass:"popup__field-error_visible"}),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e,t){i(u(e.name,e.link),!1)})),a.addEventListener("click",(function(){f.value=d.textContent,m.value=_.textContent,r(s)})),v.addEventListener("click",S),y.addEventListener("submit",(function(e){e.preventDefault(),d.textContent=f.value,_.textContent=m.value,S()})),b.addEventListener("click",(function(){q.classList.add("popup_opened"),E.reset(),r(q)})),L.addEventListener("click",C),E.addEventListener("submit",(function(e){e.preventDefault(),i(u(k.value,g.value),!0),C()})),c.addEventListener("click",(function(){o(n)})),t.forEach((function(e){e.addEventListener("click",(function(t){Array.from(t.target.classList).includes("popup")&&o(e)}))}))})();