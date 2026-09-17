async function run() {
  const formData = new FormData();
  const jsonStr = JSON.stringify({ title: "Test4", author: "Test", newsType: "Campus", summary: "Test", content: "Test" });
  formData.append("news", new Blob([jsonStr], { type: "application/json" }));
  
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
