
function simulateScenarios(scenarios){
    return scenarios.map(s => simulate(s.weekAgents, s.weekendAgents))
}

function simulate(weekAgents, weekendAgents) {
    const maxTime = 99999 // TF
    const validMessagesRatio = 0.96
    const fixedTicketCost = 2.75 
    let variableCosts = 0 // CV
    const ticketsQueues = [
        {
            id:"NS1",
            pending: 0, 
            totalSolved:0 
        },
        {
            id:"NS2",
            pending: 0, 
            totalSolved:0 
        },
        {
            id:"NS3",
            pending: 0, 
            totalSolved:0 
        },
        {
            id:"NSMay3",
            pending: 0, 
            totalSolved:0 
        }
    ]

    for (var time = 0; time < maxTime; time++){
        activeAgents = isWeekend(time) ? weekendAgents : weekAgents // N
        newTickets = isWeekend(time) ? infoFS() : infoLV()
        ticketsQueues[0].pending += Math.ceil(newTickets * validMessagesRatio)
        resolutionCapacity = cAgentTot(activeAgents)

        for(let i = ticketsQueues.length -1 ; i >= 0; i--) { 
            queue = ticketsQueues[i]
            tickets = Math.min( queue.pending , resolutionCapacity)
            
            if(tickets > 0) {
                queue.pending -= tickets
                resolutionCapacity -= tickets
                queue.totalSolved += tickets
            }
            
            if(queue.id == "NSMay3") {
                variableCosts += costoPen(tickets)
            }else{
                ticketsQueues[i+1].pending += queue.pending 
                queue.pending = 0 
            }
            
        }
    }
    return getResults(ticketsQueues, fixedTicketCost, variableCosts, weekAgents, weekendAgents, (maxTime/365))
}

function isWeekend(time){
    return time % 7 < 2
}

function cAgentTot(activeAgents){
    let acum = 0 
    for(let i = 0; i < activeAgents; i++){ 
        acum += cAgent()
    } 
    return acum
}

function getResults(ticketsQueues, fixedTicketCost, variableCosts, weekAgents, weekendAgents, years) {
    const totalTickets = ticketsQueues.reduce((a, b) => a + b.totalSolved, 0)
    const totalCost = (fixedTicketCost * totalTickets) + variableCosts
    return {
        averageAnualCost: (totalCost / years).toFixed(2),
        weekAgents: weekAgents,
        weekendAgents: weekendAgents,
        queues : [
            {
                name: "Dia 1",
                value:ticketsQueues.find( q => q.id == "NS1").totalSolved * 100 / totalTickets
            },
            {
                name: "Dia 2",
                value:ticketsQueues.find( q => q.id == "NS2").totalSolved * 100 / totalTickets
            },
            {
                name: "Dia 3",
                value:ticketsQueues.find( q => q.id == "NS3").totalSolved * 100 / totalTickets
            },
            {
                name: "Dia >3",
                value:ticketsQueues.find( q => q.id == "NSMay3").totalSolved * 100 / totalTickets
            }
        ]
    }
}

// fdps

function infoFS() {
    //R*(3450,0000-2413,0000)+2413,0000
    const R = Math.random() 
    return Math.ceil( R*(3450-2413)+2413)
}

function infoLV() {
    const R = Math.random() 
    return Math.ceil(R*(8188-3698)+3698)
}

function cAgent(){
    //  R*(55,0000-6,0000)+6,0000
    const R = Math.random() 
    return Math.ceil(R*(55-6)+6)
}

function costoPen(tickets) {
    // 3/5 - 3/20 * sqrt(9 - 8R)
    let acum = 0
    for(let i = 0; i < tickets; i++){
        let R = Math.random() 
        acum += (3/5) - ((3/20) * Math.sqrt(9 - (8*R)))
    } 
    
    return acum
}

