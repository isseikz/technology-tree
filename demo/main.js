let rootNode = new TechTree.Node('0', 'Root Node', 'This is the root node');

let node1 = new TechTree.Node('1', 'Node 1', 'This is node 1', rootNode);
let node1_1 = new TechTree.Node('2', 'Node 2', 'This is node 2', node1);
let node1_1_1 = new TechTree.Node('3', 'Node 3', 'This is node 3', node1_1);
let node1_1_2 = new TechTree.Node('4', 'Node 3', 'This is node 3', node1_1);
let node2 = new TechTree.Node('5', 'Node 2', 'This is node 2', rootNode);

let dep1 = new TechTree.Dependency(rootNode, node1, true);
let dep5 = new TechTree.Dependency(rootNode, node2);
let dep2 = new TechTree.Dependency(node1, node1_1, true);
let dep3 = new TechTree.Dependency(node1_1, node1_1_1);
let dep4 = new TechTree.Dependency(node1_1, node1_1_2);

const myComponent = new TechTree.TechTreeUI();
myComponent.updateData([], [])

myComponent.addNode(rootNode);
myComponent.addNode(node1);
myComponent.addNode(node1_1);
myComponent.addNode(node1_1_1);
myComponent.addNode(node1_1_2);
myComponent.addNode(node2);

myComponent.addDependency(dep1);
myComponent.addDependency(dep2);
myComponent.addDependency(dep3);
myComponent.addDependency(dep4);
myComponent.addDependency(dep5);

document.body.appendChild(myComponent);
