import React, { Component } from 'react';
import Link from 'next/link';

const withLayout = Page => {
  class WithContainer extends Component {
    render() {
      return (
        <div className={'Site'}>
          <div
            style={{
              position: 'sticky',
              top: ' 0px',
              width: '100%',
              display: 'block',
              height: '40px',
              backgroundColor: 'white'
            }}
          >
            <Link href="/">
              <button>D3 & Twitter</button>
            </Link>
            <Link href="/react-rendered">
              <button>React Map</button>
            </Link>
            <a
              href={
                '/graphql?query=%7B%0A%20%20officials%28address%3A%20%22Georgia%2C%20USA%22%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20party%0A%20%20%20%20photoUrl%0A%20%20%20%20address%20%7B%0A%20%20%20%20%20%20city%0A%20%20%20%20%20%20state%0A%20%20%20%20%7D%0A%20%20%20%20channels%20%7B%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%20%20tweets%28limit%3A3%29%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A'
              }
            >
              <img className="spinLogo" src="/static/GraphQL_Logo.png" />
            </a>
          </div>
          <Page />
          <style jsx global>{`
            body {
              font-family: Helvetica Neue, Helvetica, Arial, Utkal, sans-serif;
            }
            .spinLogo {
              animation-name: spin;
              animation-duration: 5000ms;
              animation-iteration-count: infinite;
              animation-timing-function: linear;
              position: fixed;
              top: 10px;
              right: 10px;
            }
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      );
    }
  }
  return WithContainer;
};
export default withLayout;
