interface Props {
  error: {
    name: string;
    message: string;
  };
  name: string;
}
const ShowError = ({ error, name }: Props) => {
  return (
    <div className="relative">
      {error.name == name && error.message.length !== 0 && (
        <p className="text-red-500 absolute text-[11px]">{error.message}</p>
      )}
    </div>
  );
};

export default ShowError;
