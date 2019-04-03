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

function findShortestPath(g, startPoint, endPoint) {
  const weightMap = buildWeightMap(g, startPoint);
} 

function buildWeightMap(g, startPoint) {
  // массив для хранения посещенных вершин
  const visitedNode = new Array(g.length).fill(0);
  // массив содержащий кратчайшие веса переходов, заполняем бесконечностью, либо недостежимым числом
  // Предполагая что сумма весов не может превысить нашу 'бесконечность'
  const weightsMap = new Array(g.length).fill(Infinity);
  // Вес до начального пути 0, ну что вы в самом деле..мы же на месте стоим!
  weightsMap[startPoint] = 0;
  // Начинаем рассматривать алгоритм с начальной вершины.
  let currentNode = startPoint;
  // Направление куда ходим по графу, изначально идем по вершинам которые больше текущей
  let counterForward = +1;
  // Повторяем цикл пока все вершины не повещены
  while (visitedNode.indexOf(0) > -1) {
    // Итерируем по связанным вершинам.
    for (let j in g[currentNode]) {
      /* Проверяем что:
      1. Соседняя вершина ранее не была посещена
      2. Сумма до текущей вершины + вес ребра до следующей больше чем предыдущий минимальный путь
      3. Рассматриваемая вершина вообще есть (не 0, в js 0 == false)
      Если 1 из условий верно - прпоускаем шаг.
      */
      if (
        visitedNode[j] ||
        g[currentNode][j] + weightsMap[currentNode] > weightsMap[j] ||
        g[currentNode][j] === 0
      ) {
        continue;
      }
      // Запись нового минимального пути до вершины.
      weightsMap[j] = g[currentNode][j] + weightsMap[currentNode];
    }
    // Помечаем текущую вершину посещенной
    visitedNode[currentNode] = 1;
    // Двигаем согласно установленному направлению
    currentNode += counterForward;
    // Если дошли до конца массива то
    if (currentNode >= g.length) {
      // Устанавливаем текущую вершину на стартовую позицию
      currentNode = startPoint;
      // Менянем направление обхода массива посещенных нод к началу массива
      counterForward = -1;
    }
  }
  return weightsMap;
}

function buildShortestPath(g, weightsMap, endPos) {
  // Минимальная сумма ребер от стартовой до конечной вершины
  let endNodeWeight = weightsMap[endPos];
  //  Инициализация массива вершин соответвующих маршруту
  const path = [];
  // текущая позиция соответствующая рассматриваемой вершины
  let pos = endPos;
  // выполянем до тех пор пока весь рассматрвиаемой вершины не будет равен 0
  // что соответствует стартовой вершины графа
  while (endNodeWeight !== 0) {
    // итерируем по всем связанным вершинам
    for (let i in g[pos]) {
      // проверка на то что вес текущий позиции равен сумме веса предыдущей вершины 
      // + вес ребра для перехода из смежных вершин. (Это гарантирует то что путь минимальной длины)
      if (endNodeWeight === g[pos][i] + weightsMap[i]) {
        // записваем вершину в массив путей
        path.unshift(+i);
        // смещаем вес на следующую вершину
        endNodeWeight = weightsMap[i];
        // выбираем новую вершину для рассмотрения
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
