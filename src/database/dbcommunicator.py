import mysql.connector
from mysql.connector import Error
import json


try:
    connection = mysql.connector.connect(host='localhost',
                                         database='researchstudents',
                                         user='root',
                                         password='test')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor(dictionary=True)
        #cursor.execute("select database();")
        cursor.execute("SELECT studentID, firstName FROM Student")
        result=cursor.fetchall()
        jsonString = json.dumps(result)
        print(f"json: {json.dumps(jsonString)}")
        def return_json():
            return jsonString
        #for row in result:
            #print(row,'\n')

        #record = cursor.fetchone()
        #print("You're connected to database: ", record)

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")