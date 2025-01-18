window.onload = () => {
  addBlogToList();
  addNoteTolist();
  // loadNotes();

  const params = new URLSearchParams(window.location.search);
  const activet = params.get("class");
  
  if(activet=="note-area"){
    blogOptionbtn.classList.remove("active-option");
    noteOptionbtn.classList.add("active-option");
    Blogsection.classList.add("show-section");
    Notesection.classList.remove("show-section");
    statusHeading.innerHTML="Note";
  }

};





// blog option btn when user click
const blogOptionbtn = document.querySelector(".blog-option");
const noteOptionbtn = document.querySelector(".note-option");
const Blogsection = document.querySelector(".blog-area");
const Notesection = document.querySelector(".note-area");
const statusHeading=document.querySelector(".status-details")

blogOptionbtn.addEventListener("click", () => {
  // class remove in noteOptoin and add into  blogOption
  blogOptionbtn.classList.add("active-option");
  noteOptionbtn.classList.remove("active-option");

  Blogsection.classList.remove("show-section");
  Notesection.classList.add("show-section");
  statusHeading.innerHTML="Blog"
  
});

// when note option on click
noteOptionbtn.addEventListener("click", () => {
  // class add in noteOptoin and remove from blogOption 
  noteOptionbtn.classList.add("active-option");
  blogOptionbtn.classList.remove("active-option");

  Notesection.classList.remove("show-section");
  Blogsection.classList.add("show-section");
  statusHeading.innerHTML="Note"
});



// formating logic
function formateText(formate,event) {
  activeFormate(event);
  const editor = document.querySelector(".editor");
  editor.addEventListener("mouseup", () => {
    const selection = document.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rangeText = range.toString();
      const length = rangeText.length;
      // console.log(length);

      const element = document.createElement(formate);
      element.textContent = range.toString();

      range.deleteContents();
      range.insertNode(element);
    }
  });
}







// this is for active toos formate
function activeFormate(action){
  const bold=document.querySelector('.bold');
  const italic=document.querySelector('.italic');
  const underline=document.querySelector('.underline');
  const heading=document.querySelector('.heading');
  const bullet=document.querySelector('.bullet');

  if(action.target.parentElement.className=="bold"){
bold.classList.add("active-formate");
italic.classList.remove("active-formate");
underline.classList.remove("active-formate");
heading.classList.remove("active-formate");
bullet.classList.remove("active-formate");
  }
  else if(action.target.parentElement.className=='italic'){
    bold.classList.remove("active-formate");
    italic.classList.add("active-formate");
    underline.classList.remove("active-formate");
    heading.classList.remove("active-formate");
    bullet.classList.remove("active-formate");
  }
  else if(action.target.parentElement.className=='underline'){
    bold.classList.remove("active-formate");
    italic.classList.remove("active-formate");
    underline.classList.add("active-formate");
    heading.classList.remove("active-formate");
    bullet.classList.remove("active-formate");
  }
  else if(action.target.parentElement.className=='heading'){

    bold.classList.remove("active-formate");
italic.classList.remove("active-formate");
underline.classList.remove("active-formate");
heading.classList.add("active-formate");
bullet.classList.remove("active-formate");
  }
  else if(action.target.parentElement.className=='bullet'){
    bold.classList.remove("active-formate");
    italic.classList.remove("active-formate");
    underline.classList.remove("active-formate");
    heading.classList.remove("active-formate");
    bullet.classList.add("active-formate");
  }
}

// Save blogs
// function working
// 1. take all value ralated blog by user
// 2. check value are not a undefined or null/blank
// if value blank than show message like(please Enter a value)
// 3. if value not blank than save blog value in localstorge
function saveBlog() {
  const blogAuthor = document.getElementById("blog-author");
  const blogTitle = document.getElementById("blog-title");
  const blogDescription = document.getElementById("editor");
  const blogImage = document.getElementById("blog-image");

  if (
    blogAuthor.value == "" ||
    blogTitle.value == "" ||
    blogDescription.innerHTML == "" ||
    blogImage.value == ""
  ) {
    showPopupmsg("Please Fill  all blog data", "warning");
  } else {
    const Blogarray = JSON.parse(localStorage.getItem("Savesblog")) || [];

    const now=new Date();
    const todaydate=now.toDateString();
    const Blogobj = {
      id:Blogarray.length,
      Title: blogTitle.value,
      Author: blogAuthor.value,
      date:todaydate,
      description: blogDescription.innerHTML,
      Image: blogImage.value,
    };

    Blogarray.push(Blogobj);
    localStorage.setItem("Savesblog", JSON.stringify(Blogarray));

    resetForm();
    addBlogToList();
    //   location.reload();
  }
}

