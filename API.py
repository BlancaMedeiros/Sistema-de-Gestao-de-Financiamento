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

if __name__ == '__main__':
    app.run(debug=True)