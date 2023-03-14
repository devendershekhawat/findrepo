import { Typography, Tag } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import Repository from '../../Models/Repository';

interface RepoCardProps {
    repository: Repository
}

function RepoCard({ repository }: RepoCardProps) {
    return (
        <>
            <div>
                <a href={repository.url} target='_blank' rel="noreferrer">{repository.fullName}</a>
                <Typography.Paragraph>{repository.description}</Typography.Paragraph>
                <Typography.Text code>Topics:</Typography.Text> {repository.topics.map((topic) => (
                    <a key={topic} href={`https://github.com/topics/${topic}`} target="_blank" rel="noreferrer">
                        <Tag key={topic}>{topic}</Tag>
                    </a>
                ))} <br />
                <Typography.Text code>Language:</Typography.Text> <Tag color='gold'>{repository.language}</Tag><br/>
            </div>
            <div>
                <a href={repository.stargazersUrl} target='_blank' rel="noreferrer">
                    <StarTwoTone /> {repository.stargazersCount}
                </a> <br />
                <Typography.Text code>Last Updated: {repository.pushedAt.toLocaleDateString()}</Typography.Text>
            </div>
        </>
    );
}

export default RepoCard;
