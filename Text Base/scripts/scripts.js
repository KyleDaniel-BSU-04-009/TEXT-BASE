const text = document.getElementById('textbox');//variable used to identify the main editor
const cpStatus = document.getElementsByClassName('copast')[0];//variable used to identify the copy/paste status

text.addEventListener('input', () => {//event occurs whenever the user types anything in the main editor
  var taval = text.value;//variable used to take the value of the main editor
  document.getElementById('wordCount').textContent = getWordCount(taval);//updates the word counter with the value returned from a function
  document.getElementById('charCount').textContent = taval.length;//updates the DOM content with the vaue of the main text editor
  if(text.value == "") { document.getElementById('wordCount').textContent = '0'; }//updates the word counter to '0' when there's no words in the main editor
  cpStatus.style.backgroundColor='#ff00004e';
});

//this is a function to detect ctrl + c to copy the contents of the man editor to the user's clipboard
document.body.addEventListener('keydown', function (mEv) {
  mEv = mEv || window.event;//defines the event object
  let key = mEv.which || mEv.keyCode; //detect keycodes
  let ctrl = mEv.ctrlKey ? mEv.ctrlKey : ((key === 17) ? true : false);//Detecting Ctrl
  if (key == 67 && ctrl) {
    navigator.clipboard.writeText(text.value);//adds content of the main editor to the clipboard
    cpStatus.style.backgroundColor = '#ffff004e';//changes the status of in the results section
  }
}, false);

function getWordCount(str) { return str.trim().split(/\s+/).length; }

//this a function that returns a value based on the value of the main text editor
//it will cut the value of the main editor after each space and count each separated string as a 'word'

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
//this is an event that occurs when the user unloads TEXT BASE
//the event will throw a warning for the user

const pluginElement = document.querySelector('grammarly-editor-plugin');//variable used to identify the tag that connects the input to grammarly's API

//variables used to identify the DOM elements that show results
const curDia = document.getElementById('curDia');
const curDom = document.getElementById('curDom');

//variables used to identify the array of buttons
const diaBtn = document.querySelectorAll('.diaBtn');
const domBtn = document.querySelectorAll('.domBtn');

//forEach is used to provide event listeners for the array of buttons
diaBtn.forEach(btn => {
  btn.addEventListener('click', event => {//the event occurs when a button is clicked
    if(event.target.classList.contains('ameDia')){//an if-statement is used to identify which button is clicked
      pluginElement.config = { documentDialect: 'american' };//assigns the new dialect from grammarly's API
      resetDia();//calls a function to reset the button's styling
      curDia.style.backgroundImage = "url('images/american.png')";//replaces the DOM element to show a different icon in the results bar
      diaBtn[0].style.scale = '1.125';//modifies th styling of the DOM element to indicate the new selection
      diaBtn[0].style.border = '2px solid white';
    };
    if(event.target.classList.contains('ausDia')){
      pluginElement.config = { documentDialect: 'australian' };
      resetDia();
      curDia.style.backgroundImage = "url('images/australian.png')";
      diaBtn[1].style.scale = '1.125';
      diaBtn[1].style.border = '2px solid white';
    };
    if(event.target.classList.contains('briDia')){
      pluginElement.config = { documentDialect: 'british' };
      resetDia();
      curDia.style.backgroundImage = "url('images/british.png')";
      diaBtn[2].style.scale = '1.125';
      diaBtn[2].style.border = '2px solid white';
    };
    if(event.target.classList.contains('canDia')){
      pluginElement.config = { documentDialect: 'canadian' };
      resetDia();
      curDia.style.backgroundImage = "url('images/canadian.png')";
      diaBtn[3].style.scale = '1.125';
      diaBtn[3].style.border = '2px solid white';
    };
  });
});
//this function will reset the styling of the buttons
function resetDia(){
  for(var i=0; i<diaBtn.length; i++){//a for-loop is used to cycle throught the array of buttons
    diaBtn[i].style.scale = '1.0';//default styling is assigned through each button based on their index
    diaBtn[i].style.border = 'none';
  }
}

//same concept applies here, any further comments will be redundant
domBtn.forEach(btn => {
  btn.addEventListener('click', event => {
    if(event.target.classList.contains('acaDom')){
      pluginElement.config = { documentDomain: 'academic' };
      resetDom();
      curDom.textContent = 'Academic 📚';
      domBtn[0].style.textDecoration = 'underline';
    };
    if(event.target.classList.contains('busDom')){
      pluginElement.config = { documentDomain: 'business' };
      resetDom();
      curDom.textContent = 'Business 👔';
      domBtn[1].style.textDecoration = 'underline';
    };
    if(event.target.classList.contains('genDom')){
      pluginElement.config = { documentDomain: 'general' };
      resetDom();
      curDom.textContent = 'General 📝';
      domBtn[2].style.textDecoration = 'underline';
    };
    if(event.target.classList.contains('maiDom')){
      pluginElement.config = { documentDomain: 'mail' };
      resetDom();
      curDom.textContent = 'Mail 📧';
      domBtn[3].style.textDecoration = 'underline';
    };
    if(event.target.classList.contains('casDom')){
      pluginElement.config = { documentDomain: 'casual' };
      resetDom();
      curDom.textContent = 'Casual 🤙';
      domBtn[4].style.textDecoration = 'underline';
    };
    if(event.target.classList.contains('creDom')){
      pluginElement.config = { documentDomain: 'creative' };
      resetDom();
      curDom.textContent = 'Creative 🌈';
      domBtn[5].style.textDecoration = 'underline';
    };
  });
});
function resetDom(){
  for(var i=0; i<domBtn.length; i++){
    domBtn[i].style.textDecoration = 'none';
  }
}