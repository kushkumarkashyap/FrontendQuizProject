import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getName, playQuiz } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Selecting the displayed and reated quizzes to be played //

const QuizTitle = ({ title, id }) => {
  const selectedQuiz = useRef();

  const dispatch = useDispatch();

  const handelSelected = () => {
    const selected = selectedQuiz.current.checked;

    //  if there is no quiz selected then do nothng //

    if (!selected) {
      return;
    }

    // dispatching and choosing the quiz to be played //

    dispatch(playQuiz(id));
  };

  return (
    <div className="created-quiz-container d-flex">
      <input
        type="radio"
        name=""
        id=""
        ref={selectedQuiz}
        onClick={handelSelected}
      />
      <p>{title}</p>
    </div>
  );
};

// This is all the logic of Playing quiz page //

export const PlayQuiz = () => {
  const name = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state) => state.reducer.quiz);

  // this handler will handle and route us to play the quiz which has been selected //

  const getNameHandler = () => {
    // if there id no name entered then do nothing except an alert //

    if (name.current.value === "") {
      alert("Please enter a name!");
      return;
    }

    // if there exist a quiz choose the selected one and let us play that quiz with the name entered and route to the play page //

    if (quiz.length > 0) {
      dispatch(getName(name.current.value));
      navigate("/quiz");
    }
  };

  //  if there is no quiz then this empty message will be displayed //

  const emptyMsg = (
    <p style={{ color: "red" }}>
      There are Currently No Quiz! Please make some new quizzes!
    </p>
  );

  return (
    <motion.div
      className="play-quiz-container"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="play-quiz-main">
        <div className="play-quiz-heading">
          <h1>Title of the Quiz</h1>
        </div>

        <div className="quiz-description">
          Welcome to Almabetter Quiz website, the enchanting universe where learning transforms into a captivating adventure, challenging your intellect, tickling your curiosity, and rewarding your quest for knowledge.
          Almabetter Quiz website is not just a website ;it's an immersive experience that redefines the way you explore, learn, and have fun.
          At Almabetter Quiz website, we believe that knowledge is the key to empowerment.
          Our platform is your gateway to an infinite world of quizzes spanning a diverse range of topics.
          From history and science to pop culture, sports, and general trivia, there's something for everyone. Whether you're a novice, a casual learner, or a seasoned trivia champion,
           Almabetter Quiz website caters to all levels of expertise.
           The Quest for Knowledge and Rewards:
          What sets Almabetter Quiz website apart is the opportunity to turn your pursuit of knowledge into a thrilling adventure. 
          As you delve into our quizzes, you'll not only enrich your understanding of the world but also have a chance to win amazing prizes. Yes, learning can be both enjoyable and rewarding!
          Our commitment is to make learning fun, interactive, and exciting. We believe in challenging your limits, expanding your horizons, and igniting your curiosity.
           Whether you're here to master a particular subject or simply enjoy some leisurely brain exercise, Almabetter Quiz website has you covered.
          The Adventure Begins Here:
          Are you ready to become the Almabetter Quiz website? Your journey starts now. Master every quiz, unlock your inner genius, and revel in the endless excitement of knowledge exploration. 
          Experience the thrill, the joy, and the satisfaction of being a part of the Almabetter Quiz website family. Together, we'll rewrite the story of learning.
         Welcome to Almabetter Quiz website – your portal to a world of knowledge, challenge, and fun! Join us today and embark on an extraordinary voyage of discovery.

        </div>

        <div className="input-name">
          <div className="quiz-name">
            <label>Enter Your Name</label>
            <input type="text" ref={name} className="name-input-text" />
          </div>
          <div className="created-quiz">
            {quiz.length === 0
              ? emptyMsg
              : quiz
                .filter((el) => el.isActive === true)
                .map((el) => (
                  <QuizTitle title={el.title} key={el.id} id={el.id} />
                ))}
          </div>
        </div>

        <div className="submti-name-btn">
          <button style={{ margin: 0 }} onClick={getNameHandler}>
            Start Quiz
          </button>
        </div>
      </div>
    </motion.div>
  );
};
