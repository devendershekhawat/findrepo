import { Spin, Card, Empty, List } from 'antd';
import Repository from '../../Models/Repository';
import RepoCard from '../RepoCard/RepoCard';

interface RepoListProps {
    repositories: Repository[],
    loading: boolean
}

function RepoList({
    repositories,
    loading,
}: RepoListProps) {
    return (
        <Card>
            { loading && <Spin size='large' />}
            { !loading && repositories.length === 0 && <Empty />}
            { !loading && repositories.length > 0 && (
                <List>
                    {renderRepositories(repositories)}
                </List>
            )}
        </Card>
    );
}

function renderRepositories(repositories:Repository[]) {
    return repositories.map((repo) => (
        <List.Item key={repo.fullName}>
            <RepoCard repository={repo} />
        </List.Item>
    ));
}

export default RepoList;
