import "./App.css"
import { TwitterFollowcard } from "./TwitterFollowcard"

const users = [
    {
        userName:"kikobeats",
        name: "Kiko Beats",
        isFollowing: true
    },
    {
        userName:"elonmusk",
        name: "Elon Musk",
        isFollowing: false
    },
    {
        userName:"midudev",
        name: "Midu DEV",
        isFollowing: true
    }
]

export function App () {
    return (
        <section className='App'>
          {
            users.map(({ userName, name, isFollowing }) => (
              <TwitterFollowcard
                key={userName}
                userName={userName}
                initialIsFollowing={isFollowing}
              >
                {name}
              </TwitterFollowcard>
            ))
          }
        </section>
      )
}