from flask import Flask, jsonify
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
        SUM(ProjecaoValor) as total_financiado,
        SUM(CASE WHEN Situacao = 'paga' THEN ProjecaoValor ELSE 0 END) as valor_pago,
        MIN(CASE WHEN Situacao = 'pendente' THEN MesVencimento END) as proximo_vencimento
    FROM Parcelas
    """
    
    cursor.execute(query)
    resultado = cursor.fetchone()
    
    total = float(resultado['total_financiado'] or 0)
    pago = float(resultado['valor_pago'] or 0)
    saldo_restante = total - pago
    porcentagem_paga = (pago / total * 100) if total > 0 else 0

    resumo = {
        "total": total,
        "pago": pago,
        "saldo": saldo_restante,
        "proximo_vencimento": str(resultado['proximo_vencimento']) if resultado['proximo_vencimento'] else "Nenhum",
        "porcentagem_paga": round(porcentagem_paga, 2)
    }
    
    cursor.close()
    conn.close()
    return jsonify(resumo)

if __name__ == '__main__':
    app.run(debug=True)