import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("react-json-view"), {
  ssr: false,
});

export default ({ json }) => {
  const compact = {};

  Object.entries(json).forEach(([key, value]: [string, Array<any>]) => {
    compact[key] = Array.isArray(value) ? value.join(",") : value;
  });

  return (
    <div>
      <DynamicComponentWithNoSSR
        name={false}
        src={compact}
        displayObjectSize={false}
        displayDataTypes={false}
        collapsed={true}
        indentWidth={8}
      />
    </div>
  );
};
