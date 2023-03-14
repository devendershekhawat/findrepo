import { useState, useEffect, useRef } from 'react';
import API_CONSTANTS from '../Constants/apiConstants';
import APP_CONSTANTS from '../Constants/appConstants';
import Repository from '../Models/Repository';

function useRepoSearch(query: string, pageSize: number):
{ loading: boolean; repositories: Array<Repository>; total: number; changePage: (page: number) => void;} {
    const [loading, setLoading] = useState<boolean>(false);
    const [repositories, setRepositories] = useState<Array<Repository>>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        async function getResults() {
            if (query.length < APP_CONSTANTS.MIN_CHARACTERS_TO_SEARCH) {
                setRepositories([]);
                setTotal(0);
                return;
            }
            try {
                setLoading(true);
                setRepositories([]);
                const queryString = new URLSearchParams({
                    q: query,
                    per_page: pageSize.toString(),
                    page: page.toString(),
                });
                const response = await fetch(
                    `${API_CONSTANTS.REPO_SEARCH_BASE_URL}?${queryString}`,
                );
                if (response.status === 403) {
                    window.alert('Only 10 requests are allowed per minute for unauthenticated use of github API. Please wait for a while');
                    return;
                }
                const result = await response.json();
                setTotal(result.total_count);
                setRepositories(transformRepositories(result.items));
            } catch (error) {
                window.alert('error in searching repositories');
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getResults();
    }, [query, page, pageSize]);

    return {
        loading,
        repositories,
        total,
        changePage: setPage,
    };
}

export default useRepoSearch;

function transformRepositories(raw: Array<any>): Array<Repository> {
    const repositories: Array<Repository> = [];
    raw && raw.forEach((data: any) => repositories.push({
        fullName: data.full_name,
        description: data.description,
        language: data.language,
        topics: data.topics,
        stargazersCount: data.stargazers_count,
        stargazersUrl: data.stargazers_url,
        pushedAt: new Date(data.pushed_at),
        url: data.html_url,
    }));
    return repositories;
}
