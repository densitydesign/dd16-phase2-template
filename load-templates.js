// This script generates HTML nodes for the home page of the project
const nav = d3.select("#nav");
const home = d3.select(".cover");
const intro = d3.select(".intro");
const questions = d3.select('#questions');
const footer = d3.select("footer");

if (questions.size() > 0) {
  Promise.all([
    d3.text('info.yml'),
    d3.text('questions.yml'),
  ])
  .then(([info, questionsData]) =>  {
    info = jsyaml.load(info);
    questionsData = jsyaml.load(questionsData);

    const cover = home.selectAll('div').data([info]).enter().append('div');

    cover.append("img").attr('src',d=>`./assets/${d["cover-image"]}`)
    .classed("cover__image", true);
    cover.append("div").classed("cover__background", true);
    cover.append("h3").text("DensityDesign Lab - Final Synthesis Design Studio 2020/2021")
    .classed("cover__heading", true);
    cover.append("h1").text(d => d.title)
    .classed("cover__title", true);
    cover.append("h2").text(d => d.subtitle)
    .classed("cover__subtitle", true);

    cover.append("div")
    .selectAll("p")
    .data(d => d.authors)
    .join("p")
    .text(d => d.name)
    .classed("authors", true);

    const introText = intro.selectAll("div").data([info]).enter().append("div");
    introText.append("p").text(d => d.description);

    const question = questions.selectAll('div').data(questionsData).enter().append('div').classed("question__card", true);
    question.append('img').attr('src',d=>`./${d.folder}/${d.cover}`);
    const questionMeta = question.append("div");
    questionMeta.append('h2').text(d=>d.title);
    questionMeta.append('p').text(d=>d.description);
    questionMeta.append('a').attr('href',d=>`./${d.folder}`).text('Explore the research');

  });
};