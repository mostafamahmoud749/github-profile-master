import {useState,useEffect} from "react"
import Repos from "./Repos"
export default function App() {
  const [userName,setUserName]=useState("GitHub")
  const [data,setData]=useState([])
  const [reposData,setReposData]=useState([])
  const [hide,setHide]=useState(true)

  let repos=reposData.map((repo,index)=>{
      return(
        (index>3 && hide)?null:<Repos
          key={repo.id}
          name={repo.name}
          description={repo.description}
          updated_at={repo.updated_at}
          stargazers_count={repo.stargazers_count}
          forks={repo.forks}
          html_url={repo.html_url}
        />
      )
  })

  useEffect(()=>{
  fetch(`https://api.github.com/users/${userName}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data)
    })
    .catch((error) => {
      console.log(error)
    })

  fetch(`https://api.github.com/users/${userName}/repos`)
  .then(r => r.json())
  .then(repos => setReposData(repos));
  },[])

  return (
    <>
      <header>
        <div className="container">
          <div className="input-wraper">
            <form onSubmit={(e)=>{
              e.preventDefault()
              fetch(`https://api.github.com/users/${userName}`)
                .then((response) => response.json())
                .then((data) => {
                  setData(data)
                })
                fetch(`https://api.github.com/users/${userName}/repos`)
                  .then(r => r.json())
                  .then(repos => setReposData(repos));
              setUserName("")
            }}>
              <input onChange={e=>setUserName(e.target.value)} type="text" value={userName} placeholder="Enter user name"/>
            </form>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="data">
            <img className="logo" src={data.avatar_url} alt="" />
            <div className="box"><span className="key">Followers</span><span className="value">{data.followers}</span></div>
            <div className="box"><span className="key">Following</span><span className="value">{data.following}</span></div>
            <div className="box"><span className="key">Location</span><span className="value">{data.location || "unknown"}</span></div>
          </div>
          <div className="name">{data.name}</div>
          <p className="bio">{data.bio}</p>
          <div className="rep-boxs">
            {repos}
          </div>
          {repos.length>3?<div className="show" onClick={()=>setHide(prev=>!prev)}>{hide?"View all repositories":"shrink repositories"}</div>:null}
        </div>
      </main>
    </>
  )
}