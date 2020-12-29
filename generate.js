let json0, json1, json2;
let text0, text1, text2;
let first, second, third;
let finalText;
let counts;
let param;

let one_per, one_per_s;
let one_nn, one_nn_s, two_nn, three_nn;
let one_nns, two_nns, three_nns;
let one_vb, two_vb, two_vbg;
let one_adj, two_adj, three_adj;
let one_adv, one_adv_s, one_modal, one_to, one_cc;
let one_in, three_of;

let pattern_five, pattern_seven;
let order;
let sentence = document.getElementById("sentence");

document.querySelector("img").onclick = () => {
  getHaiku();
};

function changeBackground(a) {
  document.getElementById("background_image").src = a;
}

document.getElementById("button1").onclick = () => {
  changeBackground(
    "https://cdn.glitch.com/c21f1aa2-19f3-4102-be39-60ffbdfa39c0%2Fimage1.png?v=1608271225413"
  );
};

document.getElementById("button2").onclick = () => {
  changeBackground(
    "https://cdn.glitch.com/a91d44ae-132c-44a3-8f78-0464308ee24d%2Fimage2.png?v=1609177779854"
  );
};

document.getElementById("button3").onclick = () => {
  changeBackground(
    "https://cdn.glitch.com/a91d44ae-132c-44a3-8f78-0464308ee24d%2Fimage3.png?v=1609177780907"
  );
};

document.getElementById("button4").onclick = () => {
  changeBackground(
    "https://cdn.glitch.com/a91d44ae-132c-44a3-8f78-0464308ee24d%2Fimage0.png?v=1609177780003"
  );
};

function preload() {
  json0 = loadJSON("./haikus/buson.json");
  json1 = loadJSON("./haikus/basho.json");
  json2 = loadJSON("./haikus/issa.json");
}

function setup() {
  text0 = textPrep(json0);
  text1 = textPrep(json1);
  text2 = textPrep(json2);
  finalText = text0 + text1 + text2;

  params = {
    ignoreCase: true
  };

  counts = RiTa.concordance(finalText, params);
  one_in = getWords('in', 1);
  one_per = getWords("prp", 1);
  one_per_s = removeFromArray(one_per, ["me", "us", "them"]);
  one_nn = getWords("nn", 1);
  one_nn = removeFromArray(one_nn, ["ah", "use", "hi"]);
  one_nn.push("doll");
  one_nn_s = removeFromArray(one_nn, ["abed", "air", "edge", "ax", "oil", "rain"]);
  two_nn = getWords("nn", 2);
  two_nn = removeFromArray(two_nn, ["kiri", "pampas", "dreamsa"]);
  three_nn = getWords("nn", 3);
  three_nn = removeFromArray(three_nn, ["mogami"]);
  three_nn.push("pampas grass", "kiri tree", "rainy-month");
  one_nns = getWords("nns", 1);
  one_nns = removeFromArray(one_nns, ["keeps", "runs", "stands", "jumps"]);
  two_nns = getWords("nns", 2);
  three_nns = getWords("nns", 3);
  
  one_vb = getWords("vb", 1);
  two_vb = getWords("vb", 2);
  two_vbg = getWords('vbg', 2);
  two_vbg = removeFromArray(two_vbg , ["evening"]);
  one_adj = getWords("jj", 1);
  two_adj = getWords("jj", 2);
  three_adj = getWords("jj", 3);
  three_adj.push("brilliant-hued", "pond-cooling");
  one_adv = getWords("rb", 1);
  one_adv_s = removeFromArray(one_adv, ["so", "just"]);
  one_modal = getWords("md", 1);
  one_to = getWords("to", 1);
  one_cc = getWords("cc", 1);
  three_of = ["the cloud of", "the scent of", "the cries of", "the snow of", "voices of", "shadow of", "chirping of"];
  
  pattern_five = [
    [one_adj, two_nns, two_vb],
    [one_adj, three_nns, one_vb],
    [two_adj, two_nns, one_vb],
    [one_adj, two_nn, one_modal, one_vb],
    [one_adj, two_nns, one_modal, one_vb],
    [two_adj, one_nns, one_modal, one_vb],
    [two_nns, one_modal, two_vb],
    [two_nns, one_modal, one_vb, one_adv_s],
    [one_to, two_vb, two_nns],
    [one_to, one_vb, three_nn],
    [one_per_s, one_modal, two_vb, one_nns],
    [one_per_s, one_modal, one_vb, two_nn],
    [["the"], one_nns, one_modal, two_vb],
    [["the"], one_nns, one_modal, one_vb, one_adv],
    [["the"], one_nn_s, one_modal, two_vb],
    [["the"], one_nn_s, one_modal, one_vb, one_adv],
    [two_vbg, ["and"], two_vbg],
    [["the"], one_nn_s, ["is"], two_vbg]
  ];

  pattern_seven = [
    [one_to, two_vb, two_adj, two_nn],
    [one_to, two_vb, two_adj, two_nns],
    [three_nn, one_modal, two_vb, one_adv_s],
    [three_nns, one_modal, two_vb, one_adv_s],
    [two_adj, two_nns, two_vb, one_adv_s],
    [two_adj, two_nns, one_modal, one_vb, one_adv_s],
    [two_adj, two_nn, one_modal, one_vb, one_adv_s],
    [two_adj, one_nn, one_modal, two_vb, one_adv_s],
    [one_per_s, one_modal, two_vb, one_adv, two_nn],
    [one_per_s, one_modal, two_vb, two_adj, one_nns],
    [one_per_s, one_modal, two_vb, one_adj, two_nns]
  ];
}

function textPrep(json) {
  var a = [];
  for (var i = 0; i < json.haikus.length; i++) {
    let haiku = json.haikus[i];
    a.push(haiku);
  }
  var b = a.join();
  return b;
}

function getWords(Tag, Syl) {
  var word;
  var Words = [];

  for (word in counts) {
    if (
      counts.hasOwnProperty(word) &&
      word.includes("-") == false &&
      word.includes("'") == false
    ) {
      var tags = RiTa.getPosTags(word);
      var syl = RiTa.getSyllables(word);
      var sylNum = syl.split("/").length;

      if (tags == Tag && sylNum == Syl) {
        Words.push(word);
      }
    }
  }
  return Words;
}

function getSentence(pattern) {
  var arr = [];
  var num = Math.floor(Math.random() * Math.floor(pattern.length));

  for (var i = 0; i < pattern[num].length; i++) {
    var a = pattern[num][i];
    var arNum = Math.floor(Math.random() * Math.floor(pattern[num][i].length));
    var final = pattern[num][i][arNum] + " ";
    arr.push(final);
  }
  let c = arr.join("");
  return c;
}

function getHaiku() {
  order = [pattern_five, pattern_seven, pattern_five];
  let haiku = [];
  for (var i = 0; i < order.length; i++) {
    haiku[i] = getSentence(order[i]);
  }

  sentence.innerHTML =
    "<br/>" +
    "&nbsp&nbsp" +
    haiku[0] +
    "&nbsp&nbsp" +
    "<br/>" +
    "&nbsp&nbsp" +
    haiku[1] +
    "&nbsp&nbsp" +
    "<br/>" +
    "&nbsp&nbsp" +
    haiku[2] +
    "&nbsp&nbsp" +
    "<br/>";
}

function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}