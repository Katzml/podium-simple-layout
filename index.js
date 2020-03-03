const express = require("express");
const Layout = require("@podium/layout");

const app = express();

const layout = new Layout({
  name: "myLayout",
  pathname: "/testeando"
});

const navFragment = layout.client.register({
  name: "navFragment",
  uri: "http://localhost:3001/manifest.json"
});

const sectionsFragment = layout.client.register({
  name: "sectionsFragment",
  uri: "http://localhost:3002/manifest.json"
});
const textFragment = layout.client.register({
  name: "textFragment",
  uri: "http://localhost:3003/manifest.json"
});
const footerFragment = layout.client.register({
  name: "footerFragment",
  uri: "http://localhost:3004/manifest.json"
});
const imageFragment = layout.client.register({
  name: "imageFragment",
  uri: "http://localhost:3005/manifest.json"
});

app.use(layout.middleware());

app.get("/testeando", async (req, res) => {
  const incoming = res.locals.podium;
  const [podA, podB, podC, podD, podE] = await Promise.all([
    navFragment.fetch(incoming),
    sectionsFragment.fetch(incoming),
    textFragment.fetch(incoming),
    footerFragment.fetch(incoming),
    imageFragment.fetch(incoming)
  ]);

  incoming.view.title = "Probando un layout con 5 podlets";
  res.podiumSend(`
        ${podA}
        <h1>Titulo de prueba</h1>
        ${podB}
        ${podE}
        ${podC}
        ${podD}
  `);
});
app.listen(3000, () => console.info("Layout serve on"));
