window.onload=()=>{
  showNote();
}

const notePannel = document.querySelector(".Note-pannel");
const editPannel = document.querySelector(".Edit-pannel");

// ## when click on Created option in Menage bar
const Createdoptin = document.querySelector(".Createdoption");
Createdoptin.addEventListener("click", () => {
  notePannel.classList.remove("close-pannel");
  editPannel.classList.add("close-pannel");
  Createdoptin.classList.add("active-option");
});

// When Click on  Edit and Delete Button
document.addEventListener("click", (event) => {
  // This is for when Edit a Note
  if (event.target.classList.contains("Edit-note")) {
    notePannel.classList.add("close-pannel");
    editPannel.classList.remove("close-pannel");
    Createdoptin.classList.remove("active-option");
    const targetElement = event.target; // The element that triggered the event
    const parentElement = targetElement.parentElement; // The direct parent element
    const MainParent = parentElement.parentElement;
    const noteID = MainParent.getAttribute("data-set");  
   
    let noteData = JSON.parse(localStorage.getItem("NoteData")) || [];
    let Editnotedata=  noteData.filter((item) => item.Id == noteID);
    // console.log(Editnotedata);

    // put Editnotedata in write area of note for Edit
    const note_title=document.getElementById("noteTitle");
    const note_pera=document.getElementById("notePera");
    note_title.innerHTML=Editnotedata[0].Title;
    note_pera.innerHTML=Editnotedata[0].Peragraph;

    // when click on save btn
    const saveEditBtn=document.getElementById("saveEditNote");
    saveEditBtn.addEventListener("click",()=>{

    noteData=noteData.filter((item) => item.Id != noteID);
     Editnotedata[0].Title=note_title.textContent;
     Editnotedata[0].Peragraph=note_pera.textContent;

    // console.log(Editnotedata);
    // console.log("aftert Edit for stave note")

//    after Edit note save to localstorage 
    noteData=[...noteData,...Editnotedata];
    localStorage.setItem("NoteData", JSON.stringify(noteData));

    // after save open Created Pannel and cloe Editpannel
    notePannel.classList.remove("close-pannel");
    editPannel.classList.add("close-pannel");
    Createdoptin.classList.add("active-option");
    showNote();
    showPopupmsg("Note's Edit Succesfully", 'success');
    })
    

  } // This is for when delete a Note
  else if (event.target.classList.contains("Delete-note")) {
    notePannel.classList.remove("close-pannel");
    editPannel.classList.add("close-pannel");

    const targetElement = event.target; // The element that triggered the event
    const parentElement = targetElement.parentElement; // The direct parent element
    const MainParent = parentElement.parentElement;
    const noteID = MainParent.getAttribute("data-set");

    let noteData = JSON.parse(localStorage.getItem("NoteData")) || [];

    if(noteData.length>0 && notePannel.innerHTML!=""){

      noteData = noteData.filter((item) => item.Id != noteID);    
      localStorage.setItem("NoteData", JSON.stringify(noteData));
      showNote();
      showPopupmsg("Note's Delete Succesfully", 'success');
    }
  }
});

function showPopupmsg(massage, alert) {
  const popMsg = document.querySelector(".popupMSG");
  const msg = document.getElementById("msg");

  msg.innerHTML = "";
  msg.textContent = massage;
  msg.style.color = alert === "warning" ? "red" : "green";

  // msg will be show
  setTimeout(()=>{

    popMsg.classList.remove("hidePopup");
  },800)

  // after 2 second msg will off
  setTimeout(() => {
    popMsg.classList.add("hidePopup");
  }, 2000);
}

function showNote() {
  const NoteData = JSON.parse(localStorage.getItem("NoteData")) || [];
  const notePannel = document.querySelector(".Note-pannel");

  NoteData.sort((a, b) =>Number( a.Id) - Number(b.Id));

  notePannel.innerHTML = "";

  if (NoteData.length > 0) {

    // Create dynamically Note
    NoteData.forEach((note) => {
      // Create anchor tag
      const anchorTag = document.createElement("a");
      anchorTag.className = "Note";
      anchorTag.setAttribute("data-set", `${note.Id}`);

      // Create a Note card div
      const noteCard = document.createElement("div");
      noteCard.classList.add("noteCard");

      anchorTag.appendChild(noteCard);

      // note number
      const note_number = document.createElement("span");
      note_number.classList.add("note-number");
      note_number.textContent = `Note :  ${note.Id}`;

      // note title
      const note_title = document.createElement("h3");
      note_title.classList.add("note-title");
      note_title.textContent =`Title : ${ note.Title}`;

      // note peragraph
      const note_pera = document.createElement("p");
      note_pera.classList.add("note-peragraph");
      note_pera.textContent =`content : ${ note.Peragraph}` ;

      noteCard.appendChild(note_number);
      noteCard.appendChild(note_title);
      noteCard.appendChild(note_pera);

      // Note-button-option div
      const noteBtns=document.createElement("div");
      noteBtns.className="note-button-options";
      // append note Btns to anchorTag
      anchorTag.appendChild(noteBtns);

      //Note button option Button (Edit and Delete)
      const edit_btn=document.createElement("button");
      edit_btn.className="Edit-note";
      edit_btn.textContent="edit";
      const delete_btn=document.createElement("button");
      delete_btn.className="Delete-note";
      delete_btn.textContent="delete";
      // appehd Edit and delete button to note-option div
      noteBtns.appendChild(edit_btn);
      noteBtns.appendChild(delete_btn);

        notePannel.appendChild(anchorTag);
    });

  }
  else{
    notePannel.innerHTML="Note  Empty";
  }

}
