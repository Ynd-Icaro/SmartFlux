import psycopg2
import sys

try:
    conn = psycopg2.connect(
        host="aws-1-us-east-1.pooler.supabase.com",
        database="postgres",
        user="postgres.upczfxrponhrgdreucnb",
        password="root",
        port=5432
    )
    cursor = conn.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()
    print("✅ Conexão bem-sucedida!")
    print(f"Database: {db_version}")
    cursor.close()
    conn.close()
except Exception as e:
    print(f"❌ Erro de conexão: {e}")
    sys.exit(1)
