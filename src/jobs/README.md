# Jobs Directory for NRISIMHADEVA Protocol

This directory contains job scripts that perform off-chain tasks for the NRISIMHADEVA Oracle integration:

- `job-orchestrator.js`: The main script that starts and orchestrates the job scheduling and event listeners.
- `pix-monitor-job.js`: A scheduled job that monitors PIX transactions via the PIX API every minute, processes payments on-chain via the Oracle contract, and marks transactions as processed.
- `redemption-processor-job.js`: A listener service for redemption events emitted by the Oracle contract, processes these events and calls the respective redemption function using a payload encoded in CBOR.

## Job Flow Diagram

The following diagram summarizes the integration of the Oracle jobs with the NRISIMHADEVA protocol:

```mermaid
flowchart TD
    JO[Job Orchestrator<br/>(job-orchestrator.js)] --> PM[PIX Monitor Job<br/>(pix-monitor-job.js)]
    JO --> RP[Redemption Processor Job<br/>(redemption-processor-job.js)]
    
    PM -->|Consulta e atualiza| API[PIX API]
    PM -->|Chama processPIXPayment| OC1[Oracle Contract]
    
    OC1 -- "Emite evento PixPaymentProcessed" --> RP
    RP -->|Chama processRedemption com payload CBOR| OC2[Oracle Contract]
```

This diagram shows that the job orchestrator starts the two jobs. The PIX monitor job queries the PIX API and calls the `processPIXPayment` function of the Oracle contract, while the redemption processor job listens for the `PixPaymentProcessed` event and calls the `processRedemption` function after processing the payload in CBOR.

## Setup and Configuration

1. Ensure the project is configured with the necessary environment variables by creating a `.env` file in the project root. The required variables include:
   - `RPC_URL`: Your Ethereum node RPC URL (e.g., provided by Infura or Alchemy).
   - `PRIVATE_KEY`: The private key of the wallet used for signing blockchain transactions.
   - `NRISIMHADEVA_ORACLE_ADDRESS`: The deployed address of the Oracle contract.
   - `PIX_API_URL`: The endpoint for the PIX transactions API.
   - `PIX_API_AUTH`: The authorization token or bearer token for the PIX API.

2. Install dependencies by running:

   ```bash
   npm install
   ```

## Running the Jobs

- To start the job orchestrator, run:

   ```bash
   npm start
   ```

- For production deployments, consider using a process manager such as PM2 to ensure continuous operation:

   ```bash
   pm2 start src/jobs/job-orchestrator.js --name nrisimhadeva-oracle
   ```

## Logging and Error Handling

Each job script logs informative messages and errors to the console to facilitate monitoring and debugging. Check the console output for details on the job execution, blockchain transactions, and API responses.


