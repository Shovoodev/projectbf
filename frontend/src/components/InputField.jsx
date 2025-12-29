const InputField = ({ children, stepTitleMap }) => {
  // const { user } = useUser();

  return (
    <div className="bg-black text-white p-4 space-y-6 rounded-2xl m-20">
      <div className="text-5xl p-4">{stepTitleMap}</div>

      <div>{children}</div>

      {/* <button
        onClick={goNext}
        className="p-3 bg-white text-black rounded-md hover:bg-gray-300 font-bold"
      >
        {!user?._id ? (
          <Link to="/" className="dropdown-item">
            Proceed To Agreement
          </Link>
        ) : (
          <Link to="/registraion" className="dropdown-item">
            Proceed To Agreement
          </Link>
        )}
      </button> */}
    </div>
  );
};

export default InputField;
