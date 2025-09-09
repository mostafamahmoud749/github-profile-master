export default function Repos(props){
    const updatedDate = new Date(props.updated_at)
    const now = new Date();
    const days = Math.floor((now - updatedDate) / (1000 * 60 * 60 * 24))
    return(
        <a href={`${props.html_url}`} target="_blank" >
            <div className="repo-box">
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <div className="repo-data">
                <div className="card">
                    <span><img src="/public/resources/Nesting.svg"/></span>
                    <span>{props.forks}</span>
                </div>
                <div className="card">
                    <span><img src="/public/resources/Star.svg"/></span>
                    <span>{props.stargazers_count}</span>
                </div>
                <div className="last-update">{`updated ${days} ${days>1?"days":"day"} ago`}</div>
            </div>
        </div>
        </a>
    )
}