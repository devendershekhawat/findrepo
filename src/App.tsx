import { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import './App.scss';
import RepoList from './Components/RepoList/RepoList';
import SearchBar from './Components/SearchBar/SearchBar';
import useRepoSearch from './Hooks/useRepoSearch';
import API_CONSTANTS from './Constants/apiConstants';
import useThrottle from './Hooks/useThrottle';

function App() {
    const [query, setQuery] = useState<string>('');
    const [pageSize, setPageSize] = useState(API_CONSTANTS.RESULTS_PER_PAGE);

    const throttledQuery = useThrottle(query, 1500);
    const { loading, repositories, total, changePage} = useRepoSearch(throttledQuery, pageSize);


    useEffect(() => {
        changePage(1);
    }, [throttledQuery]);


    return (
        <div className="App">
            <h1>findRepo.</h1>
            <SearchBar
                query={query}
                onQueryChange={setQuery}
            />
            <RepoList
                loading={loading}
                repositories={repositories}
            />
            <br />
            {
                total > pageSize && (
                    <Pagination
                        total={total}
                        pageSize={pageSize}
                        onChange={(page, pageSize) => {
                            console.log(pageSize);
                            changePage(page);
                            setPageSize(pageSize);
                        }}
                    />
                ) 
            }
        </div>
    );
}

export default App;
