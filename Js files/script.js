window.onload = () => {
  showblogTo("All-blog-post");
  showblogTo("latest-blog-post");
};

// This functio is decied where is   blog show and than according condition call show function
function showblogTo(where) {
  let Blogdata = JSON.parse(localStorage.getItem("Publishedblog")) || [];

  if (!Blogdata.length) {


    const foodBlogData = [
      {
        id: 1,
        Author: "John Doe",
        Title: "The Art of Sourdough Baking",
        description: "Learn the secrets to crafting the perfect sourdough loaf, from starter to finish.",
        date: "2025-01-10",
        Image: "images/asset 7.webp",
      },
      {
        id: 2,
        Author: "Jane Smith",
        Title: "10 Quick and Healthy Smoothie Recipes",
        description: "Start your day right with these easy-to-make and nutritious smoothies.",
        date: "2025-01-09",
        Image: "images/asset 6.webp",
      },
      {
        id: 3,
        Author: "Chef Alex",
        Title: "Mastering the Art of French Pastries",
        description: "A beginner's guide to making croissants, macarons, and other French delights.",
        date: "2025-01-08",
        Image: "images/asset 1.webp",
      },
      {
        id: 4,
        Author: "Emma Watson",
        Title: "The Ultimate Vegan Meal Prep Guide",
        description: "Plan and prepare your meals for the week with these delicious vegan recipes.",
        date: "2025-01-07",
        Image: "images/asset 7.webp",
      },
      {
        id: 5,
        Author: "Liam Brown",
        Title: "Exploring Exotic Spices from Around the World",
        description: "Discover unique spices and how to use them to elevate your cooking.",
        date: "2025-01-06",
        Image: "images/asset 6.webp",
      },
      {
        id: 6,
        Author: "Sophia Taylor",
        Title: "Homemade Pizza Perfection",
        description: "Step up your pizza game with these tips and tricks for a perfect homemade pie.",
        date: "2025-01-05",
        Image: "images/asset 7.webp",
      },
      {
        id: 7,
        Author: "Oliver Wilson",
        Title: "Comfort Food Classics Reinvented",
        description: "Put a modern twist on your favorite comfort food recipes.",
        date: "2025-01-04",
        Image: "images/asset 5.webp",
      },
      {
        id: 8,
        Author: "Mia Johnson",
        Title: "The Joy of Seasonal Eating",
        description: "Embrace the flavors of each season with these seasonal recipes.",
        date: "2025-01-03",
        Image: "images/asset 4.webp",
      },
      {
        id: 9,
        Author: "Noah Martinez",
        Title: "How to Host the Perfect Dinner Party",
        description: "Impress your guests with these tips for a flawless dinner party experience.",
        date: "2025-01-02",
        Image: "images/asset 2.webp",
      },
      {
        id: 10,
        Author: "Ella Davis",
        Title: "A Guide to Making Gourmet Burgers at Home",
        description: "Take your burger game to the next level with these gourmet recipes.",
        date: "2025-01-01",
        Image: "images/asset 3.webp",
      },
    ];
    
   
    
        Blogdata=[...foodBlogData];
        

        // After updating Blogdata, call the function to display the data
        const showTo = document.querySelector(`.${where}`);
        
        if (showTo.classList.contains("latest-blog-post") && Blogdata.length > 0) {
          const latestBlogData = [
            Blogdata[Blogdata.length - 1],
            Blogdata[Blogdata.length - 2],
            Blogdata[Blogdata.length - 3],
          ];
          showTo.innerHTML = "";
          show(where, latestBlogData);
        } else {
          if (Blogdata.length > 0) {
            showTo.innerHTML = "";
            show(where, Blogdata);
          }
        }
  } else {
    // If Blogdata already exists in localStorage
    const showTo = document.querySelector(`.${where}`);
    if (showTo.classList.contains("latest-blog-post") && Blogdata.length > 0) {
      const latestBlogData = [
        Blogdata[Blogdata.length - 1],
        Blogdata[Blogdata.length - 2],
        Blogdata[Blogdata.length - 3],
      ];
      showTo.innerHTML = "";
      show(where, latestBlogData);
    } else {
      if (Blogdata.length > 0) {
        showTo.innerHTML = "";
        show(where, Blogdata);
      }
    }
  }
}

// this function to show blogdata
function show(where, Blogdata) {
  const showTo = document.querySelector(`.${where}`);

  Blogdata.forEach((Blogcontent) => {
    // Create First anchor tag
    const anchorTag = document.createElement("a");
    anchorTag.classList.add("blog");
    anchorTag.setAttribute("data-set", `${Blogcontent.id}`);

    // create card element
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    anchorTag.appendChild(blogCard);

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
    blogcreateDate.textContent = `Date: ${Blogcontent.date}`;

    blogCreator.appendChild(blogAuthor);
    blogCreator.appendChild(blogcreateDate);

    // add blog-img , blog-details , blog-creator into card
    blogCard.appendChild(blogImg);
    blogCard.appendChild(blogDetails);
    blogCard.appendChild(blogCreator);

    showTo.appendChild(anchorTag);
  });
}


// this is for user Enter thier Email 
const form=document.querySelector(".form");
form.addEventListener("click",(e)=>{
  e.preventDefault();
  
  const input=document.getElementById("email");
  if(e.target.tagName=='BUTTON' && input.value!=""){
alert(`Thank's for visit `)
  }
})
