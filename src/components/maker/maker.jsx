import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";
const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "SJ",
      company: "wisewedding",
      theme: "dark",
      title: "Frontend-developer",
      email: "hsj9360@gmail.com",
      message: "go for it",
      fileName: "SJ",
      fileURL: null,
    },
    {
      id: "2",
      name: "SJ2",
      company: "wisewedding",
      theme: "light",
      title: "Frontend-developer",
      email: "hsj9360@gmail.com",
      message: "go for it",
      fileName: "SJ",
      fileURL: "SJ.png",
    },
    {
      id: "3",
      name: "SJ3",
      company: "wisewedding",
      theme: "colorful",
      title: "Frontend-developer",
      email: "hsj9360@gmail.com",
      message: "go for it",
      fileName: "SJ",
      fileURL: null,
    },
  ]);
  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/");
      }
    });
  });
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
