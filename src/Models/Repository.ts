type Repository = {
    fullName: string;
    url: string;
    description: string;
    language: string;
    topics: Array<string>;
    stargazersCount: number;
    stargazersUrl: string;
    pushedAt: Date;
}

export default Repository;
