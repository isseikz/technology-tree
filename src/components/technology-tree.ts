import { Dependency, Node } from "../data";
import * as d3 from "d3";

const COMPONENT_NAME = 'tech-tree';
const PRIMARY_COLOR = '#3273DC';
const SECONDARY_COLOR = '#23D160';
const ACCENT_COLOR = '#FF3860';
const BACKGROUND_COLOR = '#FAFAFA';
const FONT_COLOR = '#363636';
const AVAILABLE_NODE_COLOR = '#FFDD57';
const IN_PROGRESS_NODE_COLOR = '#FF851B';
const COMPLETED_NODE_COLOR = '#48C774';
const HIGHLIGHT_COLOR = '#E8E8E8';
const TOOLTIP_BACKGROUND_COLOR = '#FFFFFF';
const BORDER_COLOR = '#D3D3D3';
const CARD_WIDTH = 150;
const CARD_HEIGHT = 70;
const CARD_RX = 4; // Changed to 4px for border-radius
const CARD_RY = 4; // Changed to 4px for border-radius
const TEXT_DX = 22;
const TEXT_DY_NAME = '.35em';
const TEXT_DY_DESC = '1.35em';
const TEXT_FONT_FAMILY = 'Open Sans, sans-serif'; // Changed to Open Sans
const TEXT_FONT_SIZE = '16px';

class TechTreeUI extends HTMLElement {
  private nodes: Node[] = [];
  private dependencies: Dependency[] = [];

  constructor(nodes?: Node[], dependencies?: Dependency[]) {
    super();
    this.nodes = nodes || [];
    this.dependencies = dependencies || [];
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    window.customElements.whenDefined(COMPONENT_NAME).then(() => {
      console.log("connectedCallback");
      this.render();
    });
  }

  render() {
    // // Create a tree layout
    if (!this.shadowRoot)  {
      console.error("shadowRoot is null");
      return;
    }

    if (this.nodes.length === 0) {
      console.error("nodes is empty");
      return;
    }

    let data = this.nodes.map(node => ({
      id: node.id,
      parentId: this.dependencies.find(dep => dep.target === node)?.source.id,
      name: node.name,
      description: node.description,
    }));

    let stratify = d3.stratify()
      .id((d: any) => d.id)
      .parentId((d: any)  => d.parentId);

    let root = stratify(data);
    this.shadowRoot.appendChild(document.createElement("div"));

    const treeLayout = d3.tree().size([800, 500]);

    let svg = d3.select(this.shadowRoot as any).append("svg")
      .attr("width", 1000)
      .attr("height", 600)
      .style('background-color', BACKGROUND_COLOR); // Set the background color of the SVG
    
    const g = svg.append("g");

    // // You can now use the selectedSvg with your treeLayout
    treeLayout(root);

    // // Create a group for each node
    const gNodes = g.append('g')
      .selectAll('g.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

    // // Append a circle for each node
    this.createCardNode(gNodes);

    // Create a link generator
    let linkGenerator = d3.linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    const link = g
      .append("g")
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("fill", "none")
        .attr("stroke", (d: any) => this.dependencies.find(dep => dep.target.id === d.target.id && dep.source.id === d.source.id)?.completed ? 'green' : PRIMARY_COLOR) // Use green color for satisfied dependencies
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", (d: any) => this.dependencies.find(dep => dep.target.id === d.target.id && dep.source.id === d.source.id)?.completed ? 20 : 15) // Use thicker stroke for satisfied dependencies
        .attr("d", linkGenerator as any);
  }

  disconnectedCallback() {
    console.log('MyComponent removed from page.');
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    console.log('MyComponent attribute changed.');
  }

  addNode(node: Node) {
    this.nodes.push(node);
  }

  addDependency(dependency: Dependency) {
    this.dependencies.push(dependency);
  }

  updateData(nodes: Node[], dependencies: Dependency[]) {
    this.nodes = nodes;
    this.dependencies = dependencies;
    this.render();
  }

  createCardNode(gNodes: any) {
    gNodes.append('rect')
      .attr('width', CARD_WIDTH)
      .attr('height', CARD_HEIGHT)
      .attr('x', 0)
      .attr('y', -CARD_HEIGHT / 2)
      .attr('rx', CARD_RX)
      .attr('ry', CARD_RY)
      .attr('fill', PRIMARY_COLOR) // Use the primary color for the cards
      .attr('stroke', BORDER_COLOR) // Use the border color for the card borders
      .style('opacity', 0.95) // Added for background opacity
      .style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.1)'); // Added for box-shadow

    gNodes.append('title')
      .text((d: any) => d.data.name);

    gNodes.append('text')
      .attr('dx', TEXT_DX)
      .attr('dy', TEXT_DY_NAME)
      .style('font-family', TEXT_FONT_FAMILY)
      .style('font-size', TEXT_FONT_SIZE) // Changed to 18px for title font size
      .style('font-weight', '600') // Added for title font weight
      .text((d: any) => d.data.name);

    gNodes.append('text')
      .attr('dx', TEXT_DX)
      .attr('dy', TEXT_DY_DESC)
      .style('font-family', TEXT_FONT_FAMILY)
      .style('font-size', '14px') // Changed to 14px for description font size
      .style('font-weight', '400') // Added for description font weight
      .text((d: any) => d.data.description);
  }
}

customElements.define(COMPONENT_NAME, TechTreeUI);

export default TechTreeUI;
