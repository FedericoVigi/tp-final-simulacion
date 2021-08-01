function generateGraph(results){

    console.log(results)
    config = { responsive: true, displayModeBar: false };
    graphs = document.getElementById('graphs');

    // remove old graphs
    while (graphs.firstChild) {
        graphs.removeChild(graphs.lastChild);
    }


    results.forEach(result => {
       
        data = getGraphData(result)
        layout = getLayout(result.weekAgents, result.weekendAgents)
       
        anualCostResult = document.createElement("h6")
        anualCostResult.appendChild(document.createTextNode(`Costo anual promedio: ${result.averageAnualCost}`))
       
        graphDiv = document.createElement("div")
        graphs.appendChild(anualCostResult)
        graphs.appendChild(graphDiv)
        Plotly.newPlot(graphDiv, [data], layout, config);
    });
}

function getGraphData(result){
    return  {
        x: result.queues.map(q => q.name),
        y: result.queues.map(q => q.value),
        type: 'bar',
        name:'resoluciones x día',
        marker: { size: 15 }
    }

}

function getLayout(weekAgents, weekendAgents){
    return {
        autosize: true,
        width: 700,
        height: 500,
        title: {
            text: `Escenario agentesLV: ${weekAgents} agentesFD: ${weekendAgents}`,
            font: {
                family: 'Courier New, monospace',
              },
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
    }

}