from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_name = os.getenv("DB_NAME")

app = Flask(__name__)
CORS(app) 

def get_db_connection():
    return mysql.connector.connect(
        host= db_host,
        user= db_user,
        password= db_password, 
        database= db_name   
    )

@app.route('/parcelas', methods=['GET'])
def listar_Parcelas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    
    cursor.execute("SELECT * FROM Parcelas")
    parcelas = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(parcelas) 


@app.route('/resumo', methods=['GET'])
def obter_resumo():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    
    query = """
        SELECT 
            SUM(COALESCE(ValorPago, ProjecaoValor)) as total_financiado,
            SUM(CASE WHEN Situacao IN ('paga', 'amortizado') THEN ValorPago ELSE 0 END) as valor_pago,
            (
                SELECT MesVencimento 
                FROM Parcelas 
                WHERE Situacao = 'pendente' 
                ORDER BY NumeroParcela ASC 
                LIMIT 1
            ) as proximo_vencimento,
            (SELECT 
                COALESCE(
                    (SELECT ValorPago FROM Parcelas WHERE Situacao = 'paga' ORDER BY NumeroParcela DESC LIMIT 1), 
                    0
                ) * (SELECT COUNT(*) FROM Parcelas WHERE Situacao = 'pendente') 
                AS saldo_devedor
            ) as saldo_devedor,
            (SELECT COUNT(*) FROM Parcelas WHERE Situacao = 'pendente') as qtd_parcelas_pendentes,
            (SELECT COUNT(*) FROM Parcelas WHERE Situacao in ('paga', 'amortizado')) as qtd_parcelas_pagas,
            (SELECT COUNT(*) FROM Parcelas ) as qtd_parcelas
        FROM Parcelas
    """
    
    cursor.execute(query)
    resultado = cursor.fetchone()
    
    total = float(resultado['total_financiado'] or 0)
    pago = float(resultado['valor_pago'] or 0)
    saldo_restante = total - pago

    porcentagem_paga = float(resultado['qtd_parcelas_pagas'] or 0) / float(resultado['qtd_parcelas'] or 0) * 100

    resumo = {
        "total": total,
        "pago": pago,
        "saldo": saldo_restante,
        "proximo_vencimento": str(resultado['proximo_vencimento']) if resultado['proximo_vencimento'] else "Nenhum",
        "porcentagem_paga": round(porcentagem_paga, 2),
        "saldo_devedor": float(resultado['saldo_devedor']),
        "qtd_parcelas_pendentes": resultado['qtd_parcelas_pendentes'],
        "qtd_parcelas_pagas": resultado['qtd_parcelas_pagas'],
        "qtd_parcelas": resultado['qtd_parcelas']
    }
    
    cursor.close()
    conn.close()
    return jsonify(resumo)


@app.route('/atualizar-parcela/<int:id>', methods=['PUT'])
def atualizar_parcela(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 

    dados = request.json
    # Lógica para atualizar no banco:
    cursor.execute("UPDATE parcelas SET ValorPago=%s, DataPagamento=%s, Situacao=%s WHERE ID=%s", (dados['valorPago'], dados['dataPagamento'], dados['situacao'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Parcela atualizada com sucesso!"}), 200

if __name__ == '__main__':
    app.run(debug=True)

