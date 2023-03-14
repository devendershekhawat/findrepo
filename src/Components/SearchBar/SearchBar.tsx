import { CheckboxOptionType, Input, Radio, Typography } from 'antd';
import APP_CONSTANTS from '../../Constants/appConstants';
import Sort from '../../Models/Sort';

interface SearchBarProps {
    query: string;
    onQueryChange(query: string): void;
    sortBy: Sort;
    onChangeSort(sort: Sort): void;
}

const sortOptions: Array<{ label: string; value: Sort }> = [
    {label: 'Best Match', value: null},
    {label: 'Forks', value: 'forks'},
    {label: 'Stars', value: 'stars'},
    {label: 'Update date', value: 'updated'},
];

function SearchBar({
    query,
    onQueryChange,
    sortBy,
    onChangeSort,
}: SearchBarProps) {
    return (
        <div className='SearchBar'>
            <Input
                onChange={e => onQueryChange(e.target.value)}
                value={query}
                bordered={false}
                width='100%'
                autoFocus
                allowClear
                placeholder='Search for a repository (minimum 3 characters)'
                size='large'
            /> <br/>
            {query.length >= APP_CONSTANTS.MIN_CHARACTERS_TO_SEARCH && (
                <>
                    <Typography.Text>Sort By: </Typography.Text>
                    <Radio.Group
                        options={sortOptions as CheckboxOptionType[]}
                        onChange={e => onChangeSort(e.target.value)}
                        value={sortBy}
                        optionType="button"
                        buttonStyle="solid"
                    />
                    <br/><br />
                </>
            )}
        </div>
    );
}

export default SearchBar;
