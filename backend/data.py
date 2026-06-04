import sqlite3

conn = sqlite3.connect("seiseki.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS seiseki_statement(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    math INTEGER NOT NULL,
    japanese INTEGER NOT NULL,
    science INTEGER NOT NULL,
    social_study INTEGER NOT NULL,
    english INTEGER NOT NULL
    
    )
""")

cursor.execute("""
INSERT INTO seiseki_statement(name,math,japanese,science,social_study,english)
VALUES(?,?,?,?,?,?)
""",("Yamada",98,85,88,92,95))

cursor.execute("""
INSERT INTO seiseki_statement(name,math,japanese,science,social_study,english)
VALUES(?,?,?,?,?,?)
""",("Tanaka",70,67,82,55,78))

cursor.execute("""
INSERT INTO seiseki_statement(name,math,japanese,science,social_study,english)
VALUES(?,?,?,?,?,?)
""",("Suzuki",31,22,18,33,96))

conn.commit()
conn.close()