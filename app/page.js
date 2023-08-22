"use client"
import data from "./data/data.json"
import { useState } from "react"
import { Rating } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { adjetivoValor } from "./data/adjVal"

export default function Home() {
  const [questions, setQuestions] = useState(data.preguntas)
  const [index, setIndex] = useState(1)

  const handleChange = (newValue, question) => {
    //Actualiza la valoración de la pregunta y pasa al siguiente index
    setQuestions((prev) =>
      prev.map((item) =>
        item.id === question.id ? { ...item, valoracion: newValue } : { ...item }
      )
    )
    setIndex((prev) => prev + 1)
  }

  return (
    <main>
      {questions.map((question) => {
        return question.id === index ? (
          <div className="questions-container">
            <article key={question.id} className="question">
              {question.texto}
              <Rating
                size="large"
                name="simple-controlled"
                value={question.valoracion}
                onChange={(event, newValue) => handleChange(newValue, question)}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.35, color: "whitesmoke" }} fontSize="inherit" />
                }
              />
            </article>
          </div>
        ) : null
      })}

      {index > questions.length && (
        <section className="summary">
          <h2>Resumen</h2>
          {questions.map((item) => (
            <article key={item.id}>
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
