require('dotenv').config();
const { schedulePixMonitorJob } = require('./pix-monitor-job');
const { startRedemptionListener } = require('./redemption-processor-job');

console.log("Starting Job Orchestrator...");

// Agenda o job de monitoramento PIX para rodar a cada minuto.
schedulePixMonitorJob();

// Inicia o listener para os eventos de resgate.
startRedemptionListener();

// O processo é mantido em execução para que os jobs funcionem continuamente.