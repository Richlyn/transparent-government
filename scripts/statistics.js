var allMembers = data.results[0].members;
var stats = statistics.senateAtGlance[0];
var repArray = repArr();
var demArray = demArr();
var indepArray = indepArr();
var body = document.getElementById("tBody");
var glance = document.getElementById("glanceTable");
var bottAtt = document.getElementById("bottAtt");
var topAtt = document.getElementById("topAtt");
var topLoyalty = document.getElementById("topLoyalty");
var bottomLoyalty = document.getElementById("bottomLoyalty");

statistics.senateAtGlance[0].number = repArray.length;
statistics.senateAtGlance[1].number = demArray.length;
statistics.senateAtGlance[2].number = indepArray.length;
statistics.senateAtGlance[0].votes_with_party_pct = findingAvg(repArray);
statistics.senateAtGlance[1].votes_with_party_pct = findingAvg(demArray);
statistics.senateAtGlance[2].votes_with_party_pct = findingAvg(indepArray);
console.log(statistics);

//Created Arrays for republican,democratic & independent
function repArr() {
  var repArray = [];
  for (var r = 0; r < allMembers.length; r++) {
    if (allMembers[r].party == "R") {
      repArray.push(allMembers[r]);
    }
  }
  console.log(repArray);
  return repArray;
}

function demArr() {
  var demArray = [];
  for (var d = 0; d < allMembers.length; d++) {
    if (allMembers[d].party == "D") {
      demArray.push(allMembers[d]);
    }
  }
  console.log(demArray);
  return demArray;
}

function indepArr() {
  var indepArray = [];
  for (var b = 0; b < allMembers.length; b++) {
    if (allMembers[b].party == "I") {
      indepArray.push(allMembers[b]);
    }
  }
  console.log(indepArray);
  return indepArray;
}

//At A Glance Table
function glanceTable() {
  // creating normal table
  var glanceTable = document.querySelector("#glanceTable");

  for (var g = 0; g < statistics.senateAtGlance.length; g++) {
    glanceTable.innerHTML =
      glanceTable.innerHTML +
      "<tr><td>" +
      statistics.senateAtGlance[g]["name"] +
      "</td><td>" +
      statistics.senateAtGlance[g]["number"] +
      "</td><td>" +
      statistics.senateAtGlance[g]["votes_with_party_pct"] +
      "</td></tr>";
  }
}
glanceTable();

//Finding the Avg Votes Function
function findingAvg(array) {
  var avg = 0;
  for (i = 0; i < array.length; i++) {
    avg += array[i].votes_with_party_pct;
  }
  avg = avg / array.length;
  return avg;
}

console.log(document.title);

//Bottom 10% Table

function bottomAttTable() {
  var bottAtt = document.querySelector("#bottAtt");
  //creating normal table
  for (var t = 0; t < statistics.bottomMembers.length; t++) {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerHTML = statistics.bottomMembers[t].name;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.innerHTML = statistics.bottomMembers[t].missed_votes;
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.innerHTML = statistics.bottomMembers[t].missed_votes_pct;
    tr.appendChild(td3);
    bottAtt.appendChild(tr);
  }
}
bottomAttTable();

// Top  10% Table
function topAttTable() {
  var topAtt = document.querySelector("#topAtt");
  //creating normal table
  for (var t = 0; t < statistics.topMembers.length; t++) {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerHTML = statistics.topMembers[t].name;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.innerHTML = statistics.topMembers[t].missed_votes;
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.innerHTML = statistics.topMembers[t].missed_votes_pct;
    tr.appendChild(td3);
    topAtt.appendChild(tr);
  }
}
topAttTable();
// // Top  10% Table
// function bottomLoyalTable() {
//   var bottomLoyalty = document.querySelector("#bottomLoyalty");
//   //creating normal table
//   for (var t = 0; t < statistics.bottomLoyaltyMembers.length; t++) {
//     let tr = document.createElement("tr");

//     let td1 = document.createElement("td");
//     td1.innerHTML = statistics.bottomLoyaltyMembers[t].name;
//     tr.appendChild(td1);

//     let td2 = document.createElement("td");
//     td2.innerHTML = statistics.bottomLoyaltyMembers[t].total_votes;
//     tr.appendChild(td2);

//     let td3 = document.createElement("td");
//     td3.innerHTML = statistics.bottomLoyaltyMembers[t].votes_with_party_pct;
//     tr.appendChild(td3);
//     bottomLoyalty.appendChild(tr);
//   }
// }
// bottomLoyalTable();

// // Top  10% Table
// function topLoyalTable() {
//   var topLoyalty = document.querySelector("#topLoyalty");
//   //creating normal table
//   for (var t = 0; t < statistics.topLoyaltyMembers.length; t++) {
//     let tr = document.createElement("tr");

//     let td1 = document.createElement("td");
//     td1.innerHTML = statistics.topLoyaltyMembers[t].name;
//     tr.appendChild(td1);

//     let td2 = document.createElement("td");
//     td2.innerHTML = statistics.topLoyaltyMembers[t].total_votes;
//     tr.appendChild(td2);

//     let td3 = document.createElement("td");
//     td3.innerHTML = statistics.topLoyaltyMembers[t].votes_with_party_pct;
//     tr.appendChild(td3);
//     topLoyalty.appendChild(tr);
//   }
// }
// topLoyalTable();

// 10% list function
function sortbyPopular(allMembers) {
  const tenP = Math.round((10 * allMembers.length) / 100);

  let sortedList = allMembers.sort(function(a, b) {
    return a.total_votes - b.total_votes;
  });

  return sortedList.slice(0, tenP).map(el => {
    return [
      el.last_name,
      el.first_name,
      el.total_votes,
      el.votes_with_party_pct
    ];
  });
}
console.log(sortbyPopular(allMembers));

//top 10% list
function sortbyUnpopular(allMembers) {
  const tenP = Math.round((10 * allMembers.length) / 100);

  let sortedList = allMembers.sort(function(a, b) {
    return b.total_votes - a.total_votes;
  });

  return sortedList.slice(0, tenP).map(el => {
    return [
      el.last_name,
      el.first_name,
      el.total_votes,
      el.votes_with_party_pct
    ];
  });
}
console.log(sortbyUnpopular(allMembers));
