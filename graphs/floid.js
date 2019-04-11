function paintGraph(g, groups = []) {
  var len = undefined;
  const nodes = [];
  g.forEach((_, i) =>
    nodes.push({
      id: i,
      label: `${i}`,
      group: groups[i] ? groups[i] : 0,
      shape: 'circle'
    })
  );
  const visited = new Array(g.length).fill(0);
  const edges = [];
  for (const i in g) {
    for (const j in g[i]) {
      if (g[i][j] !== 0 && i !== j) {
        if (!visited[j]) {
          edges.push({ from: i, to: j, label: `${g[i][j]}` });
        }
      }
    }
    visited[i] = 1;
  }
  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    physics: false,
    nodes: {
      shape: 'dot',
      size: 30,
      font: {
        size: 32
      },
      borderWidth: 2,
      shadow: true
    },
    edges: {
      width: 2,
      shadow: true
    }
  };
  network = new vis.Network(container, data, options);
}
const g = [
  [0, 8, 0, 2, 0, 0],
  [8, 0, 12, 0, 0, 0],
  [0, 12, 0, 6, 1, 0],
  [2, 0, 6, 0, 0, 0],
  [0, 0, 1, 0, 0, 22],
  [0, 0, 0, 0, 22, 0]
];

g2 = [
  [0, 9, 2],
  [1, 0, 4],
  [2, 4, 0],
]
g3 = [
  [11, 0, 0, 0],
  [0, 0, 6, 8],
  [0, 0, 0, 1],
  [0, 0, 0, 0],
]
function buildShortestPath(g) {
  const copiedG = JSON.parse(JSON.stringify(g));
  for (let k=0; k < copiedG.length; k++) {
    for (let i=0; i < copiedG.length; i++) {
      for (let j=0; j<copiedG.length; j++) {
        console.log(k, i, j, '|', copiedG[i][j], copiedG[i][k] + copiedG[k][j]);
        if (copiedG[i][j] > copiedG[i][k] + copiedG[k][j] && copiedG[i][k] + copiedG[k][j] !== 0) {
          copiedG[i][j] = copiedG[i][k] + copiedG[k][j];
        }
      }
    }
  }
  return copiedG;
}
paintGraph(g2);
const r = buildShortestPath(g2);
console.log(r)
const r2 = buildShortestPath(g3);
console.log(r2);
