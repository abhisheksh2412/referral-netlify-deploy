import Select, { createFilter } from "react-select";

export default function EasySelect({ options, handleChange, ...args }) {
  return (
    <Select
      {...args}
     
      options={options}
      filterOption={createFilter({ ignoreAccents: true })}
      onChange={handleChange}
    />
  );
}
