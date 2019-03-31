g = [
  [0, 2, 8, 0, 0, 0],
  [2, 0, 0, 6, 0, 0],
  [8, 0, 0, 12, 0, 0],
  [0, 6, 12, 0, 1, 0],
  [0, 0, 0, 1, 0, 22],
  [0, 0, 0, 0, 22, 0],
]

INFINITY = 10**10
min_weights = [INFINITY for _ in range(len(g))]
min_weights[0] = 0
visited_v = [False for _ in range(len(g))]


for (i, visited) in enumerate(visited_v):
  for (j, v) in enumerate(g[i]):
    if i == j or visited_v[j] or v == 0:
      continue
    if v + min_weights[i] < min_weights[j]:
      min_weights[j] = v + min_weights[i]
  visited_v[i] = True

print(min_weights)

# Собираем кратчайший путь от 5 вершины 

path = [5]
for i in range(5, -1, -1):
  for (j, v) in enumerate(g[i]):
    if v == min_weights[i] - min_weights[j]:
      print(min_weights[i], min_weights[j], j)
      path.insert(0, j)
      break
  if path[0] == 0:
    break
print(path)
