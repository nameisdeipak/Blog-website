window.onload = () => {
  showPanneldata("Created-pannel", "Savesblog");
};

// acces manage menu
const Newoption = document.querySelector(".Newoption");
const Createdoption = document.querySelector(".Createdoption");
const Publishoption = document.querySelector(".Publishoption");
const UnpublishOption = document.querySelector(".UnPublisheOption");

// Acces all Pannel
const createdPannel = document.querySelector(".Created-pannel");
const publishPannel = document.querySelector(".Published-pannel");
const unpublishPannel = document.querySelector(".Unpublished-pannel");

// when click on +new option
Newoption.addEventListener("click", () => {
  window.location.href = "createBlogNote.html";
});

// ## when  Createdoptin click
Createdoption.addEventListener("click", () => {
  // This is for active created option and disactivce another opotion
  Createdoption.classList.add("active-option");
  Publishoption.classList.remove("active-option");
  UnpublishOption.classList.remove("active-option");

  // this is for show Created Pannel
  createdPannel.classList.remove("close-pannel");
  publishPannel.classList.add("close-pannel");
  unpublishPannel.classList.add("close-pannel");

  // show Created pannel data
  showPanneldata("Created-pannel", "Savesblog");

  if (createdPannel.innerHTML == "") createdPannel.innerHTML = "Empty";
});

// ## when  Publishoption click
Publishoption.addEventListener("click", () => {
  // This is for active created option and disactivce another opotion
  Createdoption.classList.remove("active-option");
  Publishoption.classList.add("active-option");
  UnpublishOption.classList.remove("active-option");

  // this is for show Created Pannel
  createdPannel.classList.add("close-pannel");
  publishPannel.classList.remove("close-pannel");
  unpublishPannel.classList.add("close-pannel");

  // show Created pannel data
  showPanneldata("Published-pannel", "Publishedblog");

  if (publishPannel.innerHTML == "") publishPannel.innerHTML = "Empty";
});

// ## when  unPublishoption click
UnpublishOption.addEventListener("click", () => {
  // This is for active created option and disactivce another opotion
  Createdoption.classList.remove("active-option");
  Publishoption.classList.remove("active-option");
  UnpublishOption.classList.add("active-option");

  // this is for show Created Pannel
  createdPannel.classList.add("close-pannel");
  publishPannel.classList.add("close-pannel");
  unpublishPannel.classList.remove("close-pannel");

  // show Created pannel data
  showPanneldata("Unpublished-pannel", "Savesblog");

  if (unpublishPannel.innerHTML == "") unpublishPannel.innerHTML = "Empty";
});

