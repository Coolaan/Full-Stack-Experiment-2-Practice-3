const svg = document.getElementById('drawingCanvas');

let drawing = false;
let currentPath = null;
let points = [];

function getMousePosition(evt) {
  const rect = svg.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function pointsToPathData(points) {
  if (points.length === 0) return '';
  return points.map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : `L${p.x} ${p.y}`)).join(' ');
}

svg.addEventListener('mousedown', (evt) => {
  drawing = true;
  points = [];

  const pos = getMousePosition(evt);
  points.push(pos);

  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute('stroke', 'black');
  currentPath.setAttribute('stroke-width', 2);
  currentPath.setAttribute('fill', 'none');
  currentPath.setAttribute('d', pointsToPathData(points));
  svg.appendChild(currentPath);
});

svg.addEventListener('mousemove', (evt) => {
  if (!drawing) return;

  const pos = getMousePosition(evt);
  points.push(pos);

  currentPath.setAttribute('d', pointsToPathData(points));
});

svg.addEventListener('mouseup', (evt) => {
  if (!drawing) return;
  drawing = false;
  currentPath = null;
  points = [];
});

svg.addEventListener('mouseleave', (evt) => {
  if (drawing) {
    drawing = false;
    currentPath = null;
    points = [];
  }
});
