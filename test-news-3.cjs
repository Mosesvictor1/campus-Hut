async function run() {
  try {
    const res = await fetch("http://178.128.36.105:8080/campusHutNews/api/news/createNews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test3", author: "Test", newsType: "Campus", summary: "Test", content: "Test" })
    });
    
    console.log("Status:", res.status);
    console.log("Text:", await res.text());
  } catch (e) {
    console.error(e);
  }
}
run();
