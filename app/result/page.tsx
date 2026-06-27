"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type Student = {
  id: number;
  name: string;
  math: number;
  japanese: number;
  science: number;
  social_study: number;
  english: number;
};

export default function ResultPage() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const value = searchParams.get("value");

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!type || !value) {
      setLoading(false);
      return;
    }

    const getStudents = async () => {
      try {
        const response = await axios.post("http://localhost:8000/search", {
          type,
          value,
        });

        if (response.data.message === "not found") {
          setStudents([]);
        } else {
          setStudents([response.data]);
        }
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, [type, value]);

  if (!type || !value) {
    return <p>検索条件が指定されていません。</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">検索結果</h1>

      {students.length === 0 ? (
        <p>該当する学生が見つかりませんでした。</p>
      ) : (
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">名前</th>
              <th className="border border-gray-400 px-4 py-2">数学</th>
              <th className="border border-gray-400 px-4 py-2">国語</th>
              <th className="border border-gray-400 px-4 py-2">理科</th>
              <th className="border border-gray-400 px-4 py-2">社会</th>
              <th className="border border-gray-400 px-4 py-2">英語</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-400 px-4 py-2">{student.id}</td>
                <td className="border border-gray-400 px-4 py-2">{student.name}</td>
                <td className="border border-gray-400 px-4 py-2">{student.math}</td>
                <td className="border border-gray-400 px-4 py-2">{student.japanese}</td>
                <td className="border border-gray-400 px-4 py-2">{student.science}</td>
                <td className="border border-gray-400 px-4 py-2">{student.social_study}</td>
                <td className="border border-gray-400 px-4 py-2">{student.english}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}