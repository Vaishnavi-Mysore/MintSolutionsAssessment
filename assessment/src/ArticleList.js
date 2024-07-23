import React, { useEffect, useState } from "react";
import axios from "axios";


const ArticleList =() =>{

    const [articles, setArticles] = useState([])
    const [articleClick, setArticleClick] = useState('')

    useEffect(()=>{
        getArticles()
    },[])

    const getArticles = async () => {
        axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=WLJjnPJiZsOnZHiQk0ctmWKPCqL4U5O6')
        .then(res => setArticles(res.data.results))
        .catch(error => console.log(error))
    }

    const onArticleTap = (id) => {
        setArticleClick(id === articleClick ? '' : id)
    }

    return (
        <div className="article-list">
            <h2>Articles</h2>
            <ul style={{textAlign: "left", cursor: 'pointer'}}>
            {articles.length >0? articles.map((article, index) => (
                <>
                <li key={index} onClick={()=>{onArticleTap(
                    index
                )}}>{article.title}</li>
                {articleClick === index ? 
                <div style={{marginBottom:'2%'}}>
                <p>{article.abstract} </p> 
                <a href={article.url} target="_blank">{article.url}</a>
                </div>
                :''}
                </>
            )): ''}
            
            </ul>
        </div>
    )
}

export default ArticleList;