interface ErrorMessageType {
  message: string;
}

function Error({ message }: ErrorMessageType) {
  return (
    <>
      <div>Error!</div>
      <div>{message}</div>
    </>
  );
}

export default Error;
