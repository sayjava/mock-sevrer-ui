export default ({ title, children }) => {
  return (
    <div className="flex w-full items-start border-b">
      <div className="w-2/6">
        <div className="w-full p-2">{title}</div>
      </div>
      <div className="w-4/6 border-l">
        <div className="w-full">
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};
