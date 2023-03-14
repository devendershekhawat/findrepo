import { Input } from 'antd';

interface SearchBarProps {
    query: string;
    onQueryChange(query: string): void;
}

function SearchBar({
    query,
    onQueryChange,
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
            />
        </div>
    );
}

export default SearchBar;
