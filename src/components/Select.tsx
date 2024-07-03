import React from "react";
import ReactSelect from "react-select";
type Props = {
	disabled: boolean;
	label: string;
	value?: Record<string, any>;

	options: Record<string, any>[];
	onChange: (value: Record<string, any>) => void;
};

const Select = ({ label, disabled, value, options, onChange }: Props) => {
	return (
		<>
			<div className="">
				<label className="block text-base font-normal leading-6 text-gray-800">
					{label}
				</label>
				<div>
					<ReactSelect
						isDisabled={disabled}
						value={value}
						onChange={onChange}
						isMulti
						options={options}
            menuPortalTarget={document.body} 
            styles={{menuPortal:(base)=>({
              ...base,
              zIndex:9999
            }),
          }}
          className="text-sm"
					/>
				</div>
			</div>
		</>
	);
};

export default Select;
