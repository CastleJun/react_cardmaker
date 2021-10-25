import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';
const Maker = ({ FileInput, authService, cardRepository }) => {
  // firebase 에서 작동하는것들은 컴포넌트에서 하는것은 안좋으니.. 다른 곳에서 불러오기.
  const history = useHistory();
  const historyState = history?.location?.state;
  // history 스테이트는 로그인을 통해서 왔따면 값이 있을 예정.
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, cards => {
      setCards(cards);
    });
    return () => stopSync();
    //컴포넌트가 언마운트가 되었을때 함수를 호출해줌. 리소스나 메모리를 정리 해 줄수있음.
  }, [userId, cardRepository]);

  //로그인 관련 useEffect
  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  }, [authService, userId, history]);

  const createOrUpdateCard = card => {
    setCards(cards => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = card => {
    setCards(cards => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };
  // const addCard = card => {
  //   const updated = [...cards, card];
  //   setCards(updated);
  // };
  /* firebase ?? 로 작업할 예정
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
  */
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
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
