import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { TbZoomReset } from "react-icons/tb";
import classes from "./TreeChart.module.css";

const TreeChart = ({ data, changeTargetNodeOnChart }) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const [rootState, setRootState] = useState(data);
  const [initialized, setInitialized] = useState(false);
  const zoomBehavior = useRef(d3.zoom().scaleExtent([0.1, 2]));

  useEffect(() => {
    if (!initialized) {
      setRootState(data);
      setInitialized(true);
    } else {
      renderChart(rootState);
    }
  }, [data, rootState, initialized]);

  const renderChart = (chartData) => {
    const width = 1310; // fixed width
    const height = 450; // fixed height
    const margin = { top: 200, right: 10, bottom: 10, left: 10 };
    const dx = 50;
    const dy = 300;

    const root = d3.hierarchy(chartData);
    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3
      .linkVertical()
      .x((d) => d.y)
      .y((d) => d.x);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-margin.left, -margin.top, width, height])
      .style("cursor", "-webkit-grab");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    gRef.current = g;

    const zoom = zoomBehavior.current.on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

    svg.call(zoom);

    const update = (source) => {
      const nodes = root.descendants();
      const links = root.links();

      tree(root);

      const node = g
        .selectAll("g.node")
        .data(nodes, (d) => d.data.id || (d.data.id = ++i));

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        });

      nodeEnter
        .append("circle")
        .attr("r", 7)
        .attr("fill", (d) =>
          d._children ? "red" : d.children ? "#01ff70" : "#1FB3D5"
        )
        .attr("stroke-width", 1.5)
        .attr("stroke", "white");

      nodeEnter
        .append("text")
        .attr("dy", "0.31em")
        .attr("x", (d) => (d._children ? -10 : 10))
        .attr("text-anchor", (d) => (d._children ? "end" : "start"))
        .text((d) => d.data.name)
        .attr("font-size", "16px")
        .attr("fill", "white")
        .attr("font-family", "Arial, sans-serif")
        .style("cursor", "pointer");

      const nodeUpdate = node
        .merge(nodeEnter)
        .transition()
        .duration(500)
        .attr("transform", (d) => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      const nodeExit = node
        .exit()
        .transition()
        .duration(500)
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .remove();

      const link = g
        .selectAll("path.link")
        .data(links, (d) => d.target.data.id);

      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .attr("fill", "none")
        .attr("stroke", "#188E3F")
        .attr("stroke-width", "1.5px")
        .merge(link)
        .transition()
        .duration(500)
        .attr("d", diagonal);

      link
        .exit()
        .transition()
        .duration(500)
        .attr("d", (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .remove();

      nodes?.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    let i = 0;
    update(root);

    // Apply initial transform directly to the group element
    const initialTransform = d3.zoomIdentity.translate(0, 0).scale(0.5);
    g.attr("transform", initialTransform);

    return () => {
      svg.selectAll("*").remove();
    };
  };

  const zoomIn = () => {
    d3.select(svgRef.current)
      .transition()
      .duration(500)
      .call(zoomBehavior.current.scaleBy, 1.2);
  };

  const zoomOut = () => {
    d3.select(svgRef.current)
      .transition()
      .duration(500)
      .call(zoomBehavior.current.scaleBy, 0.8);
  };

  const resetZoom = () => {
    const currentTransform = d3.zoomTransform(svgRef.current);
    d3.select(svgRef.current)
      .transition()
      .duration(500)
      .call(
        zoomBehavior.current.transform,
        d3.zoomIdentity
          .translate(currentTransform.x, currentTransform.y)
          .scale(0.5)
      );
  };

  return (
    <div>
      <div className={classes.chartHolder}>
        <svg
          id="treeExample"
          ref={svgRef}
          preserveAspectRatio="xMinYMin slice"
        />
      </div>
      <div className={classes.zoomControls}>
        <FiZoomIn
          onClick={zoomIn}
          style={{ marginBottom: "5px" }}
          color="white"
        />
        <FiZoomOut
          onClick={zoomOut}
          style={{ marginBottom: "5px" }}
          color="white"
        />
        <TbZoomReset
          onClick={resetZoom}
          style={{ marginBottom: "5px" }}
          color="white"
        />
      </div>
    </div>
  );
};

export default TreeChart;
