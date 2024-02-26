interface GenericFilterProps {
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
  }
  
  const GenericFilter = ({ options, value, onChange }: GenericFilterProps) => {
    return (
      <select
        className='form-select width100'
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value=''>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  
  export default GenericFilter;
  