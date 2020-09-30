try:
    from googlesearch import search
except ImportError:
    print("No module named 'google' found")
import mysql.connector
from mysql.connector import Error

games = {}

try:
    connection = mysql.connector.connect(host='127.0.0.1',
                                         database='n00bs',
                                         user='root',
                                         password='')
    sql_select_Query = "select * from games"
    cursor = connection.cursor()
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    print("Number of games: ", cursor.rowcount)

    print("\nFor each game now:")
    # row[0] = id, row[1] = name
    for row in records:
        games[row[0]] = row[1]

    # searching
    for id in games:
        query = "Buy " + games[id] + "digital copy"
        links = []
        domains = []
        for url in search(query, tld="co.in", num=8, stop=8, pause=2):
            domain = url.split("//")[-1].split("/")[0]
            if domain not in domains:
                domains.append(domain)
                links.append(url)
            if len(links) == 3:
                break

        for i in range(0, len(links)):
            try:
                sql_insert_Query = "insert into store_links (id_game, domain_name, link) values (%s, %s, %s)"
                val = (id, domains[i], links[i])
                cursor2 = connection.cursor()
                cursor2.execute(sql_insert_Query, val)
                print("a intrat ", games[id])
            except Error as e:
                print("Error writing to MySQL table", e)
except Error as e:
    print("Error reading data from MySQL table", e)
finally:
    if (connection.is_connected()):
        connection.commit()
        connection.close()
        cursor2.close()
        cursor.close()
        print("MySQL connection is closed")

