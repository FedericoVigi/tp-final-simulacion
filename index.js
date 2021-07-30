(function () {

    let simulateBtn = document.getElementById("simulate-btn");
    //let weekAgentsInput = document.getElementById('weekAgents')
    //let weekendAgentsInput = document.getElementById('weekendAgents')

    simulateBtn.onclick = function () {
        
        //let weekAgents = parseInt(weekAgentsInput.value)
        //let weekendAgents = parseInt(weekendAgentsInput.value)

        //results = simulate(165,145)// pesimista
        results = simulate(100,80)// real
        //results = simulate(190,160) //  optimo
        generateGraph(results)
    };


})();