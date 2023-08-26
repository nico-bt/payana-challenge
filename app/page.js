"use client"
import data from "./data/data.json"
import { useState } from "react"
import { Rating } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { adjetivoValor } from "./data/adjVal"

export default function Home() {
  const [questions, setQuestions] = useState(data.preguntas)
  const [index, setIndex] = useState(0)

  const handleChange = (newValue, id) => {
    //Actualiza la valoración de la pregunta y pasa al siguiente index
    setQuestions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, valoracion: newValue } : { ...item }))
    )
    setIndex((prev) => prev + 1)
  }

  return (
    <main>
      {questions[index] && (
        <div className="questions-container">
          <article className="question">
            {questions[index].texto}
            <Rating
              size="large"
              name="simple-controlled"
              value={questions[index].valoracion}
              onChange={(event, newValue) => handleChange(newValue, questions[index].id)}
              emptyIcon={
                <StarIcon style={{ opacity: 0.35, color: "whitesmoke" }} fontSize="inherit" />
              }
            />
          </article>
        </div>
      )}

      {index >= questions.length && (
        <section className="summary">
          <h2>Resumen</h2>
          {questions.map((item) => (
            <article key={item.id + "summary"}>
              <h3>{item.texto}</h3>
              <div className="summary-stars-desc">
                <Rating value={item.valoracion} readOnly />
                <span>{adjetivoValor[item.valoracion]}</span>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}
