import { ReactComponentElement } from 'react';

import './form.css';

const Form = (props: {
  children: ReactComponentElement<any> | ReactComponentElement<any>[];
  title: string;
}) => {
  return (
    <form className='form' action=''>
      <header>
        <h2>{props.title}</h2>
      </header>
      {props.children}
    </form>
  );
};

export default Form;
