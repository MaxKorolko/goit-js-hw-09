const t={startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]")};let e=null;t.startButton.addEventListener("click",(()=>{e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.startButton.setAttribute("disabled",!0)})),t.stopButton.addEventListener("click",(()=>{clearInterval(e),t.startButton.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.6f1520fd.js.map
