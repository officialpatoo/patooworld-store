
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { D3Node, D3Link } from '../types';

interface ForceGraphProps {
  data: {
    nodes: D3Node[];
    links: { source: string; target: string }[];
  };
  onNodeClick: (node: D3Node) => void;
  selectedNodeId: string | null;
  highlightedData: {
    visibleNodeIds: Set<string>;
    matchingNodeIds: Set<string>;
  } | null;
}

export const ForceGraph: React.FC<ForceGraphProps> = ({ data, onNodeClick, selectedNodeId, highlightedData }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !data) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const { width, height } = container.getBoundingClientRect();
    
    svg.attr('width', width).attr('height', height);

    const simulation = d3.forceSimulation<D3Node>(data.nodes)
      .force('link', d3.forceLink<D3Node, D3Link>(data.links).id(d => d.id).distance(d => 150 - d.source.depth * 40))
      .force('charge', d3.forceManyBody().strength(-200 - data.nodes.length * 2))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    const g = svg.append('g');

    const link = g.append('g')
      .attr('stroke', '#4A5568')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = g.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', 'cursor-pointer')
      .call(drag(simulation))
      .on('click', (event, d) => {
        onNodeClick(d);
        event.stopPropagation();
      });

    const getNodeRadius = (d: D3Node) => 35 - d.depth * 7;
    const getNodeColor = (d: D3Node) => {
        const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#6366F1'];
        return colors[d.depth % colors.length];
    }
    
    const circles = node.append('circle')
      .attr('r', getNodeRadius)
      .attr('fill', getNodeColor);
    
    node.append('text')
      .text(d => d.name.split(' ')[0])
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', 'white')
      .attr('font-size', d => `${14 - d.depth * 1.5}px`)
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none');
    
    node.append('title')
        .text(d => d.name);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as D3Node).x!)
        .attr('y1', d => (d.source as D3Node).y!)
        .attr('x2', d => (d.target as D3Node).x!)
        .attr('y2', d => (d.target as D3Node).y!);

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });
    
    // Dynamic style updates for highlighting and selection
    node
      .transition().duration(400)
      .style('opacity', d => highlightedData ? (highlightedData.visibleNodeIds.has(d.id) ? 1 : 0.1) : 1);
  
    link
      .transition().duration(400)
      .style('stroke-opacity', d => 
          highlightedData 
          ? (highlightedData.visibleNodeIds.has((d.source as D3Node).id) && highlightedData.visibleNodeIds.has((d.target as D3Node).id) ? 0.6 : 0.05) 
          : 0.6
      );

    circles
      .transition().duration(400)
      .attr('stroke', d => {
          if (d.id === selectedNodeId) return '#FBBF24'; // amber-400 for selection
          if (highlightedData?.matchingNodeIds.has(d.id)) return '#A78BFA'; // violet-400 for match
          return '#1F2937';
      })
      .attr('stroke-width', d => {
          if (d.id === selectedNodeId || highlightedData?.matchingNodeIds.has(d.id)) return 4;
          return 2;
      })
      .attr('r', d => {
          const baseRadius = getNodeRadius(d);
          if (d.id === selectedNodeId) return baseRadius * 1.2;
          if (highlightedData?.matchingNodeIds.has(d.id)) return baseRadius * 1.1;
          return baseRadius;
      });

    // Zoom and Pan
    const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.2, 5])
        .on('zoom', (event) => {
            g.attr('transform', event.transform.toString());
        });

    svg.call(zoom);

    const handleResize = () => {
        const { width: newWidth, height: newHeight } = container.getBoundingClientRect();
        svg.attr('width', newWidth).attr('height', newHeight);
        simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2));
        simulation.alpha(0.3).restart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        simulation.stop();
    };

  }, [data, onNodeClick, selectedNodeId, highlightedData]);

  const drag = <T extends d3.Simulation<D3Node, undefined>>(simulation: T) => {
    function dragstarted(event: d3.D3DragEvent<SVGGElement, D3Node, any>, d: D3Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, D3Node, any>, d: D3Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, D3Node, any>, d: D3Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag<SVGGElement, D3Node>()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef}></svg>
    </div>
  );
};
