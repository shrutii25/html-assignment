let image,
  title,
  author,
  comments,
  height,
  width,
  zoom,
  likes,
  count = 0;

fetchPost("cats");

$("#posts").change(function () {
  let url = $(this).children("option:selected").val();
  fetchPost(url);
});

function fetchPost(URL) {
  let fetchRes = fetch(`https://www.reddit.com/r/${URL}.json`);
  fetchRes
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
      const app = document.querySelector("#app");
      app.innerHTML = "";
      d.data.children.map((post) => {
        if (post.data.thumbnail && post.data.thumbnail.includes("jpg")) {
          image = post.data.thumbnail;
          title = post.data.title;
          author = post.data.author;
          likes = post.data.ups;
          comments = post.data.num_comments;
          height = post.data.thumbnail_height;
          width = post.data.thumbnail_width;

          if (post.data.preview) {
            let length = post.data.preview.images[0].resolutions.length;
            zoom = post.data.preview.images[0].resolutions[length - 1].url;
          } else zoom = image;
          const node = document.createElement("div");
          node.innerHTML = `
                  <div class="card" style="width: 17rem; margin-top: 3rem">
                    <img class="card-img-top image" style="width: ${width}; height: ${height}" src="${image}" zoom-src="${zoom}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">Author: ${author} <br/> ${likes} likes <br/> ${comments} comments</p>
                    </div>
                  </div>`;
          app.appendChild(node);
        } else {
          count++;
        }

        if (count === d.data.children.length) {
          const node = document.createElement("div");
          node.innerHTML = `
                    <p class="text">Currently no posts available:(</p>`;
          app.appendChild(node);
        }
      });
    });
}

$(document).on("click", ".card", function () {
  let currImage = $(this).find("img").attr("zoom-src");
  $("#modal-image").attr("src", currImage);
  $("#myModal").modal("show");
});
