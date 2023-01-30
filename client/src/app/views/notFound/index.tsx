import styles from './index.module.css';

const NotFound = () => {
  return (
    <div className={styles['container']}>
      <h1 data-test-id="text-404">404</h1>
      <p>
        I'm afraid you've found a page that doesn't exist. That can happen when
        you follow a link to something that has since been deleted. Or the link
        was incorrect to begin&nbsp;with.
      </p>
      <p>
        Sorry about that. We've logged the error for review, in case it's our
        fault.
      </p>
      <ul>
        <li>
          <a href="/">Go to the homepage</a>
        </li>
        <li>
          <a href="#">Contact Support</a>
        </li>
      </ul>
    </div>
  );
};

export default NotFound;
