import React from 'react';
import Plot from 'react-plotly.js';

const Graph1 = () => {
  const x = ['day 1', 'day 1', 'day 1', 'day 1', 'day 1', 'day 1',
    'day 2', 'day 2', 'day 2', 'day 2', 'day 2', 'day 2']

  const trace1 = {
    y: [0.2, 0.2, 0.6, 1.0, 0.5, 0.4, 0.2, 0.7, 0.9, 0.1, 0.5, 0.3],
    x: x,
    name: 'kale',
    marker: {color: '#3D9970'},
    type: 'box'
  };

  const trace2 = {
    y: [0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2],
    x: x,
    name: 'radishes',
    marker: {color: '#FF4136'},
    type: 'box'
  };

  const trace3 = {
    y: [0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5],
    x: x,
    name: 'carrots',
    marker: {color: '#FF851B'},
    type: 'box'
  };
  return (
    <Plot
      data={[trace1, trace2, trace3]}
      layout={{
        width: 1100,
        height: 600,
        plot_bgcolor: '#bfe2ca',
        paper_bgcolor: '#bfe2ca',
        boxmode: 'group',
        legend:{
         font: {
           color:'#5f5355',
         }
        },
        xaxis: {
          // visible:false,
          color:'#5f5355',
          showgrid: false,
        },
        yaxis: {
          color:'#5f5355',
          showgrid: false,
          zeroline: false
        }
      }}
    />
  );
};

export default Graph1;