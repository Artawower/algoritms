function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms) {}
} 

function paintGraph(g, weights) {
  var len = undefined;
  const nodes = [];
  g.forEach((_, i) =>
    nodes.push({
      id: i,
      label: `${i} / ${weights ? weights[i] : ''}`,
      // group: groups[i] ? groups[i] : 0,
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

function findShortestPath(g, startPoint, endPoint) {
  const weightMap = buildWeightMap(g, startPoint);
} 

async function buildWeightMap(g, startPoint) {
  const visitedNode = new Array(g.length).fill(0);
  const weightsMap = new Array(g.length).fill(Infinity);
  weightsMap[startPoint] = 0;
  let currentNode = startPoint;
  let counterForward = +1;
  while (visitedNode.indexOf(0) > -1) {
    for (let j in g[currentNode]) {
      if (
        visitedNode[j] ||
        g[currentNode][j] + weightsMap[currentNode] > weightsMap[j] ||
        g[currentNode][j] === 0
      ) {
        continue;
      }
      weightsMap[j] = g[currentNode][j] + weightsMap[currentNode];
      paintGraph(g, weightsMap);
    }
    visitedNode[currentNode] = 1;
    currentNode += counterForward;
    if (currentNode >= g.length) {
      currentNode = startPoint;
      counterForward = -1;
    }
  }
  return weightsMap;
}

function buildShortestPath(g, weightsMap, endPos) {
  let endNodeWeight = weightsMap[endPos];
  const path = [];
  let pos = endPos;
  while (endNodeWeight !== 0) {
    for (let i in g[pos]) {
      if (endNodeWeight === g[pos][i] + weightsMap[i]) {
        path.unshift(+i);
        endNodeWeight = weightsMap[i];
        pos = i;
      }
    }
  }
  return path;
}

paintGraph(g);
const weightsMap = buildWeightMap(g, 2);
console.log('TCL: weightMap', weightsMap);
const shortestPath = buildShortestPath(g, weightsMap, 0)
console.log("TCL: shortestPath", shortestPath)
