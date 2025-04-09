// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Dependências externas
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";       // Integração com Chainlink Oracle
import "@openzeppelin/contracts/access/AccessControl.sol";       // Controle de acesso por roles
import "./NrisimhadevaToken.sol";                                // Contrato do token personalizado
import "@openzeppelin/contracts/utils/Strings.sol";              // Utilitários para manipulação de strings
import "@chainlink/contracts/src/v0.8/vendor/CBORChainlink.sol"; // Codificação CBOR para requisições Chainlink

contract NrisimhadevaOracle is ChainlinkClient, AccessControl {
    using Chainlink for Chainlink.Request;
    
    // Roles de acesso
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE"); // Role para nós oráculos autorizados
    
    // Referência ao contrato do token
    NrisimhadevaToken public tokenContract;
    
    // Configurações Chainlink
    address private chainlinkToken;  // Endereço do token LINK
    bytes32 private jobId;           // ID do job no oracle Chainlink
    uint256 private fee;             // Taxa de operação do Chainlink
    address private oracleAddress;   // Endereço do contrato oracle
    
    // Eventos
    event PixPaymentDetected(
        address indexed recipient,
        uint256 amount,
        string pixTransactionId
    );
    
    event PixPaymentProcessed(
        address indexed recipient,
        uint256 amount,
        string pixKey
    );

    constructor(
        address _tokenAddress,    // Endereço do contrato do token
        address _chainlinkToken,  // Endereço do token LINK na rede
        address _oracleAddress,   // Endereço do contrato oracle Chainlink
        bytes32 _jobId,           // ID do job configurado no node Chainlink
        uint256 _fee              // Taxa em LINK para cada requisição
    ) {
        // Inicialização dos contratos
        tokenContract = NrisimhadevaToken(_tokenAddress);
        chainlinkToken = _chainlinkToken;
        jobId = _jobId;
        fee = _fee;
        oracleAddress = _oracleAddress;
        
        // Configuração de roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);  // Admin padrão
        _grantRole(ORACLE_ROLE, _oracleAddress);     // Permissão para o oracle
        
        // Configuração inicial da rede Chainlink
        _setChainlinkToken(_chainlinkToken);
    }

    /**
    * @notice Processa pagamentos PIX detectados (chamado pelo oracle)
    * @param _recipient Endereço do destinatário dos tokens
    * @param _amount Valor em tokens a ser emitido
    * @param _pixTransactionId ID único da transação PIX
    */
    function processPIXPayment(
        address _recipient,
        uint256 _amount,
        string calldata _pixTransactionId
    ) external onlyRole(ORACLE_ROLE) {
        require(_amount > 0, "Valor invalido");
        
        // Emissão de tokens para o destinatário
        tokenContract.issueTokens(
            _recipient,
            _amount,
            _pixTransactionId
        );
        
        emit PixPaymentDetected(_recipient, _amount, _pixTransactionId);
    }

    /**
    * @notice Inicia processo de resgate via PIX
    * @param _sender Endereço solicitante do resgate
    * @param _amount Valor em tokens a ser resgatado
    * @param _pixKey Chave PIX para o resgate (CPF/CNPJ, email, telefone ou chave aleatória)
    */
    function processRedemption(
        address _sender,
        uint256 _amount,
        string memory _pixKey
    ) external onlyRole(ORACLE_ROLE) {
        // Construção da requisição para o oracle Chainlink
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillRedemption.selector
        );
        
        // Codificação CBOR dos parâmetros (padrão Chainlink)
        CBORChainlink.encodeString(req.buf, "pixKey");
        CBORChainlink.encodeString(req.buf, _pixKey);
        CBORChainlink.encodeString(req.buf, "amount");
        CBORChainlink.encodeUInt(req.buf, _amount);
        CBORChainlink.encodeString(req.buf, "sender");
        CBORChainlink.encodeString(req.buf, addressToString(_sender));
        
        // Envio da requisição para a rede Chainlink
        _sendChainlinkRequest(req, fee);
        
        emit PixPaymentProcessed(_sender, _amount, _pixKey);
    }

    /**
    * @notice Callback para processar resposta do oracle Chainlink
    * @param _requestId ID da requisição Chainlink
    * @param _success Indica se o processamento foi bem sucedido
    */
    function fulfillRedemption(
        bytes32 _requestId,
        bool _success
    ) external recordChainlinkFulfillment(_requestId) {
        require(_success, "Falha no processamento PIX");
        // Lógica adicional de pós-processamento pode ser adicionada aqui
    }

    /**
    * @notice Converte endereço para string (utilizado nas requisições Chainlink)
    * @param _addr Endereço Ethereum para conversão
    * @return String representando o endereço em hexadecimal
    */
    function addressToString(address _addr) private pure returns (string memory) {
        return Strings.toHexString(uint160(_addr), 20);
    }
}
