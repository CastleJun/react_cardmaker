import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';
const Maker = ({ authService }) => {
  const [cards, setCards] = useState({
    // key 는 카드의 아이디이고 이 자체가 card 의 오브젝트가 될 아이임
    1: {
      id: '1',
      name: 'SJ',
      company: 'wisewedding',
      theme: 'dark',
      title: 'Frontend-developer',
      email: 'hsj9360@gmail.com',
      message: 'go for it',
      fileName: 'SJ',
      fileURL: null,
    },
    2: {
      id: '2',
      name: 'SJ2',
      company: 'wisewedding',
      theme: 'light',
      title: 'Frontend-developer',
      email: 'hsj9360@gmail.com',
      message: 'go for it',
      fileName: 'SJ',
      fileURL: 'SJ.png',
    },
    3: {
      id: '3',
      name: 'SJ3',
      company: 'wisewedding',
      theme: 'colorful',
      title: 'Frontend-developer',
      email: 'hsj9360@gmail.com',
      message: 'go for it',
      fileName: 'SJ',
      fileURL: null,
    },
  });

  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        history.push('/');
      }
    });
  });

  // const addCard = card => {
  //   const updated = [...cards, card];
  //   setCards(updated);
  // };

  const createOrUpdateCard = card => {
    // 콜백 함수를 전달 할 수 있음.
    // cards 를 받아서 새로운 값으로 리턴함
    //setCards 의 상태 = cards의 상태를 복사해와서 id를 이용해와서 해당하는 키의 업데이트되는 card를 변경해주고 updated를 리턴함
    setCards(cards => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = card => {
    setCards(cards => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
  };
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
