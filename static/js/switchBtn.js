document.querySelector('.switch-btn').addEventListener("click", function(){
    let anim = getCookie("anim");
    if(anim === null){
      anim = "false";
      document.cookie = `anim=${anim}`;
    }
    document.cookie = `anim=${!(anim == "true")}`;
    document.querySelector('.switch-btn').classList.toggle('switch-on');
    if(!(anim == "true")){
      document.body.style.animation = "snow1 50s linear infinite";
      document.body.style.animationPlayState = "running"
    } else {
      document.body.style.animationPlayState = "paused"
    }
});
  
function getCookie(cookie_name)
{
    let results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if (results)
        return results[2];
    else
        return null;
}

// document.body.style.animation.setProperty('background-position', getCookie("pos"));
  
if (getCookie("anim") == "true"){
    document.querySelector('.switch-btn').classList.toggle('switch-on');
    document.body.style.animation = "snow1 80s linear infinite";
    document.body.style.animationPlayState = "running"
} else{
    document.body.style.animationPlayState = "paused"
}

window.addEventListener("unload", function() {
    document.cookie = `pos=${getComputedStyle(document.body).getPropertyValue('background-position')}`;
});