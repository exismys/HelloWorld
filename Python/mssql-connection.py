import pymssql

conn = pymssql.connect(server="ip", port="1433", user="ritesh.patel", password="password", database="db")

cursor = conn.cursor()
cursor.execute("SELECT * FROM  <table_name>")
data=cursor.fetchall()
print(data)