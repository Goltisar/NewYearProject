function gir() {  
  let nums = document.getElementById('nums_1').innerHTML  
  if(nums == 1) {document.getElementById('gir').className='gir_1';document.getElementById('nums_1').innerHTML='2'}  
  if(nums == 2) {document.getElementById('gir').className='gir_2';document.getElementById('nums_1').innerHTML='3'}  
  if(nums == 3) {document.getElementById('gir').className='gir_3';document.getElementById('nums_1').innerHTML='1'}  
  }  
setInterval(function(){gir()}, 500)

let dialog = document.querySelector(".dialog");
document.body.addEventListener("finish", function(event) {
    event.preventDefault();
    dialog.querySelector('p').textContent = event.detail;
    dialog.showModal();
})
