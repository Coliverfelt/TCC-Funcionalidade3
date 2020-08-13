import pymysql.cursors

SERVER_URL = "localhost"
DB = "mydb"
USER_NAME = "root"
PASSWORD = "a1b2c3d4e5"

SQL_CONNECTION = pymysql.connect(host=SERVER_URL,
                    user=USER_NAME,
                    passwd=PASSWORD,
                    db=DB,
                    charset='utf8mb4',
                    cursorclass=pymysql.cursors.DictCursor,
                    autocommit=True)

def create(turma, text, titulo, date_time, idUser):
    SQLcreate = """INSERT INTO mydb.notifications(class, text, titulo, date_time, idUser) VALUES (%s, %s, %s, %s, %s)"""

    with SQL_CONNECTION.cursor() as cursor:
        try:
            input_records = (turma, text, titulo, date_time, idUser)
            sql_exec = cursor.execute(SQLcreate, input_records)
            if sql_exec:
                print(sql_exec)
                print("Record Added")
            else:
                print(sql_exec)
                print("Not Added")
        except (pymysql.Error, pymysql.Warning) as e:
            print(f'error! {e}')
    cursor.close()

def retrieveAll():
    SQLretireveAll = """SELECT * FROM mydb.notifications"""

    with SQL_CONNECTION.cursor() as cursor:
        try:
            sql_exec = cursor.execute(SQLretireveAll)
            if sql_exec:
                print(sql_exec)
                resultado = cursor.fetchall()
                print(resultado)
                return resultado
            else:
                print(sql_exec)
                print("No Record")
        except (pymysql.Error, pymysql.Warning) as e:
            print(f'error! {e}')
    cursor.close()

def retrieve(idNotification):
    SQLretireve = """SELECT * FROM mydb.notifications WHERE idNotifications = %s"""

    with SQL_CONNECTION.cursor() as cursor:
        try:
            retrieve_records = (idNotification)
            sql_exec = cursor.execute(SQLretireve, retrieve_records)
            if sql_exec:
                print(sql_exec)
                resultado = cursor.fetchall()
                print(resultado)
                return resultado
            else:
                print(sql_exec)
                print("No Record")
        except (pymysql.Error, pymysql.Warning) as e:
            print(f'error! {e}')
    cursor.close()

def update(turma, text, titulo, date_time, idUser, idNotifications):
    SQLupdate = """UPDATE mydb.notifications 
                SET class = %s, text = %s, titulo = %s, date_time = %s, idUser = %s WHERE idNotifications = %s"""

    with SQL_CONNECTION.cursor() as cursor:
        try:
            update_records = (turma, text, titulo, date_time, idUser, idNotifications)
            sql_exec = cursor.execute(SQLupdate, update_records)
            if sql_exec:
                #SQL_CONNECTION.commit()
                print(sql_exec)
                print("Record Upadted")
            else:
                print(sql_exec)
                print("Not Upadted")
        except (pymysql.Error, pymysql.Warning) as e:
            print(f'error! {e}')
    cursor.close()

def delete(idNotification):
    SQLdelete = """DELETE FROM mydb.notifications WHERE idNotifications = %s"""

    with SQL_CONNECTION.cursor() as cursor:
        try:
            delete_records = (idNotification)
            sql_exec = cursor.execute(SQLdelete, delete_records)
            if sql_exec:
                # SQL_CONNECTION.commit()
                print(sql_exec)
                print("Record Deleted")
            else:
                print(sql_exec)
                print("Not Deleted")
        except (pymysql.Error, pymysql.Warning) as e:
            print(f'error! {e}')
    cursor.close()