import React from 'react'
import {gql, useQuery} from '@apollo/client'
import styled from 'styled-components'
import { nanoid } from 'nanoid'

const GET_COUNTRIES = gql`
    query{
        countries {
          name
          emoji
          capital
          phone
          languages{
              name
              native
          }
          continent{
            name
          }
          states{
              name
          }
        }
      }

`;

export default function Queries(){
    const {error, loading, data} = useQuery(GET_COUNTRIES)

    const [countries, setCountries] = React.useState([])

    const [keyword, setKeyword] = React.useState("")

    const [queriedElements, setQueriedElements] = React.useState([])


    
    
    const countryElements =  queriedElements.length ? queriedElements.map(element => {
        return <div className='country__container' key = {element.name}>
                    <Name> {element.emoji} {element.name}</Name>
                    
                    <div className= {element.isShown ? "detail":"details"}>
                        <div className='marginTop'>Continent: {element.continent.name}</div>

                        <div className='marginTop'>Capital: {element.capital}</div>
                        <div className='marginTop'>Phone: {element.phone}</div>
                        
                    </div>
                    <button onClick ={()=>handleDetails(element.id)}>
                        {element.isShown ? "Hide Details": "Show Details"}
                    </button>
                </div>
    }): []

    React.useEffect(()=>{
        if(data){
            setCountries(data.countries)
        }
        
    }, [data])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setKeyword(event.target.value)
    }

    function handleDetails(id:string){
        
        setQueriedElements(prevState=>{
           const newState = prevState.map(query => {
               return query.id === id ? {...query, isShown: !query.isShown}: query
           })
           return newState
        })
    }

    function handleSubmit(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault()
        const queriedString = keyword.toLowerCase()
        const queries = []
        for(let i = 0; i < countries.length; i++){
           
            const countryCheck = countries[i].name.toLowerCase()
            if(countryCheck.includes(queriedString)){
                queries.push({...countries[i], isShown:false, id:nanoid()})
                console.log(queries)
            }
        }
        setQueriedElements(queries)
        console.log(queries)
    }


    return(
        
                <Container>
                    <Form>
                        <h2>Keyword</h2>
                        <div className='form__elements'>
                            <input type = 'text' onChange = {handleChange} value ={keyword}/>
                            <button onClick={handleSubmit} >SEARCH</button>
                        </div>
                    </Form>
                    <hr/>
                    <MainSection>
                        {countryElements}
                    </MainSection>
                </Container>
    )

}

const Container = styled.div`
    
`
const Form = styled.form`
    padding: 20px 50px;

    div.form__elements{
        display: flex;
        justify-content: space-between;
    }
    input{
        width: 325px;
        padding: 10px;
        
        background: #111827;
        border: none;
        color: #ffffff
    }
    
    input:focus{
        outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    button{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 9px 17px 9px 15px;
        width: 100px;
        background: #10B981;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 6px;
        border: none;
        cursor: pointer;
        color: #FFFFFF;
       
    }
`
const MainSection = styled.main`
    padding: 20px 50px;


    .marginTop{
        margin-block: 10px;
    }
    button{
        background: #273549;
        border-radius: 6px;
        padding: 5px 20px;
        font-family: 'Inter';
        font-weight: 500;
        font-size: 16px;
        line-height: 32px;
        color: #55F991;
        cursor: pointer;
        display: block;
        text-align: center;
        border: none;
        font-style: italic;
        margin-top: 20px;
        
    }
    .details{
        display: none;
    }
`

const Name = styled.h3`
    font-size: 22px;
`