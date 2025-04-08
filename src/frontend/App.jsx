import React from 'react';
import AuthComponent from './components/AuthComponent';
import QRCodeComponent from './components/QRCodeComponent';
import TokenBalance from './components/TokenBalance';
import TransactionHistory from './components/TransactionHistory';
import './styles/main.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>NRISIMHADEVA Protocolo</h1>
      </header>
      <main>
        <section className="auth-section">
          <h2>Autenticação</h2>
          <p>Realize sua autenticação via Auth0 ou Wallet para acessar o sistema.</p>
          <AuthComponent />
        </section>
        <section className="payment-section">
          <h2>Compra de Tokens</h2>
          <p>
            Após a autenticação, gere o QR Code PIX para efetuar o pagamento e adquirir tokens
            digitais.
          </p>
          <QRCodeComponent />
        </section>
        <section className="balance-section">
          <h2>Saldo de Tokens</h2>
          <TokenBalance />
        </section>
        <section className="transactions-section">
          <h2>Histórico de Transações</h2>
          <TransactionHistory />
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} NRISIMHADEVA. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
