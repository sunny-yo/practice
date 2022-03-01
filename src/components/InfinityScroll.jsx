import React, { useEffect, useRef } from 'react';
import Spinner from '../elements/Spinner';

const InfinityScroll = props => {
  const { children, callNext, is_next, loading } = props;
  const targetRef = useRef();

  useEffect(() => {
    if (loading || !is_next) return;
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        callNext();
      }
    });
    observer.observe(targetRef.current);

    return () => observer.unobserve(targetRef.current);
  }, [loading]);

  return (
    <>
      {children}
      <div ref={targetRef}>{is_next && <Spinner />}</div>
    </>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
