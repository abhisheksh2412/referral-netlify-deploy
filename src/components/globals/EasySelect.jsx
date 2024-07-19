import Select from "react-select";

export default function EasySelect({ options, handleChange, ...args }) {
  return <Select {...args} options={options} onChange={handleChange} />;
}
