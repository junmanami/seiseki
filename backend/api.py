from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

class Item(BaseModel):
    type: str
    value: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/search")
def select(item: Item):

    with sqlite3.connect("seiseki.db") as conn:

        # ID検索
        if item.type == "id":
            sql = """
            SELECT id, name, math, japanese, science, social_study, english
            FROM seiseki_statement
            WHERE id = ?
            """
            row = conn.execute(sql, (int(item.value),)).fetchone()

        # 名前検索
        elif item.type == "name":
            sql = """
            SELECT id, name, math, japanese, science, social_study, english
            FROM seiseki_statement
            WHERE name = ?
            """
            row = conn.execute(sql, (item.value,)).fetchone()

        else:
            return JSONResponse(
                status_code=400,
                content={"message": "検索方法が不正です"}
            )

        if row is None:
            return JSONResponse(
                content={"message": "not found"}
            )

        student = {
            "id": row[0],
            "name": row[1],
            "math": row[2],
            "japanese": row[3],
            "science": row[4],
            "social_study": row[5],
            "english": row[6]
        }

    return JSONResponse(content=student)