async function run() {
  const formData = new FormData();
  formData.append("news", JSON.stringify({ title: "Test", author: "Test", newsType: "Campus", summary: "Test", content: "Test" }));
  
  try {
    const res = await fetch("http://178.128.36.105:8080/campusHutNews/api/news/createNews", {
      method: "POST",
      body: formData
    });
    
    console.log("Status:", res.status);
    console.log("Text:", await res.text());
  } catch (e) {
    console.error(e);
  }
}
run();
