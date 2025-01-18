const specific = document.querySelector(".specific-blog");
specific.classList.add("hide-section");

const specificblog = document.querySelector(".specific-blog-container");

const blogs = document.querySelectorAll(".blog");
const banner = document.querySelector(".banner");
const latest = document.querySelector(".latest-blog-area");
const allpost = document.querySelector(".All-blog-area");


// blogs.forEach((blog) => {
//   blog.addEventListener("click", () => {
//     console.log(blog);
//     // this is for go to body top 20%
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });

//     // show specific blog and hide other things
//     specific.classList.remove("hide-section");
//     banner.classList.add("hide-section");
//     latest.classList.add("hide-section");
//     allpost.classList.add("hide-section");
//     specificblog.appendChild(blog);

//     console.log(specificblog);
//     console.log(blog);
//   });
// });




// Select a parent element that exists when the script runs
const allPostsContainer = document.querySelector(".All-blog-area");
const latestPostContainer = document.querySelector(".latest-blog-area");

// Add a single event listener to the parent container
allPostsContainer.addEventListener("click", (event) => {
  showblog(event);
});

latestPostContainer.addEventListener("click", (event) => {
  showblog(event);
});
  // Check if the clicked element is a blog post
  const showblog=function(event){


  const blog = event.target.closest(".blog");
  if (blog) {
    console.log(blog);

    // Scroll to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Show the specific blog and hide other sections
    specific.classList.remove("hide-section");
    banner.classList.add("hide-section");
    latest.classList.add("hide-section");
    allpost.classList.add("hide-section");

    // Append the clicked blog to the specific blog container
    specificblog.innerHTML = ""; // Clear the container
    specificblog.appendChild(blog);

    console.log(specificblog);
    console.log(blog);
  }
}
