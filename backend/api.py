from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

class Item(BaseModel):
    id:int

app = FastAPI()

app.add_middleware( #CORSの設定(異なるオリジン(場所)からのアクセスを許可)これがないとセキュリティが危ないし、検索できない
    CORSMiddleware,
    allow_origins=[ #許可するオリジン(Reactの開発環境など)
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=False, #認識情報を含めるかどうか(今回は含めない)
    allow_methods=["*"], #全てのHTTPメソッドの許可　*だと全部許可できるから開発がスムーズにできる
    allow_headers=["*"], #全てのHTTPヘッダーの許可
)

@app.post("/search")
def select(item:Item):
    print("ID:",item.id)
    with sqlite3.connect("seiseki.db") as conn:
        sql="SELECT id, name,math,japanese,science,social_study,english FROM seiseki_statement WHERE id=?"
        data=(item.id,)
        row=conn.execute(sql,data).fetchone()
        
        if row is None:
            return JSONResponse(
                content={"message": "not found"}
            )

        dic={
                "id":row[0],
                "name":row[1],
                "math":row[2],
                "japanese":row[3],
                "science":row[4],
                "social_study":row[5],
                "english":row[6]
            }

    return JSONResponse(content=dic)
