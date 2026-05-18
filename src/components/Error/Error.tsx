import { FallbackProps } from 'react-error-boundary';

function Error({ error }: FallbackProps) {
  return (
    <>
      <div>Error!</div>
      <div>{error.message}</div>
    </>
  );
}

export default Error;
