
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

interface Props {
  data: {
    nodes: Node[];
    links: Link[];
  };
}

const ArchitectureMap: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const width = svgRef.current.clientWidth;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Re-create nodes and links to avoid mutations issues with d3
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const g = svg.append("g");

    const link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("class", "map-link");

    const node = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    const getColor = (type: string) => {
      switch(type) {
        case 'file': return '#3b82f6'; // Blue
        case 'security': return '#ef4444'; // Red for security
        case 'logic': return '#10b981'; // Green
        case 'ui': return '#f59e0b'; // Amber
        default: return '#94a3b8';
      }
    };

    node.append("circle")
      .attr("r", 12)
      .attr("class", "map-node")
      .style("fill", d => getColor(d.type));

    node.append("text")
      .attr("dx", 18)
      .attr("dy", 5)
      .attr("class", "map-text text-xs font-bold")
      .text(d => d.label);

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => { simulation.stop(); };
  }, [data]);

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-inner">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <div className="flex gap-4">
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[10px] text-slate-500 font-bold uppercase">Arquivo</span></div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-[10px] text-slate-500 font-bold uppercase">Segurança</span></div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[10px] text-slate-500 font-bold uppercase">Lógica</span></div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[10px] text-slate-500 font-bold uppercase">Interface</span></div>
        </div>
        <span className="text-xs font-semibold text-slate-400">Arraste os nós para interagir</span>
      </div>
      <svg ref={svgRef} className="w-full h-[400px]"></svg>
    </div>
  );
};

export default ArchitectureMap;
