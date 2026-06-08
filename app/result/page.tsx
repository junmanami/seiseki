'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Student = {
  id?: number;
  name?: string;
  gpa?: number;
  message?: string;
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (!id) return;

    const getStudent = async () => {
      const res = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: Number(id) })
      });

      const data = await res.json();
      setStudent(data);
    };

    getStudent();
  }, [id]);

  if (!student) return <p>Loading...</p>;
  if (student.message) return <p>{student.message}</p>;

  return (
    <div>
      <h1>検索結果</h1>
      <p>ID: {student.id}</p>
      <p>名前: {student.name}</p>
      <p>GPA: {student.gpa}</p>
    </div>
  );
}