window.onscroll = function () {
  handleHeaderHeight();
}

function handleHeaderHeight() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('main__slides').style.zIndex = "0";
    document.getElementById('header__submain').style.height = "30px";
  } else {
    document.getElementById('main__slides').style.zIndex = "1000";
    document.getElementById('header__submain').style.height = "130px";
  }
}