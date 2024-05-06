import Axios from "axios"
import { useEffect, useState } from "react"

const API_KEY = "" //removed api key

const App = () => {
  const [term, setTerm] = useState("")
  const [results, setResults] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [sortCol, setSortCol] = useState("Year")
  const [sortAsc, setSortAsc] = useState(false)

  useEffect(() => {
    if(term) {
      Axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${term}`)
        .then((res) => {
          if(res.data.Search) {
            setResults(sort(res.data.Search))
            setNotFound(false)
          } else {
            setResults([])
            setNotFound(true)
          }
        })
    }
  }, [term])

  useEffect(() => {
    setResults(sort(results))
  }, [sortCol, sortAsc])

  const sort = (results) => {
    return results.sort((a, b) => {
      if(!sortCol) {
        return 0
      }

      return (sortAsc ? 1 : -1) * a[sortCol].localeCompare(b[sortCol])
    })
  }

  const onChange = (e) => {
    setTerm(e.target.value)
  }

  const sortBy = (col) => () => {
    if(sortCol == col) {
      setSortAsc(!sortAsc)
    } else {
      setSortCol(col)
    }
  }

  return (
    <div>
      <input type="text" onChange={onChange}/>
      <button>Search</button>
      {notFound && <p>Movie Not Found</p>}
      <table>
        <tr>
          <th onClick={sortBy("Title")}>Title</th>
          <th onClick={sortBy("Year")}>Year</th>
          <th onClick={sortBy("Type")}>Type</th>
          <th>IMDB ID</th>
          <th>Poster</th>
        </tr>
        {results.map((result) => {
          return (
            <tr>
              <td>{result?.Title}</td>
              <td>{result?.Year}</td>
              <td>{result?.Type}</td>
              <td>{result?.imdbID}</td>
              <td><img src={result?.Poster} /></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default App