// This function for show pannel data acording to that pannel currently active
function showPanneldata(pannelName, whichData) {
  const pannel = document.querySelector(`.${pannelName}`);
  let pannelData = JSON.parse(localStorage.getItem(whichData)) || [];



  if (pannel.length === 0) {
    pannel.innerHTML = "Empty";
  } else {
    if (pannel.classList.contains("Unpublished-pannel")) {
      // Access published data
      const PublishBlog =
        JSON.parse(localStorage.getItem("Publishedblog")) || [];

      // Find blogs in pannelData that are not in PublishBlog
      const toPublish = pannelData.filter(
        (obj1) =>
          !PublishBlog.some((publishedObj) => publishedObj.id === obj1.id) // Corrected logic
      );

      // Update the pannelData array with the filtered data
      pannelData = [...toPublish];
      // console.log(pannelData);
    }
    pannel.innerHTML = "";

    pannelData.forEach((blog) => {
      // Create First anchor tag
      const anchorTag = document.createElement("a");
      anchorTag.classList.add("blog");
      anchorTag.setAttribute("data-set", `${blog.id}`);

      // Create blog card of anchorTag
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      // Crate button for blog of anchorTag
      const button = document.createElement("button");
      if (pannel.classList.contains("Created-pannel")) {
        button.textContent = "Delete";
        button.className = "Delete-btn";
      } else if (pannel.classList.contains("Published-pannel")) {
        button.textContent = "Unpublish";
        button.className = "Unpublish-btn";
      } else if (pannel.classList.contains("Unpublished-pannel")) {
        button.textContent = "Publish";
        button.className = "publish-btn";
      }

      // append blog card to anchor tag
      anchorTag.appendChild(blogCard);
      anchorTag.appendChild(button);

      // create blog-img div
      const blogImg = document.createElement("div");
      blogImg.classList.add("blog-img");

      const img = document.createElement("img");
      img.src = blog.Image;
      blogImg.appendChild(img);

      // create blog-details div
      const blogDetails = document.createElement("div");
      blogDetails.classList.add("blog-details");

      const blogTitle = document.createElement("h2");
      blogTitle.classList.add("blog-title");
      blogTitle.textContent = blog.Title;

      const blogDescription = document.createElement("p");
      blogDescription.classList.add("blog-pera");
      blogDescription.innerHTML = blog.description;

      blogDetails.appendChild(blogTitle);
      blogDetails.appendChild(blogDescription);

      // create blog-creator div
      const blogCreator = document.createElement("div");
      blogCreator.classList.add("blog-creator");

      const blogAuthor = document.createElement("span");
      blogAuthor.classList.add("blog-author-name");
      blogAuthor.textContent = `Author : ${blog.Author}`;

      const blogcreateDate = document.createElement("span");
      blogcreateDate.classList.add("blog-creation-date");
      blogcreateDate.textContent = `Data : ${blog.date}`;

      blogCreator.appendChild(blogAuthor);
      blogCreator.appendChild(blogcreateDate);

      // append child to blog card
      blogCard.appendChild(blogImg);
      blogCard.appendChild(blogDetails);
      blogCard.appendChild(blogCreator);

      pannel.appendChild(anchorTag);
    });
  }
}

// ## This button for Delete, Publish or unpblish  a specifice blog from saves
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("Delete-btn")) {
    const targetElement = event.target; // The element that triggered the event
    const parentElement = targetElement.parentElement; // The direct parent element
    const blogID = parentElement.getAttribute("data-set");
    let pannelData = JSON.parse(localStorage.getItem("Savesblog")) || [];

    pannelData = pannelData.filter((item) => item.id != blogID);

    //save to localstorage after delete blog
    localStorage.setItem("Savesblog", JSON.stringify(pannelData));
    // console.log(pannelData);
    // location.reload();
    showPopupmsg("Succesfully  Delete  a Blog", 'success');
    showPanneldata("Created-pannel", "Savesblog");

    const createdPannel = document.querySelector(".Created-pannel");
  } else if (event.target.classList.contains("Unpublish-btn")) {
    const targetElement = event.target; // The element that triggered the event
    const parentElement = targetElement.parentElement; // The direct parent element
    const blogID = parentElement.getAttribute("data-set");
    let pannelData = JSON.parse(localStorage.getItem("Publishedblog")) || [];

    pannelData = pannelData.filter((item) => item.id != blogID);

    //save to localstorage after delete blog
    localStorage.setItem("Publishedblog", JSON.stringify(pannelData));
    // console.log(pannelData);
    // location.reload();
    showPopupmsg("Succesfully  Unpublish a Blog", 'success');
    showPanneldata("Published-pannel", "Publishedblog");
  } else if (event.target.classList.contains("publish-btn")) {
    const targetElement = event.target; // The element that triggered the event
    const parentElement = targetElement.parentElement; // The direct parent element
    const blogID = parentElement.getAttribute("data-set");
    let pannelData = JSON.parse(localStorage.getItem("Savesblog")) || [];
    let publishData = JSON.parse(localStorage.getItem("Publishedblog")) || [];

    if (publishData.length > 0) {
      publishData = publishData.filter((item) => item.id != blogID);
    }

    pannelData = pannelData.filter((item) => item.id == blogID);

    publishData = [...publishData, ...pannelData];

    // publish a  blog that are  this time not  a publish
    //save to localstorage after delete blog
    localStorage.setItem("Publishedblog", JSON.stringify(publishData));
showPopupmsg("Succesfully  publish a Blog ( Go to Home page)", 'success');
    showPanneldata("Unpublished-pannel", "Savesblog");
  }
});


// this is pop up massage
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