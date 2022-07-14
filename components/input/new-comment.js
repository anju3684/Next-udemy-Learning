import { useRef, useState } from 'react';
import classes from './new-comment.module.css';
import Button from '../ui/button';
function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef();
  const commentInputRef = useRef();
  const nameInputRef=useRef()

  function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredComment = commentInputRef.current.value;
    const enteredName=commentInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      text: enteredComment,
      name:enteredName,
    });
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <Button style={{'backgroundColor':'white'}}>Submit</Button>
    </form>
  );
}

export default NewComment;