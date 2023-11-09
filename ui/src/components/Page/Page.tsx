import { ReactComponentElement } from 'react';

import './page.css';

const Page = (props: {
  children: ReactComponentElement<any> | ReactComponentElement<any>[];
}) => {
  return <div className='page'>{props.children}</div>;
};

export default Page;
