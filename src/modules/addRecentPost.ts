function addRecentPost(post_id: number) {
  const prev_recent = localStorage.getItem("recent_post");
  if (!prev_recent) {
    localStorage.setItem("recent_post", JSON.stringify([post_id]));
  } else {
    let new_recent = JSON.parse(prev_recent);
    new_recent = new_recent.filter((item: number) => item !== post_id);
    if (new_recent.length >= 10) new_recent.shift();
    new_recent.push(post_id);
    localStorage.setItem("recent_post", JSON.stringify(new_recent));
  }
}

export default addRecentPost;
