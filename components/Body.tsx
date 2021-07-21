import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("react-json-view"), {
  ssr: false,
});

export default ({ body, name }) => {
  if (typeof body === "string") {
    return <div>{body}</div>;
  }

  return (
    <div>
      <DynamicComponentWithNoSSR
        name={false}
        src={body}
        displayObjectSize={false}
        displayDataTypes={false}
        collapsed={true}
      />
    </div>
  );
};
