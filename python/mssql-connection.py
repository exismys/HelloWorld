import pymssql

host = ""
port = ""
user = ""
password = ""
dbName = ""

conn = pymssql.connect(server=host, port=port, user=user, password=password, database=dbName)

cursor = conn.cursor()
cursor.execute("SELECT * FROM  <table_name>")
data = cursor.fetchall()
print(data)