// save blog Button
const form = document.querySelector(".blog-input-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  saveBlog();
});

// this  reset form value after saving blog
function resetForm() {
  document.getElementById("editor").innerHTML = "";
  form.reset();

  showPopupmsg("Blog creation succesfully", "normal");
}

// function to give popup massage
// this function perform all thinsg popup massage like (when form input blank , blog save or notetc)
function showPopupmsg(massage, alert) {
  const popMsg = document.querySelector(".popupMSG");
  const msg = document.getElementById("msg");

  
  msg.innerHTML = "";
  msg.textContent = massage;
  msg.style.color = alert === "warning" ? "red" : "green";

  // msg will be show
  popMsg.classList.remove("hidePopup");

  // after 2 second msg will off
  setTimeout(() => {
    popMsg.classList.add("hidePopup");
  }, 1500);
}

// This is for add blog to Blog-save area
function addBlogToList() {
  
  const savesBlog = document.querySelector(".saves-blog");

  const AllBlog = JSON.parse(localStorage.getItem("Savesblog")) || [];
  savesBlog.innerHTML = "";
  AllBlog.forEach((Blogcontent) => {
    // create card element
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    // create blog-img div
    const blogImg = document.createElement("div");
    blogImg.classList.add("blog-img");

    const img = document.createElement("img");
    img.src = Blogcontent.Image;
    blogImg.appendChild(img);

    // create blog-details div
    const blogDetails = document.createElement("div");
    blogDetails.classList.add("blog-details");

    const blogTitle = document.createElement("h2");
    blogTitle.classList.add("blog-title");
    blogTitle.textContent = Blogcontent.Title;

    const blogDescription = document.createElement("p");
    blogDescription.classList.add("blog-pera");
    blogDescription.innerHTML = Blogcontent.description;

    blogDetails.appendChild(blogTitle);
    blogDetails.appendChild(blogDescription);

    // create blog-creator div
    const blogCreator = document.createElement("div");
    blogCreator.classList.add("blog-creator");

    const blogAuthor = document.createElement("span");
    blogAuthor.classList.add("blog-author-name");
    blogAuthor.textContent = `Author: ${Blogcontent.Author}`;

    const blogcreateDate = document.createElement("span");
    blogcreateDate.classList.add("blog-creation-date");
    blogcreateDate.textContent = `Date: ${ Blogcontent.date}`;

    blogCreator.appendChild(blogAuthor);
    blogCreator.appendChild(blogcreateDate);

    // add blog-img , blog-details , blog-creator into card
    blogCard.appendChild(blogImg);
    blogCard.appendChild(blogDetails);
    blogCard.appendChild(blogCreator);

    // add card to saveBlog
    savesBlog.appendChild(blogCard);
  });
}



/// ##------ Note's  code start -----###

// save Note-----------
// save btn click
const savenoteBtn = document.querySelector(".save-note-btn");

savenoteBtn.addEventListener("click", () => {
  // check note value Enter or not
  const noteTitle = document.getElementById("noteTitle").textContent;
  const notePera = document.getElementById("notePera").textContent;

  if (noteTitle === "" || notePera === "") {
    showPopupmsg("Please Enter a Note's value", "warning");
    console.log('helo');
  } else {
    saveNote(noteTitle, notePera);
    noteTitle.textContent="";
    notePera.textContent="";
  }
  
});

// function for saveNote
function saveNote(noteTitle, notePera) {
  const NoteData = JSON.parse(localStorage.getItem("NoteData")) || [];
  const noteObj = {
    Id: NoteData.length+1,
    Title: noteTitle,
    Peragraph: notePera,
  };

  NoteData.push(noteObj);
  localStorage.setItem("NoteData", JSON.stringify(NoteData));

  addNoteTolist();
}

// function to addNote to list
function addNoteTolist() {
  const Notes = JSON.parse(localStorage.getItem("NoteData"));

  const saveNote = document.querySelector(".save-note");

  saveNote.innerHTML="";
  Notes.forEach((Note) => {
    // create note card
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");

    // note number
    const note_number = document.createElement("span");
    note_number.classList.add("note-number");
    note_number.textContent = `Note: ${Note.Id}`;

    // note title
    const note_title = document.createElement("h3");
    note_title.classList.add("note-title");
    note_title.textContent = Note.Title;

    // note peragraph
    const note_pera = document.createElement("p");
    note_pera.classList.add("note-peragraph");
    note_pera.textContent = Note.Peragraph;

    noteCard.appendChild(note_number);
    noteCard.appendChild(note_title);
    noteCard.appendChild(note_pera);

    saveNote.appendChild(noteCard);
  });

//   localStorage.removeItem("NoteData");
}
