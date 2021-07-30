function generateGraph(results){

    console.log(results)
    var data = {
        x: results.queues.map(q => q.name),
        y: results.queues.map(q => q.value),
        type: 'bar',
        name:'resoluciones x día',
        marker: { size: 15 }
    }

    var layout1 = {
        autosize: true,
        width: 700,
        height: 500,
        title: {
            text: `resoulcion de tickets x dia escenario agentesLV: ${results.weekAgents} agentesFD: ${ results.weekendAgents}`,
            margin:{t:10}
        },
        yaxis: {
            title: {
                text:"Porcentaje de tickets resueltos sobre el total"
            },
        },
        xaxis: {
            title: {
                text: "Dias"
            },
        },
        plotBackground: '#f3f6fa',
        margin: {t:50, r: 0, l: 100, b: 100},
    };


    var config = { responsive: true, displayModeBar: false };
    
    graphDiv = document.getElementById('graph1');
    Plotly.newPlot(graphDiv, [data], layout1, config);
}