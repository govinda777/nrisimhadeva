require('dotenv').config();
const schedule = require('node-schedule');
const axios = require('axios');
const { ethers } = require('ethers');
const { v4: uuidv4 } = require('uuid');

// Importa o ABI do contrato Oracle (assumindo que ele está em src/blockchain/NrisimhadevaOracle.json)
const oracleArtifact = require('../blockchain/NrisimhadevaOracle.json');

// Inicializa o provider e instancia o contrato usando ethers.
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const oracleContract = new ethers.Contract(
    process.env.NRISIMHADEVA_ORACLE_ADDRESS,
    oracleArtifact.abi,
    wallet
);

async function runPixMonitorJob() {
    console.log(`[${new Date().toISOString()}] Running PIX monitor job...`);
    try {
        // Consulta as transações na API do PIX.
        const response = await axios.get(`${process.env.PIX_API_URL}/transactions`, {
            headers: { Authorization: `Bearer ${process.env.PIX_API_AUTH}` }
        });
        const transactions = response.data; // Assume um array de objetos de transação.
        console.log(`Fetched ${transactions.length} transactions from PIX API.`);
        
        // Para cada transação concluída e ainda não processada...
        for (const tx of transactions) {
            if (tx.status === 'completed' && !tx.processed) {
                const uniqueId = uuidv4();
                console.log(`Processing transaction ${tx.id} with unique ID ${uniqueId}`);
                // Chama a função do contrato processPIXPayment.
                // Supõe que a assinatura seja: processPIXPayment(string uniqueId, address payer, uint256 amount)
                const txn = await oracleContract.processPIXPayment(
                    uniqueId,
                    tx.payerAddress,
                    ethers.utils.parseEther(tx.amount.toString())
                );
                console.log(`Sent blockchain transaction: ${txn.hash}`);
                await txn.wait();
                console.log(`Blockchain transaction confirmed for tx id ${tx.id}`);
                // Marca a transação como processada na API do PIX.
                await axios.post(`${process.env.PIX_API_URL}/markProcessed`, { transactionId: tx.id }, {
                    headers: { Authorization: `Bearer ${process.env.PIX_API_AUTH}` }
                });
                console.log(`Marked transaction ${tx.id} as processed in PIX API.`);
            }
        }
    } catch (error) {
        console.error("Error in PIX monitor job:", error);
    }
}

// Exporta uma função que agenda o job para rodar a cada minuto.
function schedulePixMonitorJob() {
    schedule.scheduleJob('* * * * *', runPixMonitorJob);
    console.log("Scheduled PIX monitor job to run every minute.");
}

module.exports = { schedulePixMonitorJob, runPixMonitorJob };