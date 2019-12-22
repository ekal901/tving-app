let customSelect = document.getElementsByClassName("custom-select"); // div
for (let i = 0; i < customSelect.length; i++) {
  let selectTag = customSelect[i].getElementsByTagName("select")[0]; // options를 담고있는 select 태그 선택
  addDefaultOption(customSelect, selectTag, i);
  addHideDiv(customSelect, selectTag, i);
}
document.addEventListener("click", closeWhenSelectOption);

function addDefaultOption(customSelect, selectTag, i) {
  let defaultOptionDiv = document.createElement('div');
  defaultOptionDiv.setAttribute("class", "select-selected"); // select-selected 클래스 명을 가진 div 추가
  defaultOptionDiv.innerHTML = selectTag.options[selectTag.selectedIndex].innerHTML;
  customSelect[i].appendChild(defaultOptionDiv);

  // defaultOption인 첫번째 옵션 (선택화면)을 클릭시 이벤트 받음
  defaultOptionDiv.addEventListener("click", handleDefaultOption);
}

function addHideDiv(customSelect, selectTag, i) {
  let hideDiv = document.createElement('div');
  hideDiv.setAttribute("class", "select-items select-hide"); // option lists 추가

  // 처음 불러오는 select 화면은 options들이 보이지 않아서 hideDiv에 추가한다.
  addOptionsOnHideDiv(selectTag, hideDiv);
  customSelect[i].appendChild(hideDiv);
}

function addOptionsOnHideDiv(selectTag, hideDiv) {
  for (j = 1; j < selectTag.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    let optionDiv = document.createElement("div");
    optionDiv.innerHTML = selectTag.options[j].innerHTML;
    optionDiv.addEventListener("click", handleHideOptions);
    hideDiv.appendChild(optionDiv);
  }
}


/*when the select box is clicked, close any other select boxes,
  and open/close the current select box:*/
function handleDefaultOption(e) {
  e.stopPropagation();
  closeWhenSelectOption(this); // defaultOption
  this.nextSibling.classList.toggle("select-hide");
  this.classList.toggle("select-arrow-active");
}

function closeWhenSelectOption(defaultOptionDiv) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  let arrNo = [];
  let hiddenDiv = document.getElementsByClassName("select-items");
  let htmlCollectionForDefaultOption = document.getElementsByClassName("select-selected");
  console.dir(defaultOptionDiv);
  console.dir(htmlCollectionForDefaultOption);
  for (let i = 0; i < htmlCollectionForDefaultOption.length; i++) {
    if (defaultOptionDiv == htmlCollectionForDefaultOption[i]) {
      arrNo.push(i)
    } else {
      htmlCollectionForDefaultOption[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < hiddenDiv.length; i++) {
    if (arrNo.indexOf(i)) {
      hiddenDiv[i].classList.add("select-hide");
    }
  }
}

function handleHideOptions(e) {
  /*when an item is clicked, update the original select box,
    and the selected item:*/
  console.log("handleHideOptions");
  var y, i, k, s, h;
  let selectTag = this.parentNode.parentNode.getElementsByTagName("select")[0];
  let selectedDefaultOption = this.parentNode.previousSibling;
  changeSelectedOption(selectTag, selectedDefaultOption, s, e.target);
  // selectedDefaultOption.click();
}

function changeSelectedOption(s, h, y, target) {
  console.log("누름");

  console.dir(s);
  for (i = 0; i < s.length; i++) {
    if (s.options[i].innerHTML == target.innerHTML) {
      s.selectedIndex = i;
      h.innerHTML = target.innerHTML;
      y = target.parentNode.getElementsByClassName("same-as-selected");
      for (k = 0; k < y.length; k++) {
        y[k].removeAttribute("class");
      }
      target.setAttribute("class", "same-as-selected"); // 선택된 option에 same-as-selected 클래스 추가
      console.log(target.parentNode);
      // target.parentNode.style.display="none";
      break;
    }
  }
}