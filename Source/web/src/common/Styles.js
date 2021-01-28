export const CommonStyle = {
    select2: {
        control: provided => ({
            ...provided,
            borderColor: '#E7E7E7',
            padding: '0.5rem',
        }),
        singleValue: provided => ({
            ...provided,
            position: 'relative',
            whiteSpace: 'pre-wrap',
            transform: 'none',
            color: 'rgba(26,25,25,0.7)',
        }),
        indicatorsContainer: provided => ({
            ...provided,
            alignItems: 'flex-start',
        }),
        indicatorSeparator: () => ({}),
        dropdownIndicator: provided => ({
            ...provided,
            color: '#1A1919',
        }),
    },
};
