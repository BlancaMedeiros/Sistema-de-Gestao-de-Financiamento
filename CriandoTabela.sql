CREATE TABLE Parcelas (
	ID INT AUTO_INCREMENT PRIMARY KEY,
	MesVencimento VARCHAR(100),
	NumeroParcela INT,
	ProjecaoValor DECIMAL(10, 2),
	ValorPago DECIMAL(10, 2),
	DataPagamento DATE,
	Situacao VARCHAR (100)
);
